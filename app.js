const host = "https://peat-sun-countess.glitch.me"
let rankList = null
let rankListDOM = null
let rankClass = 'top' // top, revive, final
let rankType = 'band' // band, vocal, guitar, bass, drum, keyboard, player

const getRank = (rankClass = 'top', rankType = 'band') => {
  resetRank()
  // fetch(`/${rankClass}/${rankType}`)
  fetch(host + `/${rankClass}/${rankType}`)
    .then(res => res.json())
    .then(res => {
      if (!res.status) {
        clearRank()
        showMessage(res.message)
        return
      }
      rankList = res['rank']
      clearRank()
      showRank()
    })
    .catch(err => console.log(err))
}

const btnRankClassSelect = (btn) => {
  document.querySelectorAll(".btn-class").forEach(el => {
    el.classList.remove("btn-primary")
    el.classList.add("btn-secondary")
  })
  btn.target.classList.remove("btn-secondary")
  btn.target.classList.add("btn-primary")

  rankClass = btn.target.dataset['class']
  rankType = 'band'
  if (rankClass != "top") {
    document.querySelector("#btnRankTypeGroup").style.display = "none"
  } else {
    document.querySelector("#btnRankTypeGroup").style.display = "block"
    btnRankTypeReset()
  }
  getRank(rankClass, rankType)
}

const btnRankTypeSelect = (btn) => {
  document.querySelectorAll(".btn-type").forEach(el => {
    el.classList.remove("btn-primary")
    el.classList.add("btn-secondary")
  })
  btn.target.classList.remove("btn-secondary")
  btn.target.classList.add("btn-primary")

  rankClass = 'top'
  rankType = btn.target.dataset['type']
  getRank(rankClass, rankType)
}

const btnRankTypeReset = () => {
  document.querySelectorAll(".btn-type").forEach(el => {
    el.classList.remove("btn-primary")
    el.classList.add("btn-secondary")
  })
  let btn = document.querySelectorAll(".btn-type")[0]
  btn.classList.remove("btn-secondary")
  btn.classList.add("btn-primary")
}

const showMessage = (message) => {
  let div = document.createElement("div")
  div.innerText = message
  rankListDOM.appendChild(div)
}

const resetRank = () => {
  clearRank()
  showMessage("載入中請稍後…")
}

const clearRank = () => {
  while (rankListDOM.firstElementChild) {
    rankListDOM.firstElementChild.remove()
  }
}

const showRank = () => {
  rankList.forEach(band => {
    let id = band.id
    let name = band.name
    let rank = band.rank
    let score = band.score
    let titbits = band.titbits
    let image = band.image

    let div = document.createElement("div")
    div.className = "d-flex flex-column justify-content-center align-items-start w-100"
    div.innerHTML = `
    <div class="d-flex flex-row justify-content-center align-items-center">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span onclick="showImage('${id}')">
          <img src="${image}" style="width: 150px; height: auto;">
        </span>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-start ms-2">
        <div class="d-flex flex-row justify-content-start align-items-center ms-2">
          <h2>${name}</h2>
        </div>
        <div class="d-flex flex-row justify-content-start align-items-center ms-2">
          <div class="d-flex flex-column justify-content-center align-items-start">
            <p>
              <span class="text-white">💖 ${score}</span>
            </p>
            <p>
              <a href="#" style="color: #01c3c5; font-size: 1rem; text-decoration: none;" onclick="showVideo('${id}')">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAFAAAAABUzb9jAAACxElEQVRIDa1UzWsTURD/zduPJM1FEPEqeqgKLQgV+5GmWr0ogmfx4E3RQ5FWQfTisQehYPHkQfAfEDwI2h5s+hXR1rNgb4InQbQas9l947xNUrLb3U1anBDevjcz7zcfv3mEtvAjheXJ47CsIhrtwz2sjtgy/0Sp9DnLi0Ll+voJ0vQYhDEEQTHLIVOn1C8iLOg6zeDc8NckW8Ji9TC5wQL6CgOo102USXa9nQka8nngT+0dW7iE0dFa3FEhH0wh5w6gJjqtm4AGdD9/42/usayzCDARBzN7m5hH4PtJuv2dmUBdaWjNPxq5oFodloQGbbD80sSUSKmm1nz3GpgB1Sz9EVldHVFQU6z5Ctx8wQZRMqABALbJDx5owg8C3UcudxINobApXZYEAYSA/Wpl9TlDXWXHycHzwnLbqX6OlMXzPujy2Lyx4cX3rxU1ppnotgAfCAmW5ixBkVL3BAhhgIaMLWnVq72NrQwt5GnaXDjzXZdGHnLgncff+hshhmQRViHm1NqaspqszNoh2YCmMHEplzd5fPQi+f609NfLBI37yr4bYIKLHEnfdbk0Bz/YCjNNtko8Te9honnrkJnUytottqwj8jJlWe7Sdcsw2gDjvrZ2ilbWX7FST6U/hXiPdhBS+tslQ3mgiJozUKkcUpYzI8ndRM7OZqlBNWRx3ebsdoxROqCZN1KnpXR3tNbbRHRXaN4fp/lORp0fMg7c8GaV5x2Usl+TMeprz68SHu5mYjtCQlEc5shxnsG2+8PZ64i2EyPyHY6M+qLHx26w9ieE0S+kUr+RLyA9wzZor89ZBFFy0Cz1FCmVPkpPrmO5+gRBbdBmQoUsa7LrcxW5MGNjyNIwA4+tiNX48IbsN6SkNA+v8QnmGfofYu7xg7fQXiXpumb/lpYGyHZfCvixvc5V5FJbOuQHm1xwL2No6FtE19r8AxKaIduL9SfrAAAAAElFTkSuQmCC">
                花絮
              </a>
            </p>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-start">
            <span class="ms-5" style="color: #ededed; font-size: 3rem; font-weight: 700; font-style: italic;">${rank}</span>
          </div>
        </div>
      </div>
    </div>
    `
    rankListDOM.appendChild(div)
  })
}

const showVideo = (id) => {
  let band = null
  for (let el of rankList) {
    if (el.id == id) {
      band = el
      break
    }
  }
  if (!band) return

  let name = band.name
  // let rank = band.rank
  // let score = band.score
  let image = band.image
  let titbits = band.titbits

  Swal.fire({
    title: name,
    html: `<video src="${titbits}" poster="${image}" style="width: 20rem;" webkit-playsinline playsinline loop controls>`,
    showCloseButton: true,
    showConfirmButton: false,
  })
}

const showImage = (id) => {
  let band = null
  for (let el of rankList) {
    if (el.id == id) {
      band = el
      break
    }
  }
  if (!band) return

  let name = band.name
  let rank = band.rank
  let score = band.score
  let image = band.image
  // let titbits = band.titbits

  Swal.fire({
    title: name,
    html: `<div>排名：${rank} 票數：${score}</div>`,
    imageUrl: image,
    showCloseButton: true,
    showConfirmButton: false,
    // imageWidth: 300,
    // imageHeight: 300,
  })
}

const init = () => {
  // btn bind
  document.querySelectorAll(".btn-class").forEach((btn) => {
    btn.addEventListener("click", (btn) => btnRankClassSelect(btn))
  })

  document.querySelectorAll(".btn-type").forEach((btn) => {
    btn.addEventListener("click", (btn) => btnRankTypeSelect(btn))
  })

  rankListDOM = document.querySelector("#rankList")
}

const main = () => {
  init()
  getRank("top", "band")
}

document.addEventListener("DOMContentLoaded", main)
