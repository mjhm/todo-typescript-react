/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import classnames from "classnames";
import { memo, useRef, useState, useEffect } from "react";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";


const TodoItemComponent = (props: ITodoItemProps) => {
  const editFieldRef = useRef<HTMLInputElement>(null)
  const [editText, setEditText] = useState(props.todo.title)

  const handleSubmit = (event : React.FormEvent) => {
    var val = editText.trim();
    if (val) {
      props.onSave(val);
      setEditText(val);
    } else {
      props.onDestroy();
    }
  }

  const handleEdit = () => {
    props.onEdit();
    setEditText(props.todo.title);
  }

  const handleKeyDown = (event : React.KeyboardEvent) => {
    if (event.key.slice(0, 3) === ESCAPE_KEY) {
      setEditText(props.todo.title);
      props.onCancel(event);
    } else if (event.key === ENTER_KEY) {
      handleSubmit(event);
    }
  }

  const handleChange = (event : React.FormEvent) => {
    var input : any = event.target;
    setEditText(input.value);
  }

  useEffect(() => {
    console.log('HERE');
    var node =  editFieldRef.current;
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  }, [props.editing]);


  return (
    <li className={classnames({
      completed: props.todo.completed,
      editing: props.editing
    })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.completed}
          onChange={props.onToggle}
        />
        <label onDoubleClick={ e => handleEdit() }>
          {props.todo.title}
        </label>
        <button className="destroy" onClick={props.onDestroy} />
      </div>
      <input
        ref={editFieldRef}
        className="edit"
        value={editText}
        onBlur={ e => handleSubmit(e) }
        onChange={ e => handleChange(e) }
        onKeyDown={ e => handleKeyDown(e) }
      />
    </li>
  );
}

// Replaces shouldComponentUpdate
const areEqual = (prevProps: ITodoItemProps , nextProps: ITodoItemProps) => (
  nextProps.todo === prevProps.todo &&
  nextProps.editing === prevProps.editing
)

const TodoItem = memo(TodoItemComponent, areEqual)

export { TodoItem };
