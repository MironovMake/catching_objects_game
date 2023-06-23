import { CtrlElems } from "./controlPanel.js";
import { MoveElems } from "./moveCtrl.js";
import { Intro } from "./intro.js";
import { getObjectCoordinates } from "./falingObject.js";

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
        if (counterReplics == 2) {
            document.querySelector(".cake").style.display = "block"
        }
    } else {
        document.querySelector(".cake").style.display = "none"

        let clue = document.querySelector(".clue");
        let clueText = `<h1>You need to colect 20 chairs</h1>
        <ul>
        <li>catch chair, and you get +1 score</li>
        <li>catch sofa, you get -1 score</li>
        <li>if droplet fall on you, next object will appear under cloud</li>
        <li>hands, provide chair/sofa value doubled</li>
        <li>catch platform, your platform size will change</li>
        <li>don't wash you hands in toilet and you get may have "interesting" day</li></ul>` ;
        clue.innerHTML = clueText

        let introTextField = document.querySelector(".intro");
        introTextField.style.display = "none"

        new CtrlElems()
        new MoveElems()

        const person = document.querySelector(".person");
        let step = 1

        let leftStep = false
        let rightStep

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
                    updateImageWhenHoverRight()
                } else {
                    leftStep = !leftStep
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
                    updateImageWhenHoverLeft()
                } else {
                    rightStep = !rightStep
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
    }
}
function updateImageWhenHoverLeft() {
    let state = document.querySelector(".person").value
    switch (state) {
        case "moveWithoutChair":
            document.querySelector(".person").src = "/img/personWithoutChairsRightEdge.png"
            break;
        case "moveWithChair":
            document.querySelector(".person").src = "/img/personWithChairsRightEdge.png"
            break;
        case "moveWithChairAndHands":
            document.querySelector(".person").src = "/img/personWithoutChairsAndHandsRightEdge.png"
            break;
        case "moveWithHands":
            document.querySelector(".person").src = "/img/personWithoutChairsWithHandsRightEdge.png"
            break;
    }
}
function updateImageWhenHoverRight() {
    let state = document.querySelector(".person").value
    switch (state) {
        case "moveWithoutChair":
            document.querySelector(".person").src = "/img/personWithoutChairsLeftEdge.png"
            break;
        case "moveWithChair":
            document.querySelector(".person").src = "/img/personWithChairsLeftEdge.png"
            break;
        case "moveWithChairAndHands":
            document.querySelector(".person").src = "/img/personWithoutChairsAndHandsLeftEdge.png"
            break;
        case "moveWithHands":
            document.querySelector(".person").src = "/img/personWithoutChairsWithHandsLeftEdge.png"
            break;
    }

}