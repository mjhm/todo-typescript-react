/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import classnames from "classnames";
import * as React from "react";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import { Utils } from "./utils";

// class TodoFooter extends React.Component<ITodoFooterProps, {}> {

const TodoFooter = (props: ITodoFooterProps) => {
  var activeTodoWord = Utils.pluralize(props.count, 'item');
  var clearButton = null;

  if (props.completedCount > 0) {
    clearButton = (
      <button
        className="clear-completed"
        onClick={props.onClearCompleted}>
        Clear completed
      </button>
    );
  }

  const nowShowing = props.nowShowing;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classnames({selected: nowShowing === ALL_TODOS})}>
              All
          </a>
        </li>
        {' '}
        <li>
          <a
            href="#/active"
            className={classnames({selected: nowShowing === ACTIVE_TODOS})}>
              Active
          </a>
        </li>
        {' '}
        <li>
          <a
            href="#/completed"
            className={classnames({selected: nowShowing === COMPLETED_TODOS})}>
              Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}


export { TodoFooter };
