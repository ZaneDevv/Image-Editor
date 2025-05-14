function EnableFullScreenButton() {
    const ButtonSeeImage = document.querySelector("header > button");
    const FullScreenDiv = document.getElementById("see-image-full-screen");
    
    const Body = document.querySelector("body");

    const Canvas = document.getElementById("canvas");

    ButtonSeeImage.addEventListener("click", function() {

        if (DEBUGGING_MODE) {
            DebugPrint("Opeing full screen div.");
        }

        FullScreenDiv.style.visibility = "visible";

        Body.style.cursor = "none";

        const Image = Canvas.cloneNode(true);
        Image.style.position = "absolute";
        Image.style.top = "50%";
        Image.style.left = "50%";
        Image.style.transform = "translate(-50%, -50%)";
        Image.style.width = "auto";
        Image.style.height = "auto";
        Image.style.maxWidth = "100%";
        Image.style.maxHeight = "100%";
        Image.style.objectFit = "contain";

        FullScreenDiv.appendChild(Image);
    })

    window.addEventListener("keyup", function(event) {
        if (event.key != "Escape") { return; }

        Body.style.cursor = "default";

        FullScreenDiv.style.visibility = "hidden";
        FullScreenDiv.children[0].remove();

        if (DEBUGGING_MODE) {
            DebugPrint("Exited from full screen mode.");
        }
    })
}