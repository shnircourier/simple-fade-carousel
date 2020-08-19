const carouselArray = Array.from(document.querySelectorAll('.carousel-item')) //Массив слайдов
const nextSlideButton = document.querySelector('#nextSlide')                  // Кнопка переключения слайда вперед
const backSlideButton = document.querySelector('#backSlide')                  // Кнопка переключения слайда назад
const circlesBlock = document.querySelector('.circles-container')             // Массив точек для доступа к конкретному слайду
const seconds = 10000                                                         // Интервал смены слайда
let counter = 0                                                               // Счетчик

// Добавление точек в случае существования определенного блока с классом
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

// Функция обработки события нажатия на кнопку для переключения слайда вперед
nextSlideButton.onclick = () => {
  counter++
  counter = carouselRepeater(counter)
  carouselElementSelection(counter, carouselArray)
  if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
    carouselElementSelection(counter, Array.from(circlesBlock.children))
  }
  return counter
}

// Функция обработки события нажатия на кнопку для переключения слайда назад
backSlideButton.onclick = () => {
  counter--
  counter = carouselRepeater(counter)
  carouselElementSelection(counter, carouselArray)
  if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
    carouselElementSelection(counter, Array.from(circlesBlock.children))
  }
  return counter
}

// Функция автоматического переключения слайдов
setInterval(() => {
  counter++
  counter = carouselRepeater(counter)
  carouselElementSelection(counter, carouselArray)
  if (circlesBlock !== null && circlesBlock.childElementCount !== 0) {
    carouselElementSelection(counter, Array.from(circlesBlock.children))
  }
}, seconds);

// Функция сброса счетчика
function carouselRepeater(index) {
  if (index < 0) {
    index = carouselArray.length - 1
  }
  if (index >= carouselArray.length) {
    index = 0
  }
  return index
}

// Функция выбора элемента
function carouselElementSelection(index, nodesList) {
  nodesList.map(elem => elem.classList.remove('active'))
  nodesList[index].classList.add('active')
}


