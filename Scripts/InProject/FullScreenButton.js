function EnableFullScreenButton() {
    const ButtonSeeImage = document.querySelector("header > button");
    const FullScreenDiv = document.getElementById("see-image-full-screen");
    
    const Body = document.querySelector("body");

    const Canvas = document.getElementById("canvas");

    ButtonSeeImage.addEventListener("click", function() {
        if (DEBUGGING_MODE) {
            DebugPrint("Opeing full screen div.");
        }

        GoFullScreen(true);

        const ScreenWidth = window.screen.width;
        const ScreenHeight = window.screen.height;

        FullScreenDiv.style.visibility = "visible";

        Body.style.cursor = "none";

        const Image = Canvas.cloneNode(true);
        FullScreenDiv.appendChild(Image);

        const ComputedStyle = getComputedStyle(Image);

        const ImageWidth = parseInt(ComputedStyle.width, 10);
        const ImageHeight = parseInt(ComputedStyle.height, 10);
        
        const ScaleX = ScreenWidth / ImageWidth;
        const ScaleY = ScreenHeight / ImageHeight;

        const ScaleFactor = Max(ScaleX, ScaleY);

        Image.style.position = "absolute";
        Image.style.left = "50%";
        Image.style.top = "50%";
        Image.style.transform = `translate(-50%, -50%) scale(${ScaleFactor})`;
    })

    window.addEventListener("keyup", function(event) {
        if (event.key !== "Escape") { return; }

        Body.style.cursor = "default";

        FullScreenDiv.style.visibility = "hidden";
        FullScreenDiv.children[0].remove();

        GoFullScreen(false);

        if (DEBUGGING_MODE) {
            DebugPrint("Exited from full screen mode.");
        }
    })
}