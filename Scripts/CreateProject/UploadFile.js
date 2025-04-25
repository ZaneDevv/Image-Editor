{
    const UploadFileButton = document.querySelector(".create-project-option[upload-file]");
    const FileInput = document.getElementById("file-input");

    // If mouse clicks on the button, it will detect that the mouse clicked on the input field
    UploadFileButton.addEventListener("click", () => FileInput.click());


    FileInput.addEventListener("change", (event) => {
        if (IsInProject) { return; }

        const file = event.target.files[0]; // Checking the file
        
        const image = new Image();
        const reader = new FileReader();

        reader.onload = function(e) {
            image.onload = function() {
                const width = image.width;
                const height = image.height;

                isProjectCreated = true;

                CreateProject(width, height, image);
            }

            image.src = e.target.result;
        }

        reader.readAsDataURL(file);
    });
}