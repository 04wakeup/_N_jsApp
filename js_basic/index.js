const title = document.getElementById("title");

const CLICKED_CLASS="clicked";

function handleClick(){
    title.classList.toggle(CLICKED_CLASS);
//    const hasClass = title.classList.contains(CLICKED_CLASS);
   
//    if(!hasClass){
//        title.classList.add(CLICKED_CLASS);
//    } else{
//        title.classList.remove(CLICKED_CLASS);
//    }
}

function init(){ 
    title.addEventListener("click", handleClick);
}

init();