import { CtrlElems } from "./controlPanel.js";
import { MoveElems } from "./moveCtrl.js";
import { Intro } from "./intro.js";
import { getObjectCoordinates } from "./falingObject.js";
// import { PersonsMovmentControl } from "./movmentProssed.js";
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

        new CtrlElems()
        new MoveElems()

        const person = document.querySelector(".person");
        let step = 1
        let state = document.querySelector(".person").value = "moveWithoutChair"

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
                    left: `${human.left - step}px `,
                });
            }

        });
        let leftStep = false
        let rightStep
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
                    left: `${human.right + step}px `,
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
                    document.querySelector(".person").src = "/img/personWithoutChairsleftEdge.png";
                } else {
                    leftStep = !leftStep
                    // leftStep ? document.querySelector(".person").src = "/img/leftStep.png" : document.querySelector(".person").src = "/img/personWithoutChairs.png"
                    updateImageWhenMoveLeft(leftStep)
                    Object.assign(person.style, {
                        left: `${human.left - step}px `,
                    });
                }
            } else if (e.keyCode == '39') {
                if (human.right > land.right) {
                    Object.assign(person.style, {
                        left: `${land.right}px `,
                    });
                    document.querySelector(".person").src = "/img/personWithoutChairsRightEdge.png";
                } else {
                    rightStep = !rightStep
                    // updateImage()
                    updateImageWhenMoveRight(rightStep)
                    Object.assign(person.style, {
                        left: `${human.right + step}px `,
                    });
                }
            }
        }
    }
});

function updateImageWhenMoveRight(step) {
    let state = document.querySelector(".person").value
    switch (state) {
        case "moveWithoutChair":
            step ? document.querySelector(".person").src = "/img/rightStep.png" : document.querySelector(".person").src = "/img/personWithoutChairs.png"
            break;
        case "moveWithChair":
            step ? document.querySelector(".person").src = "/img/stepLeftWithChair.png" : document.querySelector(".person").src = "/img/personWithChairs.png"
            break;
        case "moveWithChairAndHands":
            step ? document.querySelector(".person").src = "/img/stepLeftWithChairsAndHands.png" : document.querySelector(".person").src = "/img/personWithoutChairsAndHands.png"
            break;
        case "moveWithHands":
            step ? document.querySelector(".person").src = "/img/stepLeftWithHands.png" : document.querySelector(".person").src = "/img/personWithoutChairsWithHands.png"
            break;
        case "rightHover":
            document.querySelector(".person").src = "/img/personWithoutChairs.png"
            break;
        case "rightHoverWithChair":
            document.querySelector(".person").src = "/img/rightStep.png"
            break;
        case "rightHoverWithChairAndHands":
            document.querySelector(".person").src = "/img/personWithoutChairs.png"
            break;
        case "rightHoverWithHands":
            document.querySelector(".person").src = "/img/rightStep.png"
            break;
    }
}
function updateImageWhenMoveLeft(step) {
    let state = document.querySelector(".person").value
    switch (state) {
        case "moveWithoutChair":
            step ? document.querySelector(".person").src = "/img/leftStep.png" : document.querySelector(".person").src = "/img/personWithoutChairs.png"
            break;
        case "moveWithChair":
            step ? document.querySelector(".person").src = "/img/stepRightWithChair.png" : document.querySelector(".person").src = "/img/personWithChairs.png"
            break;
        case "moveWithChairAndHands":
            step ? document.querySelector(".person").src = "/img/stepRightWithChairsAndHands.png" : document.querySelector(".person").src = "/img/personWithoutChairsAndHands.png"
            break;
        case "moveWithHands":
            step ? document.querySelector(".person").src = "/img/stepRightWithHands.png" : document.querySelector(".person").src = "/img/personWithoutChairsWithHands.png"
            break;
        case "rightHover":
            document.querySelector(".person").src = "/img/personWithoutChairs.png"
            break;
        case "rightHoverWithChair":
            document.querySelector(".person").src = "/img/rightStep.png"
            break;
        case "rightHoverWithChairAndHands":
            document.querySelector(".person").src = "/img/personWithoutChairs.png"
            break;
        case "rightHoverWithHands":
            document.querySelector(".person").src = "/img/rightStep.png"
            break;
    }
}