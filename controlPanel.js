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
        let helpButton = document.querySelector(".help");
        pauseButton.style.display = "none"
        helpButton.addEventListener("click", function () {
            if (document.querySelector(".clue").style.display == "block") {
                document.querySelector(".clue").style.display = "none"
            } else {
                document.querySelector(".clue").style.display = "block"
            }
        })
        playButton.addEventListener("click", function () {

            playButton.style.display = "none"
            pauseButton.style.display = "block"

            this.chair = new FalingObject()
            this.chairExist = true;
            var timeInterval = null

            timeInterval = setInterval(() => {
                this.chair.chairFall()
                pauseButton.addEventListener("click", function () {
                    clearInterval(timeInterval);
                    playButton.style.display = "block"
                    pauseButton.style.display = "none"
                });
            }, 6);
        });
        let musicButton = document.querySelector(".music");
        musicButton.addEventListener("click", function () {
            var audio = document.querySelector(".myAudio");

            if (document.querySelector(".music").innerHTML == `<i class="fas fa-volume-up"></i>`) {
                document.querySelector(".music").innerHTML = `<i class='fas fa-volume-mute'></i>`
                audio.loop = true;
                audio.addEventListener("canplaythrough", function () {
                    audio.play();
                });

                audio.addEventListener("ended", function () {
                    audio.currentTime = 0;
                    audio.play();
                });

                audio.load();
            } else {
                document.querySelector(".music").innerHTML = `<i class="fas fa-volume-up"></i>`
                audio.pause();
            };

        })
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
    <button class = "topRightElem play" id = "play">  <i class="fa fa-play "  ></i> </button > 
    <button class = "topRightElem pause" id = "pause">  <i class="fa fa-pause "  ></i> </button > 
    <button class = "topRightElem music" ><i class="fas fa-volume-up"></i></button > 
    <button class = "topRightElem help" id = "help"> Rules </button > 
    </div>
<audio class="myAudio">
  <source src="8bit.mp3" >
</audio>  `
    }
}

/*
  <select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>
  */