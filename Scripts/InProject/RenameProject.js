function EnableRename() {
    const RenameInput = document.getElementById("rename");

    RenameInput.addEventListener("change", function() {
        const Name = RenameInput.value.replace(/\s+/g, '');
        if (Name === "" || CurrentProjectName == Name) { return; }

        // Checking if there's a prject with this name already
        const formData = new FormData();
        formData.append("Name", Name);

        fetch("Scripts/Save.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                
                if (data.message == "exists") { // It exists already, so this name is no longer allowed
                    console.log("A project with this same name already exists.");

                    RenameInput.value = "";

                    return;
                }

                CurrentProjectName = Name;

            }
            else {
                console.error(data.message);
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
    })
}