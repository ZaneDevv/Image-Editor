
const Pictures = document.querySelectorAll(".picture");
const DarkScreen = document.getElementById("make-screen-darker");
const Body = document.querySelectorAll("body")[0];

const ADDING_TO_ITERATIONS = 1/20;
const WAIT_TIME = 1/60; 

async function RemoveDarkScreen() {
    Body.style.overflow = "scroll";

    for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
        DarkScreen.style.backgroundColor = `rgb(0, 0, 0, ${Lerp(0.5, 0, InverseQuadraticLerp(t))}`;

        await delay(WAIT_TIME);
    }

    DarkScreen.style.opacity = 0;
    DarkScreen.style.visibility = "hidden";

    DarkScreen.children.foreach(element => {
        element.remove();
    })

    DarkScreen.removeEventListener("mouseup", RemoveDarkScreen);
}

async function SetDarkScreen() {
    DarkScreen.style.opacity = 1;
    DarkScreen.style.backgroundColor = "#00000000";
    DarkScreen.style.visibility = "visible";
    DarkScreen.style.position = "fixed";

    Body.style.overflow = "hidden";

    for (let t = 0; t <= 1; t += ADDING_TO_ITERATIONS) {
        DarkScreen.style.backgroundColor = `rgb(0, 0, 0, ${Lerp(0, 0.5, InverseQuadraticLerp(t))}`;

        await delay(WAIT_TIME);
    }

    DarkScreen.addEventListener("mouseup", RemoveDarkScreen);
}
