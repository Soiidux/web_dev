function ThemeChange(color){
    document.body.style.backgroundColor= color;
    if(color==="black"){
        document.body.style.color="white";
    }
    else{
        document.body.style.color="black";
    }
}


const ThemeButton = document.getElementById("theme-button");
ThemeButton.addEventListener("click",function(){
    let current_theme = document.body.style.backgroundColor;
    if (!(current_theme==="black")){
        ThemeButton.innerText="Click me for light mode";
        ThemeChange("black");
    }
    else{
        ThemeButton.innerText="Click me for dark mode";
        ThemeChange("white");
    }
})