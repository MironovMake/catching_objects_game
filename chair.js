export class Chair {
    posX
    posY = 80

    constructor() {

        let chairHTML = document.querySelector(".chair");
        this.posX = 20 + Math.floor(Math.random() * 60)
        var displayedElem = `<i class='fas fa-chair' ></i>`
        Object.assign(document.querySelector(".chair").style, {
            left: `${this.posX}% `,
        });
        chairHTML.innerHTML = displayedElem
        Chair.instance = this;

    }
    chairFall() {
        let formElement = document.querySelector(".chair");

        this.posY = this.posY > 30 ? this.posY - 1 : 80;

        if (this.posY == 80) {
            this.posX = 20 + Math.floor(Math.random() * 60)

            Object.assign(formElement.style, {
                left: `${this.posX}% `,
            });
        }
        Object.assign(formElement.style, {
            bottom: `${this.posY}% `,
            left: `${this.posX}% `,
        });

    }
}