import { clearElementChildren } from "../app.js";
import { renderDesignBoard } from "./renderDesignBoards.js";
import { createLeftSideBar } from "./createLeftSideBar.js";
import { addSideBarEventListeners } from "../eventListeners/sidebar.js";
import { addDragAndDropEventListeners } from "../eventListeners/drag-and-drop.js";
import { addEventListenersToTemplates } from "../eventListeners/templates.js";
import { addSettingsEventListeners } from "../eventListeners/settings.js";

export function renderVisionBoard(visionboard) {
  const containerBody = document.querySelector(".container-body");

  clearElementChildren(containerBody);

  const visionboardIdInput = document.createElement("input");
  visionboardIdInput.classList.add("visionboard-id-input");
  visionboardIdInput.value = `${visionboard.id}`;
  visionboardIdInput.type = "hidden";
  containerBody.appendChild(visionboardIdInput);

  const image = new Image();
  image.classList.add("logo-image");
  image.src = "./images/logo.png";
  image.alt = "Energós Logo";

  containerBody.appendChild(image);
  containerBody.appendChild(createLeftSideBar(visionboard));

  const main = document.createElement("main");
  main.appendChild(renderDesignBoard(`${visionboard.gridTemplateName}`));
  containerBody.appendChild(main);

  addAllEventListeners();
  renderPreSavedOptions(visionboard);
}

function addAllEventListeners() {
  addSideBarEventListeners();
  addDragAndDropEventListeners();
  addEventListenersToTemplates();
  addSettingsEventListeners();
}

function renderPreSavedOptions(visionboard) {
  darkThemeOption(visionboard);
  showGridOption(visionboard);
  gridSpacingOption(visionboard);
  borderRadiusOption(visionboard);
  borderOption(visionboard);
  backgroundOption(visionboard);
}

function darkThemeOption(visionboard) {
  if (`${visionboard.themeDark}` == "true") {
    const body = document.body;
    const icons = document.querySelectorAll(".icon-div i");
    const logoImage = document.querySelector(".logo-image");
    body.classList.add("dark");
    logoImage.src = "./images/logo-dark.png";
    logoImage.style.marginTop = "20px";
    logoImage.style.transform = "scale(1)";
    icons.forEach((icon) => icon.classList.add("dark"));
    const darkModeToggleSwitch = document.querySelector(".dark-theme-checkbox");
    darkModeToggleSwitch.checked = true;
  }
}

function showGridOption(visionboard) {
  if (`${visionboard.hasGrid}` == "false") {
    const showGridToggleSwitch = document.querySelector(".grid-checkbox");
    const gridBoxes = document.querySelectorAll(".box");
    gridBoxes.forEach((box) => (box.style.backgroundColor = "transparent"));
    showGridToggleSwitch.checked = false;
  }
}

function gridSpacingOption(visionboard) {
  const spacingSlider = document.querySelector("#spacing-slider");
  const elementsWithGridGap = document.querySelectorAll("main div:not(.box)");
  const gap = `${visionboard.gridSpacing}`;
  elementsWithGridGap.forEach((element) => (element.style.gridGap = gap));
  spacingSlider.value = parseInt(gap, 10);
}

function borderRadiusOption(visionboard) {
  const borderRadiusSlider = document.querySelector("#border-radius-slider");
  const gridBoxes = document.querySelectorAll(".box");
  const radius = `${visionboard.gridBorderRadius}`;
  gridBoxes.forEach((box) => (box.style.borderRadius = radius));
  borderRadiusSlider.value = parseInt(radius, 10);
}

function borderOption(visionboard) {
  const borderColorPicker = document.querySelector(".border-color");
  const borderStyleSelector = document.querySelector(".border-style");
  const main = document.querySelector("main");
  const borderThicknessSlider = document.querySelector(
    "#border-thickness-slider"
  );
  const color = `${visionboard.gridBorderColor}`;
  const thickness = `${visionboard.gridBorderThickness}`;
  let style = `${visionboard.gridBorderStyle}`;
  if (style == null) style = "solid";

  main.style.border = thickness + " " + style + " " + color;

  borderColorPicker.value = color;
  borderStyleSelector.value = style;
  borderThicknessSlider.value = parseInt(thickness, 10);
}

function backgroundOption(visionboard) {
  const color = `${visionboard.backgroundColor}`;
  const backgroundImageLink = `${visionboard.backgroundImageLink}`;
  const main = document.querySelector("main");
  if (backgroundImageLink == "") {
    main.style.backgroundColor = color;
  } else {
    main.style.backgroundImage = "url(" + backgroundImageLink + ")";
  }
}
