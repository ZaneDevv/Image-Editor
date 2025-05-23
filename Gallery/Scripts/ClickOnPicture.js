{
    const Pictures = document.querySelectorAll(".picture");
    const DarkScreen = document.getElementById("make-screen-darker");
    const Body = document.querySelectorAll("body")[0];

    const ADDING_TO_ITERATIONS = 1/20;
    const WAIT_TIME = 1/60; 

    async function RemoveDarkScreen() {
        for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
            DarkScreen.style.opacity = Lerp(0.5, 0, InverseQuadraticLerp(t));

            await delay(WAIT_TIME);
        }

        DarkScreen.style.opacity = 0;
        DarkScreen.style.visibility = "hidden";

        Body.style.overflow = "scroll";

        DarkScreen.removeEventListener("mouseup", RemoveDarkScreen);
    }

    async function SetDarkScreen() {
        DarkScreen.style.position = "fixed";
        DarkScreen.style.visibility = "visible";
        DarkScreen.style.opacity = 0;

        Body.style.overflow = "hidden";

        for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
            DarkScreen.style.opacity = Lerp(0, 0.5, InverseQuadraticLerp(t));

            await delay(WAIT_TIME);
        }

        DarkScreen.style.opacity = 0.5;

        DarkScreen.addEventListener("mouseup", RemoveDarkScreen);
    }

    Pictures.forEach(picture => {
        picture.addEventListener("mouseup", SetDarkScreen);
    });
}