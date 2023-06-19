import { FalingObject } from "./falingObject.js";

export class Chair extends FalingObject {
    constructor() {
        let displayedElem = `<img class  = "chair" src="/img/chair.png" alt="if you read this, you have bad internet">`
        let chairHTML = document.querySelector(".falingObject");
        var land1 = getObjectCoordinates(".land");

        let posX = Math.floor(Math.random() * (land1.right - land1.left)) + land1.left

        Object.assign(document.querySelector(".falingObject").style, {
            left: `${posX}px `,
        });
        chairHTML.innerHTML = displayedElem
    }
}