document.addEventListener("DOMContentLoaded",function(){
    const todo_board = document.getElementById("todo-board");
    const inprogress_board = document.getElementById("inprogress-board");
    const done_board = document.getElementById("done-board");
    const todoBtn = document.getElementById("create-todo-task");
    const inprogressBtn = document.getElementById("create-inprogress-task");
    const doneBtn = document.getElementById("create-done-task");

    todoBtn.addEventListener("click",()=>{

        const input = prompt("Enter the task");
        if(input){
            let element = document.createElement("p");
        element.className = "item";
        element.innerText = input;
        todo_board.appendChild(element);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        element.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
            element.remove();
        })
        }
    })

    inprogressBtn.addEventListener("click",()=>{

        const input = prompt("Enter the task");
        if(input){
            let element = document.createElement("p");
        element.className = "item";
        element.innerText = input;
        inprogress_board.appendChild(element);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        element.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
            element.remove();
        })
        }
    })

    doneBtn.addEventListener("click",()=>{

        const input = prompt("Enter the task");
        if(input){
            let element = document.createElement("p");
        element.className = "item";
        element.innerText = input;
        done_board.appendChild(element);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        element.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
            element.remove();
        })
        }
    })

})