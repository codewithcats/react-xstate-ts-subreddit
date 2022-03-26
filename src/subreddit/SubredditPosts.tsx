import { useMachine } from "@xstate/react";
import React, { useEffect } from "react";
import { registerMachine } from "../machine_registry";
import { subredditMachine } from "./subreddit_machine";

export function SubredditPosts() {
  const [state, send] = useMachine(subredditMachine, { devTools: true });
  useEffect(() => {
    registerMachine("subreddit_posts", subredditMachine.events, send);
  }, [send]);

  return (
    <div id="subreddit_posts">
      {state.matches("idle") ? (
        ""
      ) : (
        <>
          <h3>{state.context.subreddit}</h3>
          {state.matches("loading") ? <p>loading...</p> : ""}
          <ul></ul>
        </>
      )}
    </div>
  );
}
