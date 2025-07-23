function attachDragEvents(target) {
    target.addEventListener('dragstart', () => {
      target.classList.add('flying');
    });
    target.addEventListener('dragend', () => {
      target.classList.remove('flying');
    });
  }



document.addEventListener("DOMContentLoaded",function(){
    const todo_board = document.getElementById("todo-board");
    const inprogress_board = document.getElementById("inprogress-board");
    const done_board = document.getElementById("done-board");
    const todoBtn = document.getElementById("create-todo-task");
    const inprogressBtn = document.getElementById("create-inprogress-task");
    const doneBtn = document.getElementById("create-done-task");
    const items = document.querySelectorAll(".item");
    const boards = document.querySelectorAll(".items");

    todoBtn.addEventListener("click",()=>{

        const input = prompt("Enter the task");
        if(input){
            let element = document.createElement("p");
        element.className = "item";
        element.innerText = input;
        element.setAttribute("draggable",true);
        todo_board.appendChild(element);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        element.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
            element.remove();
        })

        attachDragEvents(element);

        }

    })

    inprogressBtn.addEventListener("click",()=>{

        const input = prompt("Enter the task");
        if(input){
            let element = document.createElement("p");
        element.className = "item";
        element.innerText = input;
        element.setAttribute("draggable",true);
        inprogress_board.appendChild(element);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        element.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
            element.remove();
        })

        attachDragEvents(element);

        }
    })

    doneBtn.addEventListener("click",()=>{

        const input = prompt("Enter the task");
        if(input){
            let element = document.createElement("p");
        element.className = "item";
        element.innerText = input;
        element.setAttribute("draggable",true);
        done_board.appendChild(element);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        element.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
            element.remove();

            attachDragEvents(element);

        })
        }
    })


    boards.forEach(board =>{
        board.addEventListener("dragover",()=>{
            const flyingElement = document.querySelector(".flying");
            board.appendChild(flyingElement);
        })
    })
})