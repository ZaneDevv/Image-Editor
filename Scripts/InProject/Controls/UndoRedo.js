let UndoStack = [];
let RedoStack = [];

function Undo() {
    if (UndoStack.length == 0) { // Cannot work without tasks done

        if (DEBUGGING_MODE) {
            ErrorPrint("There's no tasks in the undo stack.");
        }

        return;
    }

    if (DEBUGGING_MODE) {
        DebugPrint("Undo");
    }

    let lastTaskDone = UndoStack.pop();
    lastTaskDone.Undo();
    RedoStack.push(lastTaskDone);
}

function Redo() {
    if (RedoStack.length == 0) { // Cannot work without any undo done

        if (DEBUGGING_MODE) {
            ErrorPrint("There's no tasks in the redo stack.");
        }

        return;
    } 

    if (DEBUGGING_MODE) {
        DebugPrint("Redo");
    }

    let lastUndoDone = RedoStack.pop();
    lastUndoDone.Redo();
    UndoStack.push(lastUndoDone);
}

function AddTaskDone(task) {
    UndoStack.push(task);

    if (DEBUGGING_MODE) {
        DebugPrint("Task added to the undo stack.");
    }
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
