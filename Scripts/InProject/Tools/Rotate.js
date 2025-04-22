const RotateToolName = "Rotate";

function EnableRotationTool() {
    const RotateButton = document.getElementById("rotate");

    function RotateBehaviour() {
        // Rotate already selected, unselect it
        if (CurrentToolSelected == RotateToolName) {
            CurrentToolSelected = null;
            return;
        }

        window.addEventListener("mousedown", function() {
            if (LayerSelected == null) { return; }

            // Calculates the angle that is from the center of the object selected to the current mouse position
            function GetCurrentTheta() {
                return Math.atan2(
                    parseInt(LayerSelected.Element.style.top, 0xA) + parseInt(this.window.getComputedStyle(LayerSelected.Element).height, 0xA) * .5 - MousePosition.y,
                    parseInt(LayerSelected.Element.style.left, 0xA) + parseInt(this.window.getComputedStyle(LayerSelected.Element).width, 0xA) * .5 - MousePosition.x,
                );
            }
            let lastAngle = GetCurrentTheta();

            // Once the cursor moves, updates the rotation
            this.window.addEventListener("mousemove", function() {
                let newAngle = GetCurrentTheta();
                let theta = newAngle - lastAngle;

                lastAngle = newAngle;

                let currentTransform = LayerSelected.Element.style.transform;
                let currentRotation = currentTransform.split("rotate(")[1];
                if (currentRotation == null) {
                    LayerSelected.Element.style.transform = `rotate(${theta}rad) ${currentTransform}`;

                    return;
                }

                let transformAfterRotation = currentRotation.split(")"); 
                let currentTheta = parseInt(transformAfterRotation[0], 0xA);

                LayerSelected.Element.style.transform = `rotate(${currentTheta + theta}rad) translateY(-50%)`;
            })

            this.window.addEventListener("mouseup", function() {

            })
        })
    }

    RotateButton.addEventListener("click", RotateBehaviour);
    window.addEventListener("keyup", function(event) {
        if (event.key != "r") { return; }
        RotateBehaviour();
    })
}