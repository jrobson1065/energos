import { fetchImageId, updateImageParentElement } from "../apiHelpers/apiHelper-Images.js";
import { fetchTextId, updateTextParentElement } from "../apiHelpers/apiHelper-Texts.js";
import { fetchQuoteId, updateQuoteParentElement } from "../apiHelpers/apiHelper-Quotes.js";

export function addDragAndDropEventListeners() {
  const main = document.querySelector("main");

  main.addEventListener("drop", () => {
    mainDropEventListener();
  });

  main.addEventListener("dragover", () => {
    mainDragOverEventListener();
  });

  main.addEventListener("dragstart", () => {
    mainDragStartEventListener();
  });
}

function allowDrop() {
  const e = event;
  e.preventDefault();
}

export function drag(el) {
  const e = event;
  e.dataTransfer.setData("elementID", el.id);
}

function drop(box) {
  const e = event;
  e.preventDefault();
  const data = e.dataTransfer.getData("elementID");
  const el = document.getElementById(data);

  if (box.firstChild) removePreviousElement(box);
  box.appendChild(el);
  
  const boxId = e.target.id;
  getIdForDrop (el, boxId);
}

function dropAfter (elementId, boxId, el) {
  if (el.classList.contains("image")) {
    const imageJSON = createJSON("imageParentElement", boxId);
    updateImageParentElement(elementId, imageJSON);
  } else if (el.classList.contains("text")) {
    const textJSON = createJSON("textParentElement", boxId);
    updateTextParentElement(elementId, textJSON);
  } else if (el.classList.contains("quote")) {
    const quoteJSON = createJSON("quoteParentElement", boxId);
    updateQuoteParentElement(elementId, quoteJSON);
  }
}

export function removePreviousElement(box) {
  const visionboardId = document.querySelector(".visionboard-id-input").value;
  const el = box.firstChild;
  if (el == null) return false;
  if (el.classList.contains("image")) fetchImageId (visionboardId, el.id).then((img)=>{
    removePreviousElementAfter(img.id, el);
  })
  if (el.classList.contains("text")) fetchTextId (visionboardId, el.id).then((img)=>{
    removePreviousElementAfter(img.id, el);
  })
  if (el.classList.contains("quote")) fetchQuoteId (visionboardId, el.id).then((img)=>{
    removePreviousElementAfter(img.id, el);
  })
}

function removePreviousElementAfter(elementId, previousElement) {
  const imagesContainer = document.querySelector(".images-container");
  const textsContainer = document.querySelector(".text-container");
  const quotesContainer = document.querySelector(".quotes-container");
  if (previousElement == null) return false;
  if (previousElement.classList.contains("image")) {
    imagesContainer.appendChild(previousElement);
    const imageJSON = createJSON("imageParentElement", "images-container");
    updateImageParentElement(elementId, imageJSON);
  } else if (previousElement.classList.contains("text")) {
    textsContainer.appendChild(previousElement);
    const textJSON = createJSON("textParentElement", "text-container");
    updateTextParentElement(elementId, textJSON);
  } else if (previousElement.classList.contains("quote")) {
    quotesContainer.appendChild(previousElement);
    const quoteJSON = createJSON("quoteParentElement", "quotes-container");
    updateQuoteParentElement(elementId, quoteJSON);
  }
}

function mainDropEventListener() {
  let el = event.target;
  while (!el.classList.contains("box")) {
    el = el.parentNode;
  }

  drop(el);
}

function mainDragOverEventListener() {
  let el = event.target;
  if (el.closest(".box")) {
    while (!el.classList.contains("box")) {
      el = el.parentNode;
    }

    allowDrop();
  }
}

function mainDragStartEventListener() {
  const el = event.target;
  if (el.closest(".box")) {
    if (
      el.classList.contains("image") ||
      el.classList.contains("text") ||
      el.classList.contains("quote")
    )
      drag(el);
  }
}

function getIdForDrop(el, boxId) {
  const visionboardId = document.querySelector(".visionboard-id-input").value;

  if (el == null) return false;
  if (el.classList.contains("image")) fetchImageId (visionboardId, el.id).then((img)=>{
    dropAfter(img.id, boxId, el);
  })
  if (el.classList.contains("text")) fetchTextId (visionboardId, el.id).then((img)=>{
    dropAfter(img.id, boxId, el);
  })
  if (el.classList.contains("quote")) fetchQuoteId (visionboardId, el.id).then((img)=>{
    dropAfter(img.id, boxId, el);
  })
}

export function createJSON(key, value) {
  const jSON = {
    [key]: value,
  };
  return jSON;
}
