"use strict";

const plusButton = document.querySelector(".footer-button");
const items = document.querySelector(".items");
const input = document.querySelector(".footer-input");

const createList = (inputValue) => {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item-row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const itemContent = document.createElement("span");
  itemContent.setAttribute("class", "item-content");
  itemContent.innerHTML = inputValue;

  const itemDelete = document.createElement("button");
  itemDelete.setAttribute("class", "item-delete");

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash-alt");
  itemDelete.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  itemDelete.appendChild(deleteIcon);
  item.appendChild(itemContent);
  item.appendChild(itemDelete);
  itemRow.appendChild(item);
  return itemRow;
};

const addList = () => {
  // 이벤트 처리할 때는 보통 onAdd 식으로 사용
  const inputValue = input.value;

  const newList = createList(inputValue);
  items.appendChild(newList);

  input.value = "";
};

plusButton.addEventListener("click", addList); // mouse click
input.addEventListener("keypress", (event) => {
  // enter key
  if (event.key === "Enter") {
    addList();
  }
});
