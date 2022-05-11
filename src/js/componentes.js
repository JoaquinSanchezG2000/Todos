import { Todo } from "../classes";
import { todoList } from "../index";
//Referencias en el HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed ");
const ulFiltro = document.querySelector(".filters");
const ancorFiltros = document.querySelectorAll(".filtro");
export const crearTodoHtml = todo => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
							<label>${todo.tarea}</label >
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;
  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div;
};

//Eventos

txtInput.addEventListener("keyup", event => {
  if (event.code === "Enter" && txtInput.value.length > 0) {
    console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
  }
});
divTodoList.addEventListener("click", event => {
  const nombreElement = event.target.localName; // input , label , boton

  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");
  console.log(todoElemento);
  console.log(todoId);

  if (nombreElement.includes("input")) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElement.includes("button")) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
  console.log(todoList);
});

btnBorrar.addEventListener("click", () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltro.addEventListener("click", event => {
  const filtro = event.target.text;
  if (!filtro) {
    console.log(event.target)
    return;
    
  }

  ancorFiltros.forEach(elem => elem.classList.remove("selected"));
  event.target.classList.add("selected");

  for (const elemento of divTodoList.children) {
    elemento.classList.remove("hidden");
    const completed = elemento.classList.contains("completed");

    switch (filtro) {
      case "Pendientes":
        if (completed) {
          elemento.classList.add("hidden");
        }
        break;

      case "Completados":
        if (!completed) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});

