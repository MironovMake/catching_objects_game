import { CtrlElems } from "./controlPanel.js";
import { MoveElems } from "./moveCtrl.js";
import { Intro } from "./intro.js";
import { getObjectCoordinates } from "./falingObject.js";
import { PersonsMovmentControl } from "./movmentProssed.js";
let intro = new Intro()
var counterReplics = 0;
const nextButton = document.querySelector(".next");
nextButton.addEventListener("click", function () {
    counterReplics++

    if (counterReplics < intro.replics.length - 1) {
        let introTextField = document.querySelector(".replic");
        var interval = null
        var j = 0
        interval = setInterval(() => {
            j++
            if (j == intro.replics[counterReplics].length - 1) {
                clearInterval(interval);
            }
            let texst = intro.replics[counterReplics].substr(0, j);
            introTextField.innerHTML = `<p class = "replic">${texst}</p>`
        }, 10);
    } else {

        let introTextField = document.querySelector(".intro");
        introTextField.style.display = "none"
        // document.querySelector(".meInGame").innerHTML = `<img class  = "withoutChair person" src="/img/personWithoutChairs.png" alt="if you read this, you have bad internet">`

        // document.querySelector(".withoutChair").
        new CtrlElems()

        new MoveElems()

        const person = document.querySelector(".person");


        const moveLeft = document.querySelector("#left");
        moveLeft.addEventListener("mousemove", function () {
            let land = getObjectCoordinates(".land")
            let human = getObjectCoordinates(".person")
            if (human.left < land.left) {
                Object.assign(person.style, {
                    left: `${land.left}px `,
                });
            } else {
                Object.assign(person.style, {
                    left: `${human.left - 10}px `,
                });
            }

        });

        const moveRight = document.querySelector("#right");
        moveRight.addEventListener("mousemove", function () {
            let land = getObjectCoordinates(".land")
            let human = getObjectCoordinates(".person")
            if (human.right > land.right) {
                Object.assign(person.style, {
                    left: `${land.right}px `,
                });
            } else {
                Object.assign(person.style, {
                    left: `${human.right + 10}px `,
                });
            }
        });
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            let land = getObjectCoordinates(".land")
            let human = getObjectCoordinates(".person")
            if (e.keyCode == '37') {
                if (human.left < land.left) {
                    Object.assign(person.style, {
                        left: `${land.left}px `,
                    });
                } else {
                    Object.assign(person.style, {
                        left: `${human.left - 10}px `,
                    });
                }
            } else if (e.keyCode == '39') {
                if (human.right > land.right) {
                    Object.assign(person.style, {
                        left: `${land.right}px `,
                    });
                } else {
                    Object.assign(person.style, {
                        left: `${human.right + 10}px `,
                    });
                }
            }
        }
    }
});
