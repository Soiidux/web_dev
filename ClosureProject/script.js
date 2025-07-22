document.addEventListener("DOMContentLoaded",function(){
    const color_selector = document.getElementById("color-selector");
    const customcolor_input = document.getElementById("custom-input");
    const createBtn = document.getElementById("createbtn")
    const button_container = document.getElementById("buttons-container");

    //Event listener to enable input when the user selects a custom input
    color_selector.addEventListener("change",()=>{
        // console.log(color_selector.value);
        if(color_selector.value === "Custom"){
            customcolor_input.style.display = "inline-block";
        }
        else{
            customcolor_input.style.display = "none";
            customcolor_input.value = "";
        }
    })

    //Function that makes colored buttons and adds event listener to them
    function makeColorButton(color) {
        //Making a list element in the unordered list
        const li = document.createElement("li");
        button_container.appendChild(li);

        //Adding the color-change button in the list
        const btn = document.createElement("button");
        btn.innerText = color;
        btn.style.backgroundColor = color;
        btn.addEventListener("click", function () {
          document.body.style.backgroundColor = color;
        });
        li.appendChild(btn);
      }

    //Creating buttons by adding event listener to create btn
    createBtn.addEventListener("click",()=>{
        let color = color_selector.value === "Custom"? customcolor_input.value.trim() : color_selector.value
        makeColorButton(color);
    })

    
})
