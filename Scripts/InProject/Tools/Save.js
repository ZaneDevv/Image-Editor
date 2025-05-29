function EnableSave() {
    let isControlPressed = false;

    const SaveButton = document.getElementById("save");
    const Canvas = document.getElementById("canvas")

    
    function Save() {
        // Cannot save the project when the user is writing the name
        if (IsUserWritingTheNameOfTheProject) { return; }

        // Cannot save project with no name
        if (CurrentProjectName == null) {
            AddNotification("Cannot save a project without a specified name.")
            return;
        }

        const formData = new FormData();
        formData.append("Layers", Canvas.innerHTML);
        formData.append("Name", CurrentProjectName);
        
        fetch("Scripts/Save.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log(data.message);
                AddNotification("Image saved correctly!");
            }
            else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    SaveButton.addEventListener("mouseup", Save);

    window.addEventListener("keyup", function(event) {
        switch(event.key) {
            case "g":
                event.preventDefault();

                if (isControlPressed) {
                    Save();
                }

                break;

            case "Control": 
                isControlPressed = false;
                break;
            
            default: break;
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.key != "Control") { return;}
        
        isControlPressed = true;
    });
}