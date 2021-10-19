
import TodoApp from './app'
import { TodoModel } from "./todoModel";
import ReactDOM from "react-dom";  


var model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementsByClassName('todoapp')[0]
  );
}

model.subscribe(render);
render();