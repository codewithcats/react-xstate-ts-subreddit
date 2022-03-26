import { assign, createMachine } from "xstate";
import type { MachineEvent } from "../machine_events";
import { publish } from "../machine_registry";

interface Context {
  posts: Post[];
  subreddit: string;
}

export interface Post {
  title: string;
  permalink: string;
}

export const services = {
  fetchSubreddit: async (context: Context) => {
    const { subreddit } = context;

    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((child: any) => child.data);
  },
};

export const subredditMachine = createMachine(
  {
    tsTypes: {} as import("./subreddit_machine.typegen").Typegen0,
    id: "subreddit",
    schema: {
      context: {} as Context,
      services: {} as { fetchSubreddit: { data: Post[] } },
      events: {} as MachineEvent,
    },
    context: {
      posts: [],
      subreddit: "",
    },
    states: {
      idle: {},
      loading: {
        invoke: {
          id: "fetch-subreddit",
          src: "fetchSubreddit",
          onDone: {
            target: "loaded",
            actions: ["updatePosts", "notifyLoaded"],
          },
          onError: "failed",
        },
      },
      loaded: {},
      failed: {},
    },
    initial: "idle",
    on: {
      subreddit__updated: {
        target: ".loading",
        actions: "updateSubreddit",
        cond: "isSubredditValid",
      },
      search_box__search_clicked: {
        target: ".loading",
        actions: "updateSubredditWithSerchTerm",
      },
    },
  },
  {
    services,
    actions: {
      updatePosts: assign((context, event) => {
        return {
          ...context,
          posts: event.data,
        };
      }),
      updateSubreddit: assign((context, event) => {
        return {
          ...context,
          subreddit: event.subreddit,
        };
      }),
      updateSubredditWithSerchTerm: assign((context, event) => {
        return {
          ...context,
          subreddit: event.searchTerm,
        };
      }),
      notifyLoaded: () => {
        publish({ type: "subreddit__loaded" });
      },
    },
    guards: {
      isSubredditValid: (_, event) => {
        return event.subreddit.length > 0;
      },
    },
  }
);
