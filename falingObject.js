export class FalingObject {
    posX
    posY = 80
    counter = 0
    type
    lastCathedObject
    amountOfDroplets
    platformWidt
    lastCatchedObjectHands
    possibleElements = ["sofa", "chair", "sofa", "chair", "fas fa-droplet", "platform", "hands", "hands"]
    // possibleElements = ["sofa", "chair", "fas fa-droplet", "platform", "hands"]
    constructor() {
        this.type = this.possibleElements[Math.floor(Math.random() * this.possibleElements.length)]
        if (this.type === "fas fa-droplet") {
            this.amountOfDroplets = generateDroplets()
        } else if (this.type === "sofa") {
            generateSofa(this.lastCathedObject)
        } else if (this.type === "platform") {
            this.platformWidt = generatePlatform()
        } else if (this.type === "hands") {
            generateHands(this.counter)
        } else {
            generateChair(this.lastCathedObject)

        }
    }
    chairFall() {

        var falingObject = getObjectCoordinates(".falingObject");
        var person = getObjectCoordinates(".person");
        this.posY = falingObject.bottom < person.bottom ? this.posY - 0.25 : 80;
        if (this.posY == 80) {
            // if I catch chair
            if (this.type == "chair") {
                let falingChair = getObjectCoordinates(".chair");
                if (Math.abs(person.middle - falingChair.middle) < 80) {
                    if (this.lastCathedObject == "hands") {
                        this.counter++
                    }
                    this.counter++
                    if (this.counter > 0) {
                        document.querySelector(".person").value = "moveWithChair"
                        document.querySelector(".person").src = "/img/personWithChairs.png";
                    } else {
                        document.querySelector(".person").src = "/img/personWithoutChairs.png";
                        document.querySelector(".person").value = "moveWithoutChair"
                    }
                    document.querySelector(".counter").innerHTML = `<div class="counter">${this.counter}</div>`
                    this.lastCathedObject = "chair"
                } else {
                    this.lastCathedObject = "nothing"
                }
                // if I catch couch
            } else if (this.type == "sofa") {
                var sofaObject = getObjectCoordinates(".sofa");
                if (sofaObject.left < person.left && sofaObject.right > person.right) {
                    if (this.lastCathedObject == "hands") {
                        this.counter--
                    }
                    this.counter--
                    this.lastCathedObject = "sofa"
                    if (this.counter > 0) {
                        document.querySelector(".person").value = "moveWithChair"
                        document.querySelector(".person").src = "/img/personWithChairs.png";
                    } else {
                        document.querySelector(".person").value = "moveWithoutChair"
                        document.querySelector(".person").src = "/img/personWithoutChairs.png";
                    }
                    document.querySelector(".counter").innerHTML = `<div class="counter">${this.counter}</div>`
                    document.querySelector(".cloud").style.display = "none"
                } else {
                    this.lastCathedObject = "nothing"
                }
            } // if I catch droplet
            else if (this.type == "fas fa-droplet") {
                this.lastCathedObject = "nothing"
                for (var i = 0; i < this.amountOfDroplets; i++) {
                    var dropletID = ".droplet" + i
                    let oneDroplet = document.querySelector(dropletID).getBoundingClientRect();
                    let fallingObjMiddlePos = oneDroplet.left + oneDroplet.width / 2
                    if (Math.abs(fallingObjMiddlePos - person.middle) < 40) {
                        this.lastCathedObject = "droplet"
                        document.querySelector(".cloud").style.display = "block"
                        break
                    }
                }
            } else if (this.type == "platform") { // i catched platform
                this.lastCathedObject = "nothing"
                var platform = getObjectCoordinates(".platform");
                if (person.left > platform.left && person.right < platform.right) {
                    document.querySelector(".land").style.width = `${this.platformWidt}%`
                    this.lastCathedObject = "platform"
                    if (this.counter > 0) {
                        document.querySelector(".person").value = "moveWithChair"
                        document.querySelector(".person").src = "/img/personWithChairs.png";
                    } else {
                        document.querySelector(".person").value = "moveWithoutChair"
                        document.querySelector(".person").src = "/img/personWithoutChairs.png";
                    }
                }
                document.querySelector(".cloud").style.display = "none"
            } else if (this.type == "hands") { // i catched hands
                this.lastCathedObject = "nothing"
                let hand1 = getObjectCoordinates(".hand1")
                let hand2 = getObjectCoordinates(".hand2")
                if (Math.abs(person.middle - hand1.middle) < 90 || Math.abs(person.middle - hand2.middle) < 90) {
                    this.lastCathedObject = "hands"
                    if (this.counter > 0) {
                        document.querySelector(".person").src = "/img/personWithoutChairsAndHands.png";
                        document.querySelector(".person").value = "moveWithChairAndHands"
                    } else {
                        document.querySelector(".person").src = "/img/personWithoutChairsWithHands.png";
                        document.querySelector(".person").value = "moveWithHands"
                    }
                }
            } else { // i didn't catch anything
                this.lastCathedObject = "nothing"
            }
            if (this.lastCathedObject == "nothing") {
                document.querySelector(".cloud").style.display = "none"
                if (this.counter > 0) {
                    document.querySelector(".person").value = "moveWithChair"
                    document.querySelector(".person").src = "/img/personWithChairs.png";
                } else {
                    document.querySelector(".person").src = "/img/personWithoutChairs.png";
                    document.querySelector(".person").value = "moveWithoutChair"
                }
            };
            if (this.counter == 20 || this.counter == 21) {
                console.log("Game OVER")
                document.querySelector(".falingObject").style.display = "none"
                document.querySelector(".gameCtrl").style.display = "none"
                document.querySelector(".movmentCtrl").style.display = "none"
                document.querySelector(".next").style.display = "none"
                let introTextField = document.querySelector(".intro");
                introTextField.style.display = "block"
            }
            this.type = this.possibleElements[Math.floor(Math.random() * this.possibleElements.length)]
            if (this.type === "fas fa-droplet") {
                this.amountOfDroplets = generateDroplets()
            } else if (this.type === "sofa") {
                generateSofa(this.lastCathedObject)
            } else if (this.type === "platform") {
                this.platformWidt = generatePlatform()
                this.posX = 50
            } else if (this.type === "hands") {
                generateHands(this.counter)
            } else {
                generateChair(this.lastCathedObject)
            }
        }

        Object.assign(document.querySelector(".falingObject").style, {
            bottom: `${this.posY}% `,
        });
    }

}
const generateDroplets = function () {
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${50}% `,
    });
    let amountOfDroplets = Math.floor(Math.random() * 10) + 3;
    let chairHTML = document.querySelector(".falingObject");
    var dropletID = "fas fa-droplet" + " droplet0"
    var displayedElem = `<div class="dropletBox"><i class='${dropletID}' ></i>`
    for (var i = 1; i < amountOfDroplets; i++) {
        var dropletID = "fas fa-droplet" + " droplet" + i
        displayedElem += `<i class='${dropletID}' ></i>`
        chairHTML.innerHTML = displayedElem
    }
    displayedElem += `</div>`
    var land = getObjectCoordinates(".land");

    Object.assign(document.querySelector(".dropletBox").style, {
        width: `${land.right - land.left}px `,
    });
    return amountOfDroplets
};
const generateChair = function (lastCathedObject) {
    var displayedElem = ""
    if (lastCathedObject == "hands") {
        displayedElem = `<img class  = "chair" src="/img/chair.png" alt="if you read this, you have bad internet"><h1 class = "texstX2 chaiText">x2</h1>`
    } else {
        displayedElem = `<img class  = "chair" src="/img/chair.png" alt="if you read this, you have bad internet">`
    }

    let chairHTML = document.querySelector(".falingObject");
    var land1 = getObjectCoordinates(".land");
    let posX = Math.floor(Math.random() * (land1.right - land1.left)) + land1.left
    Object.assign(document.querySelector(".chair").style, {
        left: `${posX}px `,
    });


    chairHTML.innerHTML = displayedElem

}
const generateSofa = function (lastCathedObject) {
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${50}% `,
    });
    let chairHTML = document.querySelector(".falingObject");
    var displayedElem = ""
    if (lastCathedObject == "hands") {
        displayedElem = `<div class="sofa"><img class  = "sofaIMG" src="/img/sofa.png"><h1 class = "texstX2">x2</h1></div>`
    } else {
        displayedElem = `<div class="sofa"><img class  = "sofaIMG" src="/img/sofa.png"></div>`
    } chairHTML.innerHTML = displayedElem
    let person = getObjectCoordinates(".person")
    Object.assign(document.querySelector(".sofa").style, {
        left: `${person.left}px`,
    });


};
const generatePlatform = function () {
    document.querySelector(".falingObject").innerHTML = `<div class = "boxForPlatform"><div class="platform"></div></div>`
    let platformWidt = 20 + Math.floor(Math.random() * 40)
    document.querySelector(".platform").style.width = `${platformWidt}vw`
    let land = getObjectCoordinates(".land")
    let human = getObjectCoordinates(".person")
    if (human.left < land.left) {
        Object.assign(document.querySelector(".person").style, {
            left: `${land.left}px `,
        });
    } else if (human.right > land.right) {
        Object.assign(document.querySelector(".person").style, {
            left: `${land.right}px `,
        });
    }
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${50}% `,
    });
    return platformWidt
};
const generateHands = function (counter) {
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${50}% `,
    });

    let displayedElem = `<div class = "handBox"> <img class  = "hand1 hand" src="/img/rightHand.png" ><img class  = "hand2 hand" src="/img/leftHand.png" ></div>`
    let chairHTML = document.querySelector(".falingObject");
    var land1 = getObjectCoordinates(".land");
    chairHTML.innerHTML = displayedElem

    var posX = Math.floor(Math.random() * (land1.right - land1.left)) + land1.left

    Object.assign(document.querySelector(".hand1").style, {
        left: `${posX}px `,
    });
    posX = Math.floor(Math.random() * (land1.right - land1.left)) + land1.left
    Object.assign(document.querySelector(".hand2").style, {
        left: `${posX}px `,
    });
    if (counter > 10) {
        console.log("counter: ", counter)
        document.querySelector(".hand1").style.animation = "rotateChair 2s infinite linear";
        document.querySelector(".hand2").style.animation = "rotateChair 2s infinite linear";
    } else {
        document.querySelector(".hand1").style.animation = "";
        document.querySelector(".hand2").style.animation = "";
    }
};
export const getObjectCoordinates = function (elem) {
    return {
        object: document.querySelector(elem),
        right: document.querySelector(elem).getBoundingClientRect().right,
        left: document.querySelector(elem).getBoundingClientRect().left,
        bottom: Math.floor(document.querySelector(elem).getBoundingClientRect().bottom),
        middle: document.querySelector(elem).getBoundingClientRect().left + document.querySelector(elem).getBoundingClientRect().width / 2
    }
}

