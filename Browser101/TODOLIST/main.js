"use strict";

const plusButton = document.querySelector(".footer-button");
const items = document.querySelector(".items");
const input = document.querySelector(".footer-input");

const addList = () => {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item-row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const itemContent = document.createElement("span");
  itemContent.setAttribute("class", "item-content");

  const itemDelete = document.createElement("button");
  itemDelete.setAttribute("class", "item-delete");

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash-alt");

  const inputValue = input.value;
  items.appendChild(itemRow);
  itemRow.appendChild(item);
  item.appendChild(itemContent);
  itemContent.textContent = `${inputValue}`;
  item.appendChild(itemDelete);
  itemDelete.appendChild(deleteIcon);
  itemDelete.addEventListener("click", () => {
    items.removeChild(itemRow);
  });
  input.value = "";
};

plusButton.addEventListener("click", addList); // mouse click
input.addEventListener("keypress", (event) => {
  // enter key
  if (event.key === "Enter") {
    addList();
  }
});
