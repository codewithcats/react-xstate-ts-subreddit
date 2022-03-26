export type MachineEvent =
  | { type: "subreddit__updated"; subreddit: string }
  | { type: "subreddit__loaded" }
  | {
      type: "search_box__search_term_changed";
      searchTerm: string;
    }
  | {
      type: "search_box__search_clicked";
      searchTerm: string;
    };
