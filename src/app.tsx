/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

/// <reference path="./interfaces.d.ts"/>

declare var Router;
import { Component, useRef, useState, useEffect } from "react"
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";

const TodoApp = (props: IAppProps) => {
  const newFieldRef = useRef<HTMLInputElement>(null)
  const [ nowShowing, setNowShowing ] = useState(ALL_TODOS)
  const [ editing, setEditing ] = useState(null)

  useEffect(() => {
    const router = Router({
      '/': () => setNowShowing(ALL_TODOS),
      '/active': () => setNowShowing(ACTIVE_TODOS),
      '/completed': () => setNowShowing(COMPLETED_TODOS)
    });
    router.init('/');
  })

  const handleNewTodoKeyDown = (event : React.KeyboardEvent) => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = newFieldRef.current.value.trim();

    if (val) {
      props.model.addTodo(val);
      newFieldRef.current.value = '';
    }
  }

  const toggleAll = (event : React.FormEvent) => {
    var target : any = event.target;
    var checked = target.checked;
    props.model.toggleAll(checked);
  }

  const toggle = (todoToToggle : ITodo) => {
    props.model.toggle(todoToToggle);
  }

  const destroy = (todo : ITodo) => {
    props.model.destroy(todo);
  }

  const edit = (todo : ITodo) => {
    setEditing(todo.id);
  }

  const save = (todoToSave : ITodo, text : String) => {
    props.model.save(todoToSave, text);
    setEditing(null);
  }

  const cancel = () => {
    setEditing(null);
  }

  const clearCompleted = () => {
    props.model.clearCompleted();
  }

  let footer;
  let main;
  const todos = props.model.todos;

  var shownTodos = todos.filter((todo) => {
    switch (nowShowing) {
    case ACTIVE_TODOS:
      return !todo.completed;
    case COMPLETED_TODOS:
      return todo.completed;
    default:
      return true;
    }
  });

  var todoItems = shownTodos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggle.bind(this, todo)}
        onDestroy={destroy.bind(this, todo)}
        onEdit={edit.bind(this, todo)}
        editing={editing === todo.id}
        onSave={save.bind(this, todo)}
        onCancel={ e => cancel() }
      />
    );
  });

  // Note: It's usually better to use immutable data structures since they're
  // easier to reason about and React works very well with them. That's why
  // we use map(), filter() and reduce() everywhere instead of mutating the
  // array or todo items themselves.
  var activeTodoCount = todos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  var completedCount = todos.length - activeTodoCount;

  if (activeTodoCount || completedCount) {
    footer =
      <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={nowShowing}
        onClearCompleted={ e=> clearCompleted() }
      />;
  }

  if (todos.length) {
    main = (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={ e => toggleAll(e) }
          checked={activeTodoCount === 0}
        />
        <label
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>
        <ul className="todo-list">
          {todoItems}
        </ul>
      </section>
    );
  }

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          ref={newFieldRef}
          className="new-todo"
          placeholder="Whateveer needs to be done?"
          onKeyDown={ e => handleNewTodoKeyDown(e) }
          autoFocus={true}
        />
      </header>
      {main}
      {footer}
    </div>
  );
}


export default TodoApp
