const InserTextToolName = "Insert Text";

const TextEdtitingMenu  = document.getElementById("text-editing");
const BoldButton = document.querySelector("#text-editing > button[bold]");
const ItalicButton = document.querySelector("#text-editing > button[italic]");
const UnderlineButton = document.querySelector("#text-editing > button[underline]");
const ColorInput = document.querySelector("#text-editing > input[type='color']");
const SizeInput = document.querySelector("#text-editing > input[type='number']");

function SetTextAsEditable(Text) {
    if (DEBUGGING_MODE) {
        DebugPrint(`${Text} was set as editable.`);
    }

    let currentColor = "#000";
    let currentSize = "16px";

    let previousText = "";

    function TurnOnBold() {
        if (Text.style.fontWeight == "bold") {
            Text.style.fontWeight = "normal";

            AddTaskDone({
                Undo: () => {
                    Text.style.fontWeight = "bold";
                },
                Redo: () => {
                    Text.style.fontWeight = "normal";
                }
            });

            return;
        }

        Text.style.fontWeight = "bold";

        AddTaskDone({
            Undo: () => {
                Text.style.fontWeight = "normal";
            },
            Redo: () => {
                Text.style.fontWeight = "bold";
            }
        });
    }

    function TurnOnItalic() {
        if (Text.style.fontStyle == "italic") {
            Text.style.fontStyle = "normal";

            AddTaskDone({
                Undo: () => {
                    Text.style.fontStyle = "italic";
                },
                Redo: () => {
                    Text.style.fontStyle = "normal";

                }
            });

            return;
        }

        AddTaskDone({
            Undo: () => {
                Text.style.fontStyle = "normal";
            },
            Redo: () => {
                Text.style.fontStyle = "italic";

            }
        });

        Text.style.fontStyle = "italic";
    }

    function TurnOnUnderline() {
        if (Text.style.textDecoration == "underline") {
            Text.style.textDecoration = "none";

            AddTaskDone({
                Undo: () => {
                    Text.style.textDecoration = "none";
                },
                Redo: () => {
                    Text.style.textDecoration = "underline";

                }
            });

            return;
        }

        AddTaskDone({
            Undo: () => {
                Text.style.textDecoration = "underline";
            },
            Redo: () => {
                Text.style.textDecoration = "none";

            }
        });

        Text.style.textDecoration = "underline";
    }

    function ChangeColor() {
        const PreviousColor = currentColor;
        const NewColor = ColorInput.value;

        Text.style.color = NewColor;
        currentColor = NewColor;

        AddTaskDone({
            Undo: () => {
                Text.style.textDecoration = PreviousColor;
            },
            Redo: () => {
                Text.style.textDecoration = NewColor;

            }
        });
    }

    function ChangeSize() {
        const PreviousSize = currentSize;
        const NewSize = `${SizeInput.value}px`;

        Text.style.fontSize = NewSize;
        currentSize = NewSize;

        AddTaskDone({
            Undo: () => {
                Text.style.textDecoration = PreviousSize;
            },
            Redo: () => {
                Text.style.textDecoration = NewSize;
            }
        });
    }

    function EnableEditing() {
        const TextRect = Text.getBoundingClientRect();

        TextEdtitingMenu.style.left = TextRect.left;
        TextEdtitingMenu.style.bottom = TextRect.top;
        TextEdtitingMenu.style.visibility = "visible";

        BoldButton.addEventListener("mouseup", TurnOnBold);
        ItalicButton.addEventListener("mouseup", TurnOnItalic);
        UnderlineButton.addEventListener("mouseup", TurnOnUnderline);
        ColorInput.addEventListener("change", ChangeColor);
        SizeInput.addEventListener("change", ChangeSize);
    }
    EnableEditing();

    // Able to select tis layer by clicking on the actual object in the canvas
    // If the user click twice, the layer will be unselected and the user starts editing the text
    let lastTimeClicked = 0;

    Text.addEventListener("click", function() {
        const CurrentTime = (new Date()).getTime();

        if (lastTimeClicked > 0) {
            const Difference = CurrentTime - lastTimeClicked;

            if (Difference < 300) { // If the user clicked quick enough, the text will be in edit mode
                Text.contentEditable = "true";
                Text.focus();

                previousText = Text.textContent;

                // Enable text edition
                EnableEditing(Text);

                return;
            }
        }
        
        lastTimeClicked = CurrentTime;
        SelectLayer(Text.style.zIndex - 1);
    })

    // When the user unfocuses the text, it will no longer editable until you click twice over it
    this.window.addEventListener("mouseup", function() {
        let isMouseOnTextEditing = false; 
        {
            const Rect = TextEdtitingMenu.getBoundingClientRect();
        
            let aabbX = MousePosition.x > Rect.left && MousePosition.x < Rect.right;
            let aabbY = MousePosition.y > Rect.top && MousePosition.y < Rect.bottom;
        
            isMouseOnTextEditing = aabbX && aabbY;
        }
        
        let isMouseOnText = false;
        {
            const Rect = Text.getBoundingClientRect();
            const Position = GetMousePositionInCanvas();
        
            let aabbX = Position.x > Rect.left && Position.x < Rect.right;
            let aabbY = Position.y > Rect.top && Position.y < Rect.bottom;
        
            isMouseOnText = aabbX && aabbY;
        }
        
        // Didn't mean to blur it
        if (isMouseOnTextEditing || isMouseOnText) {
            Text.focus();  // Focus if the mouse is not over either element
            return;
        }
        

        Text.contentEditable = "false";
        canInsertText = true;

        // Disable text editing
        TextEdtitingMenu.style.visibility = "hidden";

        const NewText = Text.textContent;

        AddTaskDone({
            Undo: () => {
                Text.textContent = previousText;
            },
            Redo: () => {
                Text.textContent = NewText;
            }
        });
    
        BoldButton.removeEventListener("mouseup", TurnOnBold);
        ItalicButton.removeEventListener("mouseup", TurnOnItalic);
        UnderlineButton.removeEventListener("mouseup", TurnOnUnderline);
        ColorInput.removeEventListener("change", ChangeColor);
        SizeInput.removeEventListener("change", ChangeSize);

        if (DEBUGGING_MODE) {
            DebugPrint(`The content of the text was changed by: ${TextEdtitingMenu.innerHTML}`);
        }
    });
}

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

            canInsertText = true;

            if (DEBUGGING_MODE) {
                DebugPrint("Unselecting insert text tool.");
            }
            
            return;
        }

        if (DEBUGGING_MODE) {
            DebugPrint("Selecting insert text tool.");
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

            const CurrentMousePosition = GetMousePositionInCanvas();

            // Checking if the click was on the canvas
            const IsMouseOverCanvas = CurrentMousePosition.x >= 0 && CurrentMousePosition.x <= parseInt(Canvas.style.width)
                                   && CurrentMousePosition.y >= 0 && CurrentMousePosition.y <= parseInt(Canvas.style.height);


            if (!IsMouseOverCanvas) { return; }
            this.window.removeEventListener("click", arguments.callee);

            // Creating a new text
            const NewText = this.document.createElement("span");
            NewText.style.color = Color.value;
            NewText.style.left = `${CurrentMousePosition.x}px`;
            NewText.style.top = `${CurrentMousePosition.y}px`;
            NewText.style.fontSize = "26px";
            NewText.style.fontFamily = "Courier New";
            NewText.style.position = "absolute";
            NewText.style.transform = "translateY(-50%)";
            NewText.contentEditable = "true";

            if (DEBUGGING_MODE) {
                DebugPrint("New text was created.");
            }

            Canvas.appendChild(NewText);
            NewText.focus();

            AddLayer("New text", NewText);
            SetAsDraggable(NewText);

            SetTextAsEditable(NewText);
            
            Body.style.cursor = "default";
            CurrentToolSelected = null;

            canInsertText = true;
        })
    }

    InsertTextButton.addEventListener("click", InsertText);
    window.addEventListener("keyup", function(event) {
        if (event.key != "t") { return; }

        // Cannot inert a text when the user is writing the name
        if (IsUserWritingTheNameOfTheProject) { return; }

        InsertText();  
    })
}