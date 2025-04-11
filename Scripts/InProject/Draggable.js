function SetAsDraggable(object) {
    let MouseStartingX = MousePosition.x;
    let MouseStartingY = MousePosition.y;

    function Drag() {
        const differenceX = MousePosition.x - MouseStartingX;
        const differenceY = MousePosition.y - MouseStartingY;

        MouseStartingX = MousePosition.x;
        MouseStartingY = MousePosition.y;

        object.style.left = `${parseInt(object.style.left) + differenceX}px`;
        object.style.top = `${parseInt(object.style.top) + differenceY}px`;
    }

    // Start dragging
    object.addEventListener("mousedown", function(event) {
        if (!(event.button === 0)) { return; } // Left button

        MouseStartingX = MousePosition.x;
        MouseStartingY = MousePosition.y;

        window.addEventListener("mousemove", Drag); // Initializating behaviour
    })

    // Stop dragging
    window.addEventListener("mouseup", function(event) {
        if (!(event.button === 0)) { return; } // Left button

        window.removeEventListener("mousemove", Drag);
    })
}