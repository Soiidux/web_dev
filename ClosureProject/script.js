document.addEventListener("DOMContentLoaded",function(){
    const color_selector = document.getElementById("color-selector");
    const customcolor_input = document.getElementById("custom-input");

    //Event listener to enable input when the user selects a custom input
    color_selector.addEventListener("change",()=>{
        // console.log(color_selector.value);
        if(color_selector.value === "custom"){
            customcolor_input.style.display = "inline-block";
        }
        else{
            customcolor_input.style.display = "none";
            customcolor_input.value = "";
        }
    })
})
