import { useMachine } from "@xstate/react";
import React, { ChangeEvent, useEffect } from "react";
import { publish, registerMachine } from "../machine_registry";
import { searchBoxMachine } from "./search_box_machine";

export function SearchBox() {
  const [state, send] = useMachine(searchBoxMachine, { devTools: true });
  useEffect(() => {
    registerMachine("search_box", searchBoxMachine.events, send);
  }, [send]);

  return (
    <div id="search_box">
      <input
        value={state.context.searchTerm}
        onChange={handleSearchTermChange}
      ></input>
      <button onClick={handleSearchClick} disabled={state.matches("searching")}>
        {state.matches("searching") ? "searching..." : "search"}
      </button>
    </div>
  );

  function handleSearchTermChange(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    send({ type: "search_box__search_term_changed", searchTerm });
  }

  function handleSearchClick() {
    publish({
      type: "search_box__search_clicked",
      searchTerm: state.context.searchTerm,
    });
  }
}
