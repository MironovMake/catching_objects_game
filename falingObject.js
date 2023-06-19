export class FalingObject {
    posX
    posY = 80
    counter = 0
    type
    lastCathedObject
    amountOfDroplets
    platformWidt
    possibleElements = ["sofa", "chair", "fas fa-droplet", "platform", "hands"]
    // possibleElements = ["sofa", "chair", "fas fa-droplet", "platform", "hands"]
    constructor() {
        this.type = this.possibleElements[Math.floor(Math.random() * this.possibleElements.length)]
        if (this.type === "fas fa-droplet") {
            this.amountOfDroplets = generateDroplets()
        } else if (this.type === "sofa") {
            generateSofa()
        } else if (this.type === "platform") {
            this.platformWidt = generatePlatform()
        } else if (this.type === "hands") {
            generateHands()
        } else {
            generateChair()
        }
    }
    chairFall() {

        var falingObject = getObjectCoordinates(".falingObject");
        var person = getObjectCoordinates(".person");
        this.posY = falingObject.bottom < person.bottom ? this.posY - 0.25 : 80;
        console.log("person.left: ", person.left)
        if (this.posY == 80) {
            // if I catch chair
            if (this.type == "chair") {
                this.lastCathedObject = "nothing"
                let falingChair = getObjectCoordinates(".chair");

                if (Math.abs(person.middle - falingChair.middle) < 80) {
                    this.counter++
                    if (this.counter > 0) {
                        document.querySelector(".person").src = "/img/personWithChairs.png";
                        // document.querySelector(".meInGame").innerHTML = `<img class  = "person meInGame" id = "meInGame"src="/img/personWithChairs.png" alt="if you read this, you have bad internet">`;
                    } else {
                        // document.querySelector(".meInGame").innerHTML = `<img class  = "person meInGame" id = "meInGame"src="/img/personWithoutChairs.png" alt="if you read this, you have bad internet">`;
                        document.querySelector(".person").src = "/img/personWithoutChairs.png";
                    }
                    this.gamecCtrl = document.querySelector(".counter");
                    this.gamecCtrl.innerHTML = `<div class="counter">${this.counter}</div>`
                    this.lastCathedObject = "chair"
                }
                // if I catch couch
            } else if (this.type == "sofa") {
                //falingObject.left < person.left && falingObject.right > person.right && 
                var sofaObject = getObjectCoordinates(".sofa");
                this.lastCathedObject = "nothing"
                if (sofaObject.left < person.left && sofaObject.right > person.right) {
                    this.lastCathedObject = "sofa"
                    this.counter--
                    if (this.counter > 0) {
                        document.querySelector(".person").src = "/img/personWithChairs.png";
                        console.log("GHJKL:")
                        // document.querySelector(".meInGame").innerHTML = `<img class  = "person meInGame" id = "meInGame"src="/img/personWithChairs.png" alt="if you read this, you have bad internet">`;
                    } else {
                        // document.querySelector(".meInGame").innerHTML = `<img class  = "person meInGame" id = "meInGame"src="/img/personWithoutChairs.png" alt="if you read this, you have bad internet">`;
                        document.querySelector(".person").src = "/img/personWithoutChairs.png";
                    }
                    this.gamecCtrl = document.querySelector(".counter");
                    this.gamecCtrl.innerHTML = `<div class="counter">${this.counter}</div>`
                    document.querySelector(".cloud").style.display = "none"

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
                }
                document.querySelector(".cloud").style.display = "none"
            } else if (this.type == "hands") { // i catched platform
                this.lastCathedObject = "nothing"
                let hand1 = getObjectCoordinates(".hand1")
                let hand2 = getObjectCoordinates(".hand2")
                if (Math.abs(person.middle - hand1.middle) < 70 || Math.abs(person.middle - hand2.middle) < 70) {
                    this.lastCathedObject = "hands"
                    if (this.counter > 0) {
                        document.querySelector(".person").src = "/img/personWithoutChairsAndHands.png";
                    } else {
                        document.querySelector(".person").src = "/img/personWithoutChairsWithHands.png";
                    }
                }
            } else { // i didn't catch anything
                this.lastCathedObject = "nothing"
            }
            if (this.lastCathedObject == "nothing") {
                document.querySelector(".cloud").style.display = "none"
                if (this.counter > 0) {
                    document.querySelector(".person").src = "/img/personWithChairs.png";
                } else {
                    document.querySelector(".person").src = "/img/personWithoutChairs.png";
                }
            };

            if (this.counter == 4) {
                console.log("Game OVER")
                document.querySelector(".falingObject").style.display = "none"
                document.querySelector(".gameCtrl").style.display = "none"
                document.querySelector(".movmentCtrl").style.display = "none"
                document.querySelector(".next").style.display = "none"
                let introTextField = document.querySelector(".intro");
                introTextField.style.display = "block"

            }
            this.posX = 20 + Math.floor(Math.random() * 60)
            this.type = this.possibleElements[Math.floor(Math.random() * this.possibleElements.length)]
            this.posX = 20 + Math.floor(Math.random() * 60)
            if (this.type === "fas fa-droplet") {
                this.amountOfDroplets = generateDroplets()
                this.posX = 50
            } else if (this.type === "sofa") {
                generateSofa()
            } else if (this.type === "platform") {
                this.platformWidt = generatePlatform()
                this.posX = 50
            } else if (this.type === "hands") {
                generateHands()
            } else {
                generateChair()
            }
        }

        Object.assign(document.querySelector(".falingObject").style, {
            bottom: `${this.posY}% `,
        });
    }

}
const generateDroplets = function () {
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${0}% `,
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
    let asdbm = getObjectCoordinates(".dropletBox")

    Object.assign(document.querySelector(".dropletBox").style, {
        width: `${land.right - land.left}px `,
    });

    return amountOfDroplets
};
const generateChair = function () {
    let displayedElem = `<img class  = "chair" src="/img/chair.png" alt="if you read this, you have bad internet">`
    let chairHTML = document.querySelector(".falingObject");
    var land1 = getObjectCoordinates(".land");

    let posX = Math.floor(Math.random() * (land1.right - land1.left)) + land1.left

    Object.assign(document.querySelector(".falingObject").style, {
        left: `${posX}px `,
    });
    chairHTML.innerHTML = displayedElem

}
const generateSofa = function () {
    let chairHTML = document.querySelector(".falingObject");
    var displayedElem = `<div class="sofa"><img class  = "sofaIMG" src="/img/sofa.png"></div>`
    chairHTML.innerHTML = displayedElem
    let person = getObjectCoordinates(".person")
    Object.assign(document.querySelector(".sofa").style, {
        left: `${person.left}px`,
    });
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${0}% `,
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
const generateHands = function () {
    let land = getObjectCoordinates(".land")
    Math.floor(Math.random() * land.right) + land.left;

    let chairHTML = document.querySelector(".falingObject");
    var displayedElem = `<div class="hands"><img class  = "hand1 hand" src="/img/rightHand.png" ><img class  = "hand2 hand" src="/img/leftHand.png" ></div>`
    chairHTML.innerHTML = displayedElem
    let leftHand = Math.floor(Math.random() * (land.right - 200 - land.left)) + land.left
    Object.assign(document.querySelector(".hand1").style, {
        left: `${leftHand}px`,
    });
    leftHand = Math.floor(Math.random() * (land.right - 200 - land.left)) + land.left
    Object.assign(document.querySelector(".hand2").style, {
        left: `${leftHand}px`,
    });
    Object.assign(document.querySelector(".falingObject").style, {
        left: `${0}% `,
    });
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

