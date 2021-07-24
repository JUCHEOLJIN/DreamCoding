"use strict";

export default class Modal {
  constructor() {
    this.modal = document.querySelector(".modal");
    this.modalText = document.querySelector(".modal__message");
    this.modalRefresh = document.querySelector(".modal__refresh");
    this.modalRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.modal.classList.remove("modal--hide");
    this.modalText.innerHTML = `${text}`;
  }

  hide() {
    this.modal.classList.add("modal--hide");
  }
}
