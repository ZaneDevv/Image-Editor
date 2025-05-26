function EnableSave() {
    let isControlPressed = false;

    const SaveButton = document.getElementById("save");
    const Canvas = document.getElementById("canvas")

    
    function Save() {
        const formData = new FormData();
        formData.append("Layers", Canvas.innerHTML);
        
        fetch("Scripts/Save.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log(data.message);
            }
            else {
                console.error(data.message);
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }

    SaveButton.addEventListener("mouseup", Save);

    window.addEventListener("keyup", function(event) {
        switch(event.key) {
            case "s":
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