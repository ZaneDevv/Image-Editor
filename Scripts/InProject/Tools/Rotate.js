const RotateToolName = "Rotate";

function EnableRotationTool() {
    const RotateButton = document.getElementById("rotate");

    RotateButton.addEventListener("click", function() {
        // IResize already selected, unselect it
        if (CurrentToolSelected == RotateToolName) {
            CurrentToolSelected = null;
            return;
        }

        
    })
}