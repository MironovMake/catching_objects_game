import { Chair } from "./chair.js";


let movmentControl = document.querySelector(".movmentCtrl");
let meInGame = document.querySelector(".meInGame");
// let chairHTML = document.querySelector(".chair");
let gamecCtrl = document.querySelector(".gameCtrl");

var chairExist = false
class CtrlElems {
    constructor() {
        gamecCtrl = document.querySelector(".gameCtrl");
        gamecCtrl.innerHTML = `
        <div class="gamecCtrlBOX">
        <div class="counter">0</div>
        <i class="fa fa-play " id = "play" onClick="startGame()" ></i>
    <i class="fa fa-pause"  id = "stop"  onmousedown="stopGame()" ></i>
    </div>`
    }
}
let ctrlElems = new CtrlElems()

var timeInterval
function startGame() {
    if (!chairExist) {
        let chair = new Chair()
        timeInterval = setInterval(() => {
            chair.chairFall()
        }, 10);
    }
    chairExist = true;
}

function stopGame() {
    chairExist = false
    clearInterval(timeInterval);

}
function renderElement() {
    var displayedElem = `
        <div class="control" > 
    <i class="nav fa fa-arrow-circle-left" id ="left" onClick="movePerson(this.id)"></i>
     <i class="nav fa fa-arrow-circle-right" id ="right"onClick="movePerson(this.id)"></i>
   </div > `
    movmentControl.innerHTML = displayedElem
}
renderElement()

let possition = 50
function movePerson(direction) {

    let step = direction === "left" ? -1 : 1;
    let formElement = document.querySelector(".fa-person");

    // meInGame.innerHTML = allmenu
    possition = possition + step;
    // if (element.right + 10 < elementwrapper.right)
    Object.assign(formElement.style, {
        left: `${possition}% `,
    });


}
movePerson();