var rankList = null

const getTopRank = (rankType) => {
  fetch(`/top/${rankType}`)
    .then(res => res.json())
    .then(res => {
      rankList = res
      showRank()
    })
    .catch(err => console.log(err))
}

const btnSelect = (btn) => {
  document.querySelectorAll(".btn-top").forEach(el => {
    el.classList.remove("btn-primary")
    el.classList.add("btn-secondary")
  })
  btn.target.classList.remove("btn-secondary")
  btn.target.classList.add("btn-primary")
  scrollTo(0, 0)
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

const showRank = () => {
  let rankListDOM = document.querySelector("#rankList")

  // clearRankTable
  while (rankListDOM.firstElementChild) {
    rankListDOM.firstElementChild.remove()
  }

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
              <!-- <img src="data:image/png;base64,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"> -->
              <span class="ms-2" style="color: white;">💖 ${score}</span>
            </p>
            <p>
              <a href="#" style="color: #01c3c5; font-size: 1rem; text-decoration: none;" onclick="showVideo('${id}')">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAFAAAAABUzb9jAAACxElEQVRIDa1UzWsTURD/zduPJM1FEPEqeqgKLQgV+5GmWr0ogmfx4E3RQ5FWQfTisQehYPHkQfAfEDwI2h5s+hXR1rNgb4InQbQas9l947xNUrLb3U1anBDevjcz7zcfv3mEtvAjheXJ47CsIhrtwz2sjtgy/0Sp9DnLi0Ll+voJ0vQYhDEEQTHLIVOn1C8iLOg6zeDc8NckW8Ji9TC5wQL6CgOo102USXa9nQka8nngT+0dW7iE0dFa3FEhH0wh5w6gJjqtm4AGdD9/42/usayzCDARBzN7m5hH4PtJuv2dmUBdaWjNPxq5oFodloQGbbD80sSUSKmm1nz3GpgB1Sz9EVldHVFQU6z5Ctx8wQZRMqABALbJDx5owg8C3UcudxINobApXZYEAYSA/Wpl9TlDXWXHycHzwnLbqX6OlMXzPujy2Lyx4cX3rxU1ppnotgAfCAmW5ixBkVL3BAhhgIaMLWnVq72NrQwt5GnaXDjzXZdGHnLgncff+hshhmQRViHm1NqaspqszNoh2YCmMHEplzd5fPQi+f609NfLBI37yr4bYIKLHEnfdbk0Bz/YCjNNtko8Te9honnrkJnUytottqwj8jJlWe7Sdcsw2gDjvrZ2ilbWX7FST6U/hXiPdhBS+tslQ3mgiJozUKkcUpYzI8ndRM7OZqlBNWRx3ebsdoxROqCZN1KnpXR3tNbbRHRXaN4fp/lORp0fMg7c8GaV5x2Usl+TMeprz68SHu5mYjtCQlEc5shxnsG2+8PZ64i2EyPyHY6M+qLHx26w9ieE0S+kUr+RLyA9wzZor89ZBFFy0Cz1FCmVPkpPrmO5+gRBbdBmQoUsa7LrcxW5MGNjyNIwA4+tiNX48IbsN6SkNA+v8QnmGfofYu7xg7fQXiXpumb/lpYGyHZfCvixvc5V5FJbOuQHm1xwL2No6FtE19r8AxKaIduL9SfrAAAAAElFTkSuQmCC">
                花絮
              </a>
            </p>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-start">
            <span class="ms-2" style="color: #ededed; font-size: 3rem; font-weight: 700; font-style: italic;">${rank}</span>
          </div>
        </div>
      </div>
    </div>
    ${rank != 32 ? `<hr style="border: 1px solid white; width: 100%;">` : ""}
    `
    rankListDOM.appendChild(div)
  })
}

const eventBind = () => {
  document.querySelector("#topBand").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("band") })
  document.querySelector("#topVocalist").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("vocal") })
  document.querySelector("#topGuitarist").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("guitar") })
  document.querySelector("#topBassist").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("bass") })
  document.querySelector("#topDrummer").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("drum") })
  document.querySelector("#topKeyboard").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("keyboard") })
  document.querySelector("#topPlayer").addEventListener("click", (btn) => { btnSelect(btn), getTopRank("player") })
}

const main = () => {
  eventBind()
  getTopRank("band")
}

document.addEventListener("DOMContentLoaded", main)
