function EnableRename() {
    const RenameInput = document.getElementById("rename");
    RenameInput.style.opacity = 1;

    let lastName = "";

    RenameInput.addEventListener("focus", () => IsUserWritingTheNameOfTheProject = true);
    RenameInput.addEventListener("blur", () => IsUserWritingTheNameOfTheProject = false);

    RenameInput.addEventListener("change", function() {
        const Name = RenameInput.value.replace(/\s+/g, '');
        if (Name === "" || CurrentProjectName == Name) {

            AddNotification("Cannot set an empty name!");

            return;
        }

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

                    AddNotification("Cannot set the name of an existent project.");
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