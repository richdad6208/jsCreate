const $h1 = document.querySelector("h1");

$h1.addEventListener("click", handleClick);

async function handleClick() {
  const response = await fetch("http://localhost:3000/api", {
    method: "get",
  });
  const data = await response.json();

  $h1.innerText = data.name;
}
