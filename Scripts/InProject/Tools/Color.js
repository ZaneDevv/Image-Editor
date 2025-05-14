function EnableColorSelection() {
    const Color = document.getElementById("color");

    // When color changes, update the color in the selected layer
    Color.addEventListener("change", function() {
        if (LayerSelected === null) { return; } // Cannot change null layers

        LayerSelected.Element.style.color = Color.value;

         if (DEBUGGING_MODE) {
            DebugPrint("Color changed correctly!");
        }
    })
}