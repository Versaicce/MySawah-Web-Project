const track = document.getElementById("itemsTrack");
const next = document.getElementById("itemNext");
const prev = document.getElementById("itemPrev");

let index = 0;
let autoSlide;

/* HITUNG ITEM PER VIEW */
function itemsPerView() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1024) return 3;
  return 5;
}

/* HITUNG JARAK GESER */
function getMoveWidth() {
  const card = document.querySelector(".item-card");
  const gap = parseInt(getComputedStyle(track).gap) || 0;
  return card.offsetWidth + gap;
}

/* UPDATE SLIDER */
function updateSlider() {
  track.style.transform = `translateX(-${index * getMoveWidth()}px)`;
}

/* NEXT */
function slideNext() {
  const total = document.querySelectorAll(".item-card").length;
  const maxIndex = total - itemsPerView();

  index = index >= maxIndex ? 0 : index + 1;
  updateSlider();
}

/* PREV */
function slidePrev() {
  const total = document.querySelectorAll(".item-card").length;
  const maxIndex = total - itemsPerView();

  index = index <= 0 ? maxIndex : index - 1;
  updateSlider();
}

/* BUTTON */
next.onclick = () => {
  slideNext();
  resetAuto();
};

prev.onclick = () => {
  slidePrev();
  resetAuto();
};

/* AUTO SLIDE */
function startAuto() {
  autoSlide = setInterval(slideNext, 3500);
}

function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}

/* RESPONSIVE */
window.addEventListener("resize", () => {
  index = 0;
  updateSlider();
});

/* INIT */
updateSlider();
startAuto();
