//Function to check if the hex code is a valid hexcode
function checkColor(color){
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexPattern.test(color);     
}


//Function to check if the color is dark or light
function isDarkColor(hexColor) {
    // Remove #
    hexColor = hexColor.replace("#", "");
  
    // Expand shorthand (e.g. #abc #aabbcc)
    if (hexColor.length === 3) {
      hexColor = hexColor.split("").map(c => c + c).join("");
    }
  
    // Parse into RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
  
    // Calculate brightness using relative luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness < 128; // dark if < 128
  }



document.addEventListener("DOMContentLoaded",function(){
    const color_selector = document.getElementById("color-selector");
    const customcolor_input = document.getElementById("custom-input");
    const createBtn = document.getElementById("createbtn")
    const button_container = document.getElementById("buttons-container");
    const resetBtn = document.getElementById("reset");
    
    //Event listener to enable input when the user selects a custom input
    color_selector.addEventListener("change",()=>{
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
        btn.style.color = isDarkColor(color) ? "white" : "black";
        btn.addEventListener("click", function () {
          document.body.style.backgroundColor = color;
          document.body.style.color = isDarkColor(color) ? "white" : "black";
        });
        li.appendChild(btn);

        //Adding a delete button to delete the list element i.e the color change button
        const deletebutton = document.createElement("button");
        deletebutton.innerText = "< = Delete this button";
        li.appendChild(deletebutton);
        deletebutton.addEventListener("click",()=>{
            li.remove();
        })

      }

    //Creating buttons by adding event listener to create btn
    createBtn.addEventListener("click",()=>{
        let color = color_selector.value === "Custom"? customcolor_input.value.trim() : color_selector.value
        if(color_selector.value === "Custom" && !checkColor(color)){
            alert("Invalid Hex code");
            customcolor_input.value="";
        }
        else{
            makeColorButton(color);
            customcolor_input.value="";
        }
    })


    //Reset button to reset the page
    resetBtn.addEventListener("click",()=>{
        button_container.innerHTML = "";
        customcolor_input.value = "";
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    })
    
})
