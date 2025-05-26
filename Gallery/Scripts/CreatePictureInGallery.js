const ParentGrid = document.getElementById("grid-div");

const REGEX_TRANSFORM_EXTRACT_SCALE = /scale\(([^)]+)\)/;

function CreatePicture() {
    const MainDiv = document.createElement("div");
    MainDiv.className = "picture";

    const InsideDiv = document.createElement("div");
    MainDiv.appendChild(InsideDiv);

    const InsideCanvas = document.createElement("div");
    InsideCanvas.style.backgroundColor = "#00000000";
    InsideCanvas.style.width = "100%";
    InsideCanvas.style.height = "100%";
    InsideDiv.appendChild(InsideCanvas);

    const InsideText = document.createElement("p");
    MainDiv.appendChild(InsideText);

    const DivWithTools = document.createElement("aside")
    MainDiv.appendChild(DivWithTools);

    const Trash = document.createElement("img");
    Trash.src = "../../Images/Gallery/Trash.svg";
    Trash.alt = "Erase";
    Trash.title = "Erase";
    DivWithTools.appendChild(Trash);

    const Edit = document.createElement("img");
    Edit.src = "../../Images/Gallery/Edit.svg";
    Edit.alt = "Edit";
    Edit.title = "Edit";
    DivWithTools.appendChild(Edit);

    ParentGrid.appendChild(MainDiv);

    return {
        MainDiv: MainDiv,
        Text: InsideText,
        InsideCanvas: InsideCanvas,
        ImageDiv: InsideDiv,
    };
}

function SetUpGallery() {
    fetch("./Scripts/ReadSavedFile.php")
    .then(response => response.text())
    .then(text => {

        const Elements = CreatePicture();

        Elements.Text.innerHTML = "Test";
        Elements.InsideCanvas.innerHTML = text;

        const ComputedStyleImage = getComputedStyle(Elements.InsideCanvas.children[0]);
        const ComputedStyleParentDiv = getComputedStyle(Elements.ImageDiv);

        const ImageWidth = parseInt(ComputedStyleImage.width, 10);
        const ImageHeight = parseInt(ComputedStyleImage.height, 10);

        const ParentDivWidth = parseInt(ComputedStyleParentDiv.width, 10);
        const ParentDivHeight = parseInt(ComputedStyleParentDiv.height, 10);
        
        const ScaleX = ParentDivWidth / ImageWidth;
        const ScaleY = ParentDivHeight / ImageHeight;

        const ScaleFactor = Max(ScaleX, ScaleY);

        Elements.InsideCanvas.style.transform = `scale(${ScaleFactor})`;
        Elements.InsideCanvas.style.left = 0;
        Elements.InsideCanvas.style.top = 0;
        Elements.InsideCanvas.style.boxShadow = "0px 0px 0px 0px #00000000";
        Elements.InsideCanvas.style.position = "absolute";

    })
    .catch(err => {
        console.error('Error:', err);
    });
}

SetUpGallery();