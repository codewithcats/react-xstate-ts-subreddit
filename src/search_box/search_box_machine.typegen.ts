// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    updateSearchTerm: "search_box__search_term_changed";
  };
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isSearchTermLenghtValid: "search_box__search_term_changed";
    isSearchTermLenghtInvalid: "search_box__search_term_changed";
  };
  eventsCausingDelays: {};
  matchesStates: "idle" | "ready" | "searching";
  tags: never;
}
