const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
addBtn.addEventListener("click",function(){
    const value = todoInput.value;
    const li=document.createElement("li");
    li.innerText=value;
    todoList.appendChild(li);
    todoInput.value="";
    const xbutton=document.createElement("button");
    xbutton.innerText="X";
    li.appendChild(xbutton);
    xbutton.addEventListener("click",function(){
        li.remove();
    })
})
