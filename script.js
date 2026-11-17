const chooseImgBtn = document.querySelector(".choose_img button");
const chooseInput = document.querySelector(".choose_img input");
const imgSrc = document.querySelector(".view_img img");
const filterButtons = document.querySelectorAll(".icons_room button");
const slider = document.querySelector(".slider input");
const filterName = document.querySelector(".filter_info .name");
const sliderValue = document.querySelector(".filter_info .value");
const rotateButtons = document.querySelectorAll(".icons_room1 button");
const resetBtn = document.querySelector(".reset");
const saveBtn = document.querySelector(".save");

// Settings for each filter: default value, slider max and display unit
const FILTERS = {
  brightness: { value: 100, max: 200, unit: "%" },
  contrast: { value: 100, max: 200, unit: "%" },
  saturate: { value: 100, max: 200, unit: "%" },
  invert: { value: 0, max: 100, unit: "%" },
  blur: { value: 0, max: 20, unit: "px" },
};

let values = {};
let rotate = 0;
let flipX = 1;
let flipY = 1;

const resetValues = () => {
  values = Object.fromEntries(Object.entries(FILTERS).map(([name, f]) => [name, f.value]));
  rotate = 0;
  flipX = 1;
  flipY = 1;
};

const filterString = () =>
  `brightness(${values.brightness}%) contrast(${values.contrast}%) saturate(${values.saturate}%) invert(${values.invert}%) blur(${values.blur}px)`;

const activeFilter = () => document.querySelector(".icons_room .active").id;

// Show the active filter's current value on the slider and label
const syncSlider = () => {
  const name = activeFilter();
  slider.max = FILTERS[name].max;
  slider.value = values[name];
  filterName.innerText = name;
  sliderValue.innerText = `${values[name]}${FILTERS[name].unit}`;
};

const applyEdits = () => {
  imgSrc.style.filter = filterString();
  imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
};

chooseImgBtn.addEventListener("click", () => chooseInput.click());

chooseInput.addEventListener("change", () => {
  const file = chooseInput.files[0];
  if (!file) return;
  imgSrc.addEventListener(
    "load",
    () => {
      document.querySelector(".container").classList.remove("disabled");
      resetValues();
      applyEdits();
      syncSlider();
    },
    { once: true }
  );
  imgSrc.src = URL.createObjectURL(file);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".icons_room .active").classList.remove("active");
    button.classList.add("active");
    syncSlider();
  });
});

slider.addEventListener("input", () => {
  const name = activeFilter();
  values[name] = Number(slider.value);
  sliderValue.innerText = `${slider.value}${FILTERS[name].unit}`;
  applyEdits();
});

rotateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "rotate_left") rotate -= 90;
    else if (button.id === "rotate_right") rotate += 90;
    else if (button.id === "flip_x") flipX *= -1;
    else if (button.id === "flip_y") flipY *= -1;
    applyEdits();
  });
});

resetBtn.addEventListener("click", () => {
  resetValues();
  applyEdits();
  syncSlider();
});

// Draw the image on a canvas with the same filters, rotation and flips, then download it
saveBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const { naturalWidth: w, naturalHeight: h } = imgSrc;
  const sideways = Math.abs(rotate % 180) === 90;

  canvas.width = sideways ? h : w;
  canvas.height = sideways ? w : h;

  ctx.filter = filterString();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.scale(flipX, flipY);
  ctx.drawImage(imgSrc, -w / 2, -h / 2, w, h);

  const link = document.createElement("a");
  link.download = `edited-image-${Date.now()}.jpg`;
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
});

resetValues();
syncSlider();
