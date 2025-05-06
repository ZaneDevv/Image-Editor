function SetAsDraggable(object) {
    const Body = document.getElementsByTagName("body")[0];

    let DifferenceX = 0;
    let DifferenceY = 0;
    
    function Drag() {
        const CurrentMousePosition = GetMousePositionInCanvas();

        object.style.left = `${CurrentMousePosition.x + DifferenceX}px`;
        object.style.top = `${CurrentMousePosition.y + DifferenceY}px`;
    }

    // Start dragging
    object.addEventListener("mousedown", function(event) {
        if (!(event.button === 0)) { return; } // Left button

        Body.style.cursor = "grab";

        const StartingMousePosition = GetMousePositionInCanvas();
        DifferenceX = parseInt(object.style.left) - StartingMousePosition.x;
        DifferenceY = parseInt(object.style.top) - StartingMousePosition.y;

        window.addEventListener("mousemove", Drag); // Initializating behaviour
    })

    // Stop dragging
    window.addEventListener("mouseup", function(event) {
        if (!(event.button === 0)) { return; } // Left button

        window.removeEventListener("mousemove", Drag);

        Body.style.cursor = "default";
    })
}