function EnableInsertImage() {
    const FileInput = document.getElementById("file-input");
    const UploadImageButton = document.getElementById("insert-image");

    const Canvas = document.getElementById("canvas");

    let isControlPressed = false;
    let lastTimeIButtonWasPressed = 0;

    FileInput.addEventListener("change", (event) => {
        const file = event.target.files[0]; // Checking the file
        
        const image = new Image();
        const reader = new FileReader();

        reader.onload = function(e) {
            image.onload = function() {
                
                // Importing image
                image.style.position = "absolute";
                image.style.backgroundColor = "#00000000";
                image.style.left = 0;
                image.style.top = 0;
                image.style.transform = "translateY(-50%)";

                if (DEBUGGING_MODE) {
                    DebugPrint("New image has been created");
                }

                Canvas.appendChild(image);

                AddLayer("New image", image);
                SetAsDraggable(image);

                // Able to select tis layer by clicking on the actual object in the canvas
                image.addEventListener("click", function() {
                    SelectLayer(image.style.zIndex - 1);
                })
            }

            image.src = e.target.result;
        }

        reader.readAsDataURL(file);
    });

    UploadImageButton.addEventListener("click", () => FileInput.click());

    window.addEventListener("keyup", function(event) {
        switch(event.key) {
            case "Control": // Control is no longer pressed
                isControlPressed = false;
                break;

            case "i":
                {
                    // Open file manager to import an image if you have pressed the I button recently ( <= 300 miliseconds before )
                    if (!isControlPressed) { break; }

                    const CurrentTime = (new Date()).getTime();

                    if (lastTimeIButtonWasPressed > 0) {
                        const Difference = CurrentTime - lastTimeIButtonWasPressed;

                        if (Difference < 300){
                            FileInput.click(); // If you have pressed the I button twice, open the file manager
                        }
                        else {
                            lastTimeIButtonWasPressed = 0;
                        }
                    }
                    lastTimeIButtonWasPressed = CurrentTime;
                }

                break;

            default: break;

        }
    })

    window.addEventListener("keydown", function(event) {
        if (event.key != "Control") { return; }
        isControlPressed = true; // Control is pressed
    })
}