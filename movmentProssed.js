export class PersonsMovmentControl {

    constructor(existingElement) {

        let person = document.querySelector(".person");
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            let land = getObjectCoordinates(existingElement)
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
}