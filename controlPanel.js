import { FalingObject } from "./falingObject.js";
export class CtrlElems {
    gamecCtrl
    chairExist
    chair
    constructor() {
        this.chairExist = false
        new RenderControlPanel()

        let pauseButton = document.querySelector("#pause");
        let playButton = document.querySelector("#play");
        pauseButton.style.display = "none"

        playButton.addEventListener("click", function () {
            playButton.style.display = "none"
            pauseButton.style.display = "block"
            var chairInHands = 0
            this.chair = new FalingObject()
            this.chairExist = true;
            var timeInterval = null
            timeInterval = setInterval(() => {
                this.chair.chairFall()
                let formElement = document.querySelector(".person");
                let formElement1 = document.querySelector(".falingObject");
                if (Math.round(formElement1.getBoundingClientRect().top) == Math.round(formElement.getBoundingClientRect().top)) {
                    chairInHands++
                } pauseButton.addEventListener("click", function () {
                    clearInterval(timeInterval);
                    playButton.style.display = "block"
                    pauseButton.style.display = "none"
                });
            }, 7);
        });
    }
}

class RenderControlPanel {
    constructor(counter) {
        if (counter === undefined) {
            counter = 0
        }
        this.gamecCtrl = document.querySelector(".gameCtrl");
        this.gamecCtrl.innerHTML = `
    <div class="gamecCtrlBOX">
    <div class="counter">${counter}</div>
    <button class = "play" id = "play">  <i class="fa fa-play "  ></i> </button > 
    <button class = "pause" id = "pause">  <i class="fa fa-pause "  ></i> </button > 
    </div>`
    }
}