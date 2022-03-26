import { useMachine } from "@xstate/react";
import React, { useEffect } from "react";
import { registerMachine } from "../machine_registry";
import { Post, subredditMachine } from "./subreddit_machine";

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
          <ul>
            {state.context.posts.map((post) => (
              <PostItem post={post}></PostItem>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

type PostProps = {
  post: Post;
};

function PostItem(props: PostProps) {
  return (
    <li>
      <a href={props.post.permalink}>{props.post.title}</a>
    </li>
  );
}
