let CanvasRect = document.getElementById("canvas").getBoundingClientRect();

function EnableZoom() {
    const ZoomText = document.getElementById("zoom-text");
    const ZoomInButton = document.getElementById("zoom-in");
    const ZoomOutButton = document.getElementById("zoom-out");

    const Canvas = document.getElementById("canvas");
    CanvasRect = Canvas.getBoundingClientRect();

    let isShiftPressed = false; {
        document.addEventListener("keydown", function(event) {
            if (!(event.key == "Shift")) { return; }
            
            isShiftPressed = true;
        });
    
        document.addEventListener("keyup", function(event) {
            if (!(event.key == "Shift")) { return; }
            
            isShiftPressed = false;
        });
    }

    let currentZoom = 1;
    const ZOOM_ADD_AMOUNT = .075;

    function Zoom(add) {
        currentZoom += add;
        currentZoom = Clamp(currentZoom, 0.1, 5);

        ZoomText.innerHTML = `${Math.floor(currentZoom * 1e2)}%`

        Canvas.style.transform = `translate(${CanvasPosition.x}%, ${CanvasPosition.y}%) scale(${currentZoom})`;
        CanvasRect = Canvas.getBoundingClientRect();
    }
   Zoom(-ZOOM_ADD_AMOUNT * 5);
    
    window.addEventListener("wheel", function(event) {
        if (!isShiftPressed) { return; } // Zooming either in or out if and only if shift is pressed

        Zoom(-Sign(event.deltaY) * ZOOM_ADD_AMOUNT);
        
        event.preventDefault();
    }, { passive: false });

    ZoomInButton.addEventListener("click", function() {
        Zoom(ZOOM_ADD_AMOUNT); // Zooming in
    })

    ZoomOutButton.addEventListener("click", function() {
        Zoom(-ZOOM_ADD_AMOUNT); // Zooming out
    })
}
