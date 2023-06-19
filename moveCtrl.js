export class MoveElems {

    constructor() {
        let movmentControl = document.querySelector(".movmentCtrl");
        let displayedElem = `
        <div class = "land">   </div > 
        <div class="control" >        
        <button id = "left">  <i class="nav fa fa-arrow-circle-left "  ></i> </button > 
        <button id = "right">  <i class="nav fa fa-arrow-circle-right "  ></i> </button > 
   </div > `
        movmentControl.innerHTML = displayedElem
    }

}