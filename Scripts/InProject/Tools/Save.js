function EnableSave() {
    let isControlPressed = false;

    const SaveButton = document.getElementById("save");

    function Save() {
        fetch("Scripts/Save.php")
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