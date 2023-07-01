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
        let musicButton = document.querySelector(".music");
        musicButton.addEventListener("click", function () {
            document.querySelector(".listOfSongs").style.display = "block"
            if (screen.width > 800) {
                let songLeft = document.querySelector(".music").getBoundingClientRect().left
                let songTop = document.querySelector(".music").getBoundingClientRect().bottom
                Object.assign(document.querySelector(".songBox").style, {
                    left: `${songLeft}px `,
                    top: `${songTop}px `,
                });
                document.querySelector(".songBox").style.transform = "translate(0, 0)"

            } else {
                document.querySelector(".songBox").style.transform = "translate(-50%, -50%)"
                Object.assign(document.querySelector(".songBox").style, {
                    left: `50%`,
                    top: `50%`,
                });
            }
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
    <div class=" counter">${counter}</div>
    <button class = "topRightElem play" id = "play">  <i class="fa fa-play "  ></i> </button > 
    <button class = "topRightElem pause" id = "pause">  <i class="fa fa-pause "  ></i> </button > 
    <button class = "topRightElem music" ><i class="fas fa-volume-mute"></i></button > 
    <button class = "topRightElem help" id = "help"> Rules </button > 
    <audio class="myAudio">
    <source src="audio/one.mp3" >
    </audio>  `
        // render songs 
        let songs = ["one", "two", "none"]
        var displayedElem = `<div class = "songBox">`
        songs.forEach(x =>
            displayedElem += `<button class = "song ${x}" id ="${x}">${x}</button>`
        )
        displayedElem += `</div>`
        document.querySelector(".listOfSongs").innerHTML = displayedElem
        songs.forEach(x =>
            document.querySelector("." + x).addEventListener("click", function () {
                if (x != "none") {
                    document.querySelector(".myAudio").innerHTML = `<source src="audio/${x}.mp3" >`
                    var audio = document.querySelector(".myAudio");
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
                    var audio = document.querySelector(".myAudio");
                    document.querySelector(".music").innerHTML = `<i class="fas fa-volume-mute"></i>`
                    audio.pause();
                }
                document.querySelector(".listOfSongs").style.display = "none"

            })
        )
    }
}

