export class Intro {
    replics = ["Where am I? What happened? This place looks nothing like my room. The surroundings are completely unfamiliar, and I can't seem to remember how I got here. My mind feels foggy, and I'm struggling to make sense of my surroundings.",
        "I remember that my name is Aleksand. Damn I so want to drink...",
        "WOW nice, seems if I will wish somethink it will appear, I want a cake.",
        "Okay seems I have to be ,ore pesicely. Damn I am so tierd. I would like to sit somwhere. Maybe you can help me? I will try to imagine couple chairs and you will help me to cathc them. I think I need 3 chairs, I don't know why exactly 3, just help me.",
        "Wow, what is it?"];
    replicCounter = 0;
    constructor() {

        let introTextField = document.querySelector(".intro");
        let displayedElem = `                
        <div class="textField"> 
        <img class  = "meIntro" src="/img/introIMG.png" alt="if you read this, you have bad internet">
                <p class = "replic">${this.replics[0]}</p> 
                <button class = "next" id = "play"> next ></i> </button > 
           </div > `
        introTextField.innerHTML = displayedElem




    }

}

