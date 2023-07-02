import { FalingObject } from "./falingObject.js";
export class CtrlElems {
    gamecCtrl
    objectExist
    object

    constructor() {
        this.objectExist = false
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

            this.object = new FalingObject()
            this.objectExist = true;
            var timeInterval = null

            timeInterval = setInterval(() => {
                this.object.objectFall()
                pauseButton.addEventListener("click", function () {
                    clearInterval(timeInterval);
                    playButton.style.display = "block"
                    pauseButton.style.display = "none"
                });
            }, 6);
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
    <div class=" counter">${counter}</div>
    <button class = "topRightElem play" id = "play">  <i class="fa fa-play "  ></i> </button > 
    <button class = "topRightElem pause" id = "pause">  <i class="fa fa-pause "  ></i> </button > 
    <button class = "topRightElem music" ><i class="fas fa-volume-mute"></i></button > 
    <button class = "topRightElem help" id = "help"> Rules </button > 
    <audio class="myAudio">
    <source src="audio/one.mp3" >
    </audio>  `
        // render songs 

        let musicButton = document.querySelector(".music");
        musicButton.addEventListener("click", function () {
            var audio = document.querySelector(".myAudio");

            if (document.querySelector(".music").innerHTML == `<i class="fas fa-volume-mute"></i>`) {
                document.querySelector(".music").innerHTML = `<i class='fas fa-volume-up'></i>`
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
                document.querySelector(".music").innerHTML = `<i class="fas fa-volume-mute"></i>`
                audio.pause();
            };

        })
    }
}

