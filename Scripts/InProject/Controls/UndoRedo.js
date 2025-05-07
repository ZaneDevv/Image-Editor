let UndoStack = [];
let RedoStack = [];

function Undo() {
    if (UndoStack.length == 0) { return; } // Cannot work without tasks done

    let lastTaskDone = UndoStack.pop();
    lastTaskDone.Undo();
    RedoStack.push(lastTaskDone);

    console.log("Undo: ", UndoStack, "\n Redo: ", RedoStack)
}

function Redo() {
    if (RedoStack.length == 0) { return; } // Cannot work without any undo done

    let lastUndoDone = RedoStack.pop();
    lastUndoDone.Redo();
    UndoStack.push(lastUndoDone);

    console.log("Undo: ", UndoStack, "\n Redo: ", RedoStack)
}

function AddTaskDone(task) {
    UndoStack.push(task);
    console.log("Undo: ", UndoStack, "\n Redo: ", RedoStack)
}

function EnableUndoRedo() {
    let isControlPressed = false;

    window.addEventListener("keyup", function(event) {
        switch(event.key) {
            case "z":
                if (isControlPressed) {
                    Undo();
                }

                break;

            case "y":
                if (isControlPressed) {
                    Redo();
                }

                break;

            case "Control": 
                isControlPressed = false;
                break;
            
            default: break;
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.key != "Control") { return;}
        
        isControlPressed = true;
    });
}
