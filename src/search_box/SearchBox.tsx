import { useMachine } from "@xstate/react";
import React, { ChangeEvent } from "react";
import { searchBoxMachine } from "./search_box_machine";

export function SearchBox() {
  const [state, send] = useMachine(searchBoxMachine, { devTools: true });

  return (
    <div className="search_box">
      <input
        value={state.context.searchTerm}
        onChange={handleSearchTermChange}
      ></input>
      <button
        onClick={handleSearchClick}
        disabled={state.value === "searching"}
      >
        {state.value === "searching" ? "searching..." : "search"}
      </button>
    </div>
  );

  function handleSearchTermChange(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    send({ type: "search_box__search_term_changed", searchTerm });
  }

  function handleSearchClick() {
    send("search_box__search_clicked");
  }
}
