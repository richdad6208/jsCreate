//깨달은 점 1. 코드 정리하기 전 깃커밋을 하자. 정리할 때는 고장이 잘나기 때문이다.

function handleSearchTodos() {
  debugger;
  let searchKeyword = $searchTodosInput.value;
  let filteredTodos = [];
  if (searchKeyword) {
    [...$todos.children].forEach((todo) => todo.classList.remove("active"));
    filteredTodos = [...$todos.children].filter((todo) =>
      todo.firstChild.data.includes(searchKeyword)
    );
    filteredTodos.forEach((todo) => todo.classList.add("active"));
  }
  createPagenation(filteredTodos);
}

function saveTodo() {
  const addTodoInputValue = $addTodoInput.value;
  removeTodoInInput();
  return addTodoInputValue;
}

function activatePagenation(e) {
  let currentPageNumber = null;
  [...$pagenation.children].forEach((page, index) => {
    page.classList.toggle("active", e.target === page);
    if (page.classList.contains("active")) {
      currentPageNumber = index + 1;
    }
  });
  showPagenation(currentPageNumber);
}

function showPagenation(numberOfPage, arr = [...$todos.children]) {
  debugger;
  [...$pagenation.children].forEach((item) => item.classList.remove("active"));
  $pagenation.children[numberOfPage - 1].classList.add("active");
  showTodos(numberOfPage, arr);
}

function showTodos(numberOfPage, arr = [...$todos.children]) {
  debugger;

  // [...$todos.children].forEach((item) => item.classList.remove("active"));
  // let activeTodos = [...$todos.children];
  arr.forEach((item) => item.classList.remove("active"));
  let activeTodos = arr;

  for (
    let i = PAGE_VOLUME * (numberOfPage - 1);
    i < PAGE_VOLUME * numberOfPage;
    i++
  ) {
    activeTodos[i]?.classList.add("active");
  }
}
function createPagenation(arr = [...$todos.children]) {
  debugger;
  let currentPageVolume = Math.ceil(arr.length / PAGE_VOLUME);
  $pagenation.innerHTML = "";
  for (let i = 1; i <= currentPageVolume; i++) {
    $pagenation.innerHTML += `<span class="pagenation__number">${i}</span>`;
  }
  showPagenation(currentPageVolume, arr);
}
function removeTodoInInput() {
  $addTodoInput.value = "";
}

function deleteTodoInList(e) {
  if (e.target.className === "todo__delete") {
    $todos.removeChild(e.target.parentNode);
  }
}

function addTodoItem(inputValue) {
  $todos.innerHTML += `<li class="todo__item">
  ${inputValue}<span class="todo__delete">❌</span>
</li>`;
}

const $searchTodosInput = document.querySelector(".searchTodos");
const $searchTodosButton = document.querySelector(".searchTodosButton");
const $addTodoButton = document.querySelector(".addTodoButton");
const $todos = document.querySelector(".todo__list");
const $addTodoInput = document.querySelector(".addTodoInput");
const $formInHead = document.querySelector(".formInHead");
const $pagenation = document.querySelector(".pagenation");
const PAGE_VOLUME = 5;
const filteredTodosObj = {
  keyOfFilteredTodos: [], 
}

function main() {
  $searchTodosButton.addEventListener("click", handleSearchTodos);

  showPagenation(1);
  $formInHead.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $todos.addEventListener("click", (e) => {
    deleteTodoInList(e);
    $searchTodosInput.value? createPagenation()
      createPagenation();
  
  });

  $addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTodoItem(saveTodo());
    createPagenation();
  });

  $pagenation.addEventListener("click", activatePagenation);
}

main();
