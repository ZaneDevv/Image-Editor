let CanvasPosition = {x: -50, y: -50};

function EnableMovement() {
    const Canvas = document.getElementById("canvas");

    let FixedMouseX = MousePosition.x;
    let FixedMouseY = MousePosition.y;

    function Move() {
        // Getting the scale
        let Scale = Canvas.style.transform.split("scale("); {
            Scale = Scale[1].split(")")[0];
        }

        const differenceX = (MousePosition.x - FixedMouseX) / 20;
        const differenceY = (MousePosition.y - FixedMouseY) / 20;

        FixedMouseX = MousePosition.x;
        FixedMouseY = MousePosition.y;

        CanvasPosition.x += differenceX;
        CanvasPosition.y += differenceY;

        // Applies movement
        Canvas.style.transform = `translate(${CanvasPosition.x}%, ${CanvasPosition.y}%) scale(${Scale})`;
        CanvasRect = Canvas.getBoundingClientRect();
    }

    // Connecting and disconnecting events
    document.addEventListener("mousedown", function(event) {
        if (!(event.button === 1)) { return; } // Wheel button
                
        if (DEBUGGING_MODE) {
            DebugPrint("Starting moving.");
        }

        FixedMouseX = MousePosition.x;
        FixedMouseY = MousePosition.y;

        document.addEventListener("mousemove", Move)
    });

    document.addEventListener("mouseup", function(event) {
        if (!(event.button === 1)) { return; } // Wheel button

        if (DEBUGGING_MODE) {
            DebugPrint("Stop moving.");
        }

        document.removeEventListener("mousemove", Move);
    })
}