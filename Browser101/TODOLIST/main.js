"use strict";

const plusButton = document.querySelector(".footer-button");
const items = document.querySelector(".items");
const input = document.querySelector(".footer-input");

let id = 0;
const createList = (inputValue) => {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item-row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item-content">${inputValue}</span>
      <button type="button" class="item-delete">
        <i class="fas fa-trash-alt" data-id="${id}"></i>
      </button>
    </div>  
  `;
  id++;
  return itemRow;
};

const addList = () => {
  // 이벤트 처리할 때는 보통 onAdd 식으로 사용
  const inputValue = input.value;
  if (!inputValue) {
    input.focus();
    return;
  }

  const newList = createList(inputValue);
  items.appendChild(newList);
  newList.scrollIntoView({ block: "center" });

  input.value = "";
  input.focus();
};

items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item-row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});

plusButton.addEventListener("click", addList); // mouse click
input.addEventListener("keypress", (event) => {
  // enter key
  if (event.key === "Enter") {
    addList();
  }
});
