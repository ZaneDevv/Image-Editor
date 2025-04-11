const InserTextToolName = "Insert Text";

function EnableInsertText() {
    const InsertTextButton = document.getElementById("insert-text");
    const Canvas = document.getElementById("canvas");

    const Body = document.getElementsByTagName("body")[0];

    const Color = document.getElementById("color");

    InsertTextButton.addEventListener("click", function() {
        // Inserting text already selected, unselect it
        if (CurrentToolSelected == InserTextToolName) {
            CurrentToolSelected = null;
            Body.style.cursor = "default";

            return;
        }

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
            NewText.innerHTML = 'holaaaa';
            
            Canvas.appendChild(NewText);

            AddLayer("New text", NewText);
            SetAsDraggable(NewText);
            
            // Able to select tis layer by clicking on the actual object in the canvas
            NewText.addEventListener("click", function() {
                SelectLayer(NewText.style.zIndex - 1);
            })
            
            Body.style.cursor = "default";
            CurrentToolSelected = null;
        })
    })
}