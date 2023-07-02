export class Intro {
    replics = ["Where am I? What happened? This place looks nothing like my room. The surroundings are completely unfamiliar, and I can't seem to remember how I got here. My mind feels foggy, and I'm struggling to make sense of my surroundings.",
        "I remember that my name is Alek. Damn I so want to drink...",
        "WOW nice, seems if I wish for something it will appear. I want a cake!",
        "Okay, it seems I have to be more precise. Damn I am so tired. I would like to sit somewhere. Maybe you can help me? I will try to imagine a couple of chairs and you will help me to catch them. I think I need 20 chairs, I don't know why exactly 20, just help me.",
        `Wow, thanks. Now that I got some rest I remember how I got here: <a href="https://www.youtube.com/watch?v=LxFgPdizUlU">if you didn't see the video press here</a>`];
    replicCounter = 0;
    constructor() {

        let introTextField = document.querySelector(".intro");
        let displayedElem = `                
        <img class  = "meIntro" src="/img/introIMG.png" alt="if you read this, you have bad internet">
        <div class="textField"> 
                <p class = "replic">${this.replics[0]}</p> 
                <button class = "next" id = "play"> next ></i> </button > 
           </div > `
        introTextField.innerHTML = displayedElem
    }
}

