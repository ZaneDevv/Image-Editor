const InserTextToolName = "Insert Text";

function EnableInsertText() {
    const TextInput = document.getElementById("text-input");

    const InsertTextButton = document.getElementById("insert-text");
    const Canvas = document.getElementById("canvas");

    const Body = document.getElementsByTagName("body")[0];

    const Color = document.getElementById("color");

    let canInsertText = true;

    function InsertText() {
        // Inserting text already selected, unselect it
        if (CurrentToolSelected == InserTextToolName) {
            CurrentToolSelected = null;
            Body.style.cursor = "default";
            
            return;
        }

        if (!canInsertText) { return; }
        canInsertText = false;

        CurrentToolSelected = InserTextToolName;
        Body.style.cursor = "text";

        window.addEventListener("click", function() {

            // If the user selected a different tools previusly, doesn't insert text
            if (CurrentToolSelected != InserTextToolName) {
                this.window.removeEventListener("click", arguments.callee);
                return;
            }

            const MouseX = MousePosition.x - CanvasRect.left;
            const MouseY = MousePosition.y - CanvasRect.top;

            // Checking if the click was on the canvas
            const IsMouseOverCanvas = MouseX >= 0 && MouseX <= parseInt(Canvas.style.width)
                                   && MouseY >= 0 && MouseY <= parseInt(Canvas.style.height);


            if (!IsMouseOverCanvas) { return; }
            this.window.removeEventListener("click", arguments.callee);

            // Creating a new text
            const NewText = this.document.createElement("span");
            NewText.style.color = Color.value;
            NewText.style.left = `${MouseX}px`;
            NewText.style.top = `${MouseY}px`;
            NewText.style.fontSize = "2rem";
            NewText.style.fontFamily = "Courier New";
            NewText.style.position = "absolute";
            NewText.style.transform = "translateY(-50%)";

            Canvas.appendChild(NewText);
            
            // Editing text behaviour
            TextInput.focus();

            function UpdateText() {
                NewText.innerHTML = TextInput.value;
            }
            function FinishEditing(event) {
                if (event.key != "Enter") { return; }

                TextInput.removeEventListener("input", UpdateText);
                TextInput.removeEventListener("keydown", FinishEditing);
                TextInput.blur();

                TextInput.value = "";

                canInsertText = true;
            }

            TextInput.addEventListener("input", UpdateText);
            TextInput.addEventListener("keyup", FinishEditing);
            this.window.addEventListener("mouseup", () => {
                

                this.windows.removeEventListener("mouseup", arguments.callee);
            })
            
            

            AddLayer("New text", NewText);
            SetAsDraggable(NewText);
            
            // Able to select tis layer by clicking on the actual object in the canvas
            NewText.addEventListener("click", function() {
                SelectLayer(NewText.style.zIndex - 1);
            })
            
            Body.style.cursor = "default";
            CurrentToolSelected = null;
        })
    }

    InsertTextButton.addEventListener("click", InsertText);
    window.addEventListener("keyup", function(event) {
      if (event.key != "t") { return; }
      InsertText();  
    })
}