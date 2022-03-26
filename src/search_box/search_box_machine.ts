import { assign, sendUpdate, createMachine } from "xstate";
import { MachineEvent } from "../machine_events";

interface Context {
  searchTerm: string;
}

export const searchBoxMachine = createMachine(
  {
    tsTypes: {} as import("./search_box_machine.typegen").Typegen0,
    id: "search-box",
    schema: {
      context: {} as Context,
      events: {} as MachineEvent,
    },
    context: {
      searchTerm: "",
    },
    states: {
      idle: {
        on: {
          search_box__search_term_changed: [
            {
              target: "ready",
              actions: "updateSearchTerm",
              cond: "isSearchTermLenghtValid",
            },
            { actions: "updateSearchTerm" },
          ],
        },
      },
      ready: {
        on: {
          search_box__search_term_changed: [
            {
              target: "idle",
              actions: "updateSearchTerm",
              cond: "isSearchTermLenghtInvalid",
            },
            { actions: "updateSearchTerm" },
          ],
          search_box__search_clicked: {
            target: "searching",
          },
        },
      },
      searching: {
        on: {
          subreddit__loaded: {
            target: "ready",
          },
        },
      },
    },
    initial: "idle",
  },
  {
    actions: {
      updateSearchTerm: assign((context, event) => {
        return {
          ...context,
          searchTerm: event.searchTerm,
        };
      }),
    },
    guards: {
      isSearchTermLenghtValid: (_, event) => {
        return event.searchTerm.length > 3;
      },
      isSearchTermLenghtInvalid: (_, event) => {
        return event.searchTerm.length <= 3;
      },
    },
  }
);
