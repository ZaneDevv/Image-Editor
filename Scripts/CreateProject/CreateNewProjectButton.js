{
    const CreateButton = document.querySelector("#create-project-settings > button");
    const Menu = document.getElementById("create-project-settings");
    const DivDarkScreen = document.getElementById("make-screen-darker");

    const InputHeight = document.querySelector("#create-project-settings > input[height]");
    const InputWidth = document.querySelector("#create-project-settings > input[width]");

    const ADDING_TO_ITERATIONS = 1/20;
    const WAIT_TIME = 1/60; 

    CreateButton.addEventListener("click", async function() {

        let width = parseInt(InputWidth.value, 0xA);
        let height = parseInt(InputHeight.value, 0xA);

        if (width == NaN || height == NaN) { return; } // Cannot create a project without size

        CreateProject(width, height); // Setting up the project

        // Closing menu
        for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
            const alpha = QuadraticLerp(t);
            const inverseAlpha = InverseQuadraticLerp(t);

            const size = Lerp(1, .4, alpha);
            const rotation = Lerp(0, -3, alpha);
            const translation = Lerp(-50, -75, alpha);
            const opacity = Lerp(1, 0, inverseAlpha);
            
            Menu.style.transform = `rotate(${rotation}deg) scale(${size}) translate(-50%, ${translation}%)`;
            Menu.style.opacity = opacity;
            DivDarkScreen.style.opacity = Lerp(.35, 0, inverseAlpha);

            await delay(WAIT_TIME);
        }

        Menu.style.transform = "scale(1) rotate(0rad) translate(-50%, -50%)";
        Menu.style.top = "-20%";
        Menu.style.opacity = 0;

        DivDarkScreen.style.opacity = 0;
        DivDarkScreen.style.visibility = "hidden";

        isCreateprojectMenuInScreen = false;
    })
}