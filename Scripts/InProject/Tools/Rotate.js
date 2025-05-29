const RotateToolName = "Rotate";

function EnableRotationTool() {
    const RotateButton = document.getElementById("rotate");

    let isRotating = false;

    // Calculates the angle that is from the center of the object selected to the current mouse position
    function GetCurrentTheta() {
        const CurrentPosition = GetMousePositionInCanvas();

        return Math.atan2(
            parseInt(LayerSelected.Element.style.top, 0xA) + parseInt(this.window.getComputedStyle(LayerSelected.Element).height, 0xA) * .5 - CurrentPosition.y,
            parseInt(LayerSelected.Element.style.left, 0xA) + parseInt(this.window.getComputedStyle(LayerSelected.Element).width, 0xA) * .5 - CurrentPosition.x,
        );
    }

    function OnMouseIsDown(){
        if (LayerSelected == null) { return; }
        if (CurrentToolSelected == "Drag" || CurrentToolSelected == "Scale") { return; }

        let lastAngle = GetCurrentTheta();

        // Once the cursor moves, updates the rotation
        function OnMouseMove() {
            let newAngle = GetCurrentTheta();
            let theta = newAngle - lastAngle;

            lastAngle = newAngle;

            let currentTransform = LayerSelected.Element.style.transform;
            
            let transforms = currentTransform.split(' ');

            let rotationFound = false;
            for (let i = 0; i < transforms.length; i++) {
                if (transforms[i].startsWith("rotate(")) {
                    let currentRotation = transforms[i].split("(")[1].split(")")[0]; 
                    let currentTheta = parseFloat(currentRotation);

                    // If the rotation value is negative, adjust it
                    if (currentTheta < 0) {
                        currentTheta = 2 * Math.PI - currentTheta;
                    }

                    // Update the rotation with the new angle
                    transforms[i] = `rotate(${currentTheta + theta}rad)`;
                    rotationFound = true;
                    
                    break;
                }
            }

            // If there's no existing rotation, add the new rotation
            if (!rotationFound) {
                transforms.push(`rotate(${theta}rad)`);
            }

            // Set the transform with the updated rotation and other transforms intact
            LayerSelected.Element.style.transform = transforms.join(' ');
        }
        this.window.addEventListener("mousemove", OnMouseMove);

        this.window.addEventListener("mouseup", function() {
            this.window.removeEventListener("mousemove", OnMouseMove);
            this.window.removeEventListener("mouseup", arguments.callee);
            this.window.removeEventListener("mousedown", OnMouseIsDown);
        })
    }

    function RotateBehaviour() {
        // Rotate already selected, unselect it
        if (CurrentToolSelected == RotateToolName) {
            CurrentToolSelected = null;
            return;
        }

        CurrentToolSelected = RotateToolName;

        if (!isRotating){
            window.addEventListener("mousedown", OnMouseIsDown);
        }
        else {
            window.removeEventListener("mousedown", OnMouseIsDown);
        }
    }

    RotateButton.addEventListener("click", RotateBehaviour);
    window.addEventListener("keyup", function(event) {
        if (event.key != "r") { return; }

        // Cannot rotate en object when the user is writing the name
        if (IsUserWritingTheNameOfTheProject) { return; }

        RotateBehaviour();
    })
}