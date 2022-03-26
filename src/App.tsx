import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchBox } from "./search_box/SearchBox";
import { SubredditPosts } from "./subreddit/SubredditPosts";

function App() {
  return (
    <div className="App">
      <SearchBox></SearchBox>
      <SubredditPosts></SubredditPosts>
    </div>
  );
}

export default App;
