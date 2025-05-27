function EnableRename() {
    const RenameInput = document.getElementById("rename");
    let lastName = "";

    RenameInput.addEventListener("change", function() {
        const Name = RenameInput.value.replace(/\s+/g, '');
        if (Name === "" || CurrentProjectName == Name) { return; }

        // Checking if there's a prject with this name already
        const formData = new FormData();
        formData.append("Name", Name);

        fetch("Scripts/DoesProjectWithSpecificNameExist.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                
                if (data.message == "exists") { // It exists already, so this name is no longer allowed
                    console.log("A project with this same name already exists.");

                    RenameInput.value = lastName;

                    return;
                }

                CurrentProjectName = Name;
                lastName = Name;

            }
            else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
}