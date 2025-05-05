function EnableCopyPaste() {
    const Canvas = document.getElementById("canvas");

    let isPressingControl = false;
    let copying = null

    window.addEventListener("keydown", function(event) {
        if (event.key != "c" || !isPressingControl) { return; }
        
        // Copy
        if (LayerSelected == null) { return; }
        copying = LayerSelected;
    })

    window.addEventListener("keydown", function(event) {
        if (event.key != "v" || !isPressingControl) { return; }
        
        // Paste
        if (copying == null) { return; }


        const NewElement = copying.Element.cloneNode(false);
        NewElement.style.borderWidth = 0;
        
        Canvas.appendChild(NewElement);

        AddLayer(`(Copy) ${copying.Name}`, NewElement);
        SetAsDraggable(NewElement);

        NewElement.addEventListener("click", function() {
            SelectLayer(NewElement.style.zIndex - 1);
        })
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