const ParentGrid = document.getElementById("grid-div");
const FullScreenCover = document.getElementById("full-screen-cover");

const EmptyGalleryText = document.querySelectorAll("main > p")[0];

const REGEX_TRANSFORM_EXTRACT_SCALE = /scale\(([^)]+)\)/;

// Creates a new template for the pictures
function CreatePicture() {
    const MainDiv = document.createElement("div");
    MainDiv.className = "picture";

    // Adding information about the picture
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

    // Adding buttons
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
        TrashButton: Trash,
        EditButtun: Edit,
    };
}

function SetUpGallery() {
    fetch("./Scripts/ReadSavedFile.php") // Getting all the saved pictures
    .then(response => response.json())
    .then(pictures => {

        if (!Array.isArray(pictures)) {  return; }

        pictures.forEach(picture => {
            // Creating the picture on the gallery
            const Elements = CreatePicture();
    
            Elements.Text.innerHTML = picture.Name;
            Elements.InsideCanvas.innerHTML = picture.Content;
    
            // Fitting image on canvas
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

            EmptyGalleryText.style.opacity = 0;

            let removing = false;
    
            // View in full screen
            Elements.MainDiv.addEventListener("mouseup", function(){
                if (removing) { return;}
                SetDarkScreen();
    
                // Fittin on screen
                const ComputedStyleImage = getComputedStyle(Elements.InsideCanvas.children[0]);
                const ComputedStyleParentDiv = getComputedStyle(DarkScreen);
    
                const ImageWidth = parseInt(ComputedStyleImage.width, 10);
                const ImageHeight = parseInt(ComputedStyleImage.height, 10);
    
                const ParentDivWidth = parseInt(ComputedStyleParentDiv.width, 10);
                const ParentDivHeight = parseInt(ComputedStyleParentDiv.height, 10);
                
                const ScaleX = ParentDivWidth / ImageWidth;
                const ScaleY = ParentDivHeight / ImageHeight;
    
                const ScaleFactor = Max(ScaleX, ScaleY);
    
                const newCanvas = Elements.InsideCanvas.cloneNode(true);
                newCanvas.style.position = "absolute";
                newCanvas.style.transform = `scale(${ScaleFactor}) translate(-50%, -50%)`;
                newCanvas.style.left = "50%";
                newCanvas.style.top = "50%";
                DarkScreen.appendChild(newCanvas);
            })

            // Remove picture
            Elements.TrashButton.addEventListener("mouseup", function() {
                removing = true;

                // Remoe file
                const formData = new FormData();
                formData.append("Name", picture.Name);

                fetch("./Scripts/RemovePicture.php", {
                    method: 'POST',
                    body: formData
                }).catch(error => { console.error('Error:', error); });

                // Remove HTML elements and the picture itself
                Elements.TrashButton.removeEventListener("mouseup", arguments.callee);
                Elements.MainDiv.remove();
            })
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

SetUpGallery();