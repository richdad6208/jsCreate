//깨달은 점 1. 코드 정리하기 전 깃커밋을 하자. 정리할 때는 고장이 잘나기 때문이다.

function handleSearchTodos() {
  let searchKeyword = $searchTodosInput.value.trim();
  const $alarm = document.querySelector(".alarm");
  let filteredTodos = [];
  if (searchKeyword) {
    [...$todos.children].forEach((todo) => todo.classList.remove("active"));
    filteredTodos = [...$todos.children].filter((todo) =>
      todo.firstChild.data.includes(searchKeyword)
    );
    filteredTodosObj.keyOfFilteredTodos = filteredTodos;
    filteredTodos.forEach((todo) => todo.classList.add("active"));
    if (filteredTodos.length > 0) {
      $alarm.innerText = "";
      $pagenation.style.display = "block";
      createPagenation(filteredTodos);
    } else {
      $alarm.innerText = "검색 결과가 없습니다";
      $pagenation.style.display = "none";
    }
  } else {
    $alarm.innerText = "";
    createPagenation();
  }
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
  [...$pagenation.children].forEach((item) => item.classList.remove("active"));
  $pagenation.children[numberOfPage - 1].classList.add("active");
  showTodos(numberOfPage, arr);
}

function showTodos(numberOfPage, arr = [...$todos.children]) {
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
};

function main() {
  $searchTodosInput.addEventListener("input", handleSearchTodos);

  showPagenation(1);
  $formInHead.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $todos.addEventListener("click", (e) => {
    deleteTodoInList(e);
    filteredTodosObj.keyOfFilteredTodos.length > 0
      ? createPagenation(filteredTodosObj.keyOfFilteredTodos)
      : createPagenation();
  });

  $addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTodoItem(saveTodo());
    createPagenation();
  });

  $pagenation.addEventListener("click", activatePagenation);
}

main();
