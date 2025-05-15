function EnableCopyPaste() {
    const Canvas = document.getElementById("canvas");

    let isPressingControl = false;
    let copying = null

    window.addEventListener("keydown", function(event) {
        if (event.key != "c" || !isPressingControl) { return; }
        
        // Copy
        if (LayerSelected == null) { return; }
        copying = LayerSelected;

        if (DEBUGGING_MODE) {
            DebugPrint("Element has been copied.");
        }
    })

    window.addEventListener("keydown", function(event) {
        if (event.key != "v" || !isPressingControl) { return; }
        
        // Paste if the user has copied something
        if (copying == null) {

            if (DEBUGGING_MODE) {
                ErrorPrint("Cannot paste an empty space.");
            }

            return;
        }

        if (DEBUGGING_MODE) {
            DebugPrint("Copied element pasted.");
        }

        const NewElement = copying.Element.cloneNode(true);
        NewElement.style.borderWidth = 0;
        
        Canvas.appendChild(NewElement);

        AddLayer(`(Copy) ${copying.Name}`, NewElement);
        SetAsDraggable(NewElement);
        
        if (NewElement.nodeName == "SPAN") { // It is a text, should be editable
            SetTextAsEditable(NewElement);
        }
    })

    window.addEventListener("keydown", function(event) {
        if (event.key != "Control") { return; }
        isPressingControl = true;
    })

    window.addEventListener("keyup", function(event) {
        if (event.key != "Control") { return; }
        isPressingControl = true;
    })
}