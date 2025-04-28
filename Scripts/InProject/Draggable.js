function SetAsDraggable(object) {
    const Body = document.getElementsByTagName("body")[0];

    let MouseStartingX = MousePosition.x;
    let MouseStartingY = MousePosition.y;

    function Drag() {
        const differenceX = MousePosition.x - MouseStartingX;
        const differenceY = MousePosition.y - MouseStartingY;

        MouseStartingX = MousePosition.x;
        MouseStartingY = MousePosition.y;

        let currentLeft = parseInt(object.style.left);
        let currentTop = parseInt(object.style.top);
        
        // Fixing possible NaN
        if (isNaN(currentLeft)) {
            currentLeft = 0;
        }

        if (isNaN(currentTop)) {
            currentTop = 0;
        }

        object.style.left = `${currentLeft + differenceX}px`;
        object.style.top = `${currentTop + differenceY}px`;
    }

    // Start dragging
    object.addEventListener("mousedown", function(event) {
        if (!(event.button === 0)) { return; } // Left button

        MouseStartingX = MousePosition.x;
        MouseStartingY = MousePosition.y;

        Body.style.cursor = "grab";

        window.addEventListener("mousemove", Drag); // Initializating behaviour
    })

    // Stop dragging
    window.addEventListener("mouseup", function(event) {
        if (!(event.button === 0)) { return; } // Left button

        window.removeEventListener("mousemove", Drag);

        Body.style.cursor = "default";
    })
}