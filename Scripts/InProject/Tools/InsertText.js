const InserTextToolName = "Insert Text";

function EnableInsertText() {
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
            NewText.contentEditable = "true";

            Canvas.appendChild(NewText);
            NewText.focus();

            AddLayer("New text", NewText);
            SetAsDraggable(NewText);
            
            // Able to select tis layer by clicking on the actual object in the canvas
            // If the user click twice, the layer will be unselected and the user starts editing the text
            let lastTimeClicked = 0;

            NewText.addEventListener("click", function() {
                const CurrentTime = (new Date()).getTime();

                if (lastTimeClicked > 0) {
                    const Difference = CurrentTime - lastTimeClicked;

                    if (Difference < 300) { // If the user clicked quick enough, the text will be in edit mode
                        NewText.contentEditable = "true";
                        NewText.focus();

                        return;
                    }
                }
                
                lastTimeClicked = CurrentTime;
                SelectLayer(NewText.style.zIndex - 1);
            })

            // When the user unfocuses the text, it will no longer editable until you click twice over it
            NewText.addEventListener("blur", function() {
                NewText.contentEditable = "false";
                canInsertText = true;
            });
            
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