const carouselArray = Array.from(document.querySelectorAll('.carousel-item'))
const nextSlideButton = document.querySelector('#nextSlide')
const backSlideButton = document.querySelector('#backSlide')
const circlesBlock = document.querySelector('.circles-container')
const seconds = 10000
let counter = 0

if (circlesBlock !== null) {
  for (let index = 0; index < carouselArray.length; index++) {
    circlesBlock.insertAdjacentHTML('beforeend', `<div class="circle" data-index="${index}"></div>`)
  }
  circlesBlock.firstElementChild.classList.add('active')
  Array.from(circlesBlock.children).forEach(elem => {
    elem.onclick = () => {
      counter = elem.dataset.index
      carouselElementSelection(counter, carouselArray)
      if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
        carouselElementSelection(counter, Array.from(circlesBlock.children))
      }
      return counter
    }
  })
}

nextSlideButton.onclick = () => {
  counter++
  counter = carouselRepeater(counter)
  carouselElementSelection(counter, carouselArray)
  if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
    carouselElementSelection(counter, Array.from(circlesBlock.children))
  }
  return counter
}

backSlideButton.onclick = () => {
  counter--
  counter = carouselRepeater(counter)
  carouselElementSelection(counter, carouselArray)
  if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
    carouselElementSelection(counter, Array.from(circlesBlock.children))
  }
  return counter
}

setInterval(() => {
  counter++
  counter = carouselRepeater(counter)
  carouselElementSelection(counter, carouselArray)
  if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
    carouselElementSelection(counter, Array.from(circlesBlock.children))
  }
}, seconds);


function carouselRepeater(index) {
  if (index < 0) {
    index = carouselArray.length - 1
  }
  if (index >= carouselArray.length) {
    index = 0
  }
  return index
}

function carouselElementSelection(index, nodesList) {
  nodesList.map(elem => elem.classList.remove('active'))
  nodesList[index].classList.add('active')
}


