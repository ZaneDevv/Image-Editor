let isCreateprojectMenuInScreen = false;

{
    const DivDarkScreen = document.getElementById("make-screen-darker");
    const Menu = document.getElementById("create-project-settings");
    const OpenButton = document.querySelector(".create-project-option[project-from-scratch]");
    const CloseButton = document.querySelector("#create-project-settings > p[close]");


    const START_Y = -20;

    const ADDING_TO_ITERATIONS = 1/20;
    const WAIT_TIME = 1/60; 
    const ROTATION = -6;

    // Opening menu
    OpenButton.addEventListener("click", async function() {
        if (isCreateprojectMenuInScreen) { return; }
        isCreateprojectMenuInScreen = true;
        
        Menu.style.opacity = 1;
        DivDarkScreen.style.visibility = 'visible';

        for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
            const alpha = InverseQuadraticLerp(t);

            DivDarkScreen.style.opacity = Lerp(0, .35, alpha);
            Menu.style.top = `${Lerp(START_Y, 50, alpha)}%`;
            Menu.style.transform = `translate(-50%, -50%) rotate(${Lerp(ROTATION, 0, alpha)}deg)`;

            await delay(WAIT_TIME);
        }
    })

    // Closing menu
    CloseButton.addEventListener("click", async function() {
        if (!isCreateprojectMenuInScreen) { return; }
        isCreateprojectMenuInScreen = false;
        
        for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
            const alpha = QuadraticLerp(t);

            DivDarkScreen.style.opacity = Lerp(.35, 0, alpha);
            Menu.style.top = `${Lerp(50, START_Y, alpha)}%`;
            Menu.style.transform = `translate(-50%, -50%) rotate(${Lerp(0, ROTATION, alpha)}deg)`;
            
            await delay(WAIT_TIME);
        }

        Menu.style.opacity = 0;
        DivDarkScreen.style.visibility = 'hidden';
    })
}