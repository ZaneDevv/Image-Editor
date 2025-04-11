const CreateProjectMenu = document.querySelector("#image-content > div[specifications-request]");
const BackgroundCanvas = document.querySelector("#image-content > div[editing-image]");
const Canvas = document.getElementById("canvas");

const ButtonSeeImage = document.querySelector("header > button");

function CreateProject(width, height, image) {
    IsInProject = true;

    CreateProjectMenu.style.visibility = "hidden";
    CreateProjectMenu.style.zIndex = -2;

    BackgroundCanvas.style.zIndex = 0;

    Canvas.style.width = `${width}px`;
    Canvas.style.height = `${height}px`;

    if (image != null) { // Checking if the user has a background image
        Canvas.appendChild(image);
        Canvas.style.boxShadow = '0px 0px 1px 0px white';
    }
    else {
        Canvas.style.backgroundColor = 'white';
    }

    EnableProjectEditing();
    AddLayer("Background", image != null ? image : Canvas);

    ButtonSeeImage.style.visibility = "visible";
}