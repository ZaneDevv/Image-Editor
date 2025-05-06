let UndoStack = [];
let RedoStack = [];

function Undo() {
    console.log("Undo");
    if (UndoStack.length == 0) { return; }
}

function Redo() {
    console.log("Redo");
    if (RedoStack.length == 0) { return; }
}

function AddTaskDone(task) {
    UndoStack.push(task);
}

function EnableUndoRedo() {
    let isControlPressed = false;
    let isShiftPressed = false;

    window.addEventListener("keyup", function(event) {
        switch(event.key) {
            case "z":
                if (isControlPressed && isShiftPressed) {
                    Redo();
                    break;
                }

                if (isControlPressed) {
                    Undo();
                }

                break;
                
            case "Control": 
                isControlPressed = false;
                break;

            case "Shift":
                isShiftPressed = false;
                break;
            
            default: break;
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.key === "Control") {
            isControlPressed = true;
            return;
        }
        
        if (event.key === "Shift") {
            isShiftPressed = true;
        }
    });
}
