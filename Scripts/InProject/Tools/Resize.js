const ScaleToolName = "Scale";

function EnableScaleTool() {
    const REGEX_TRANSFORM_EXTRACT_SCALE = /scale\(([^)]+)\)/;

    const ScaleButton = document.getElementById("rotate");
    const Body = document.getElementsByTagName("body")[0];
    const ResizeButton = document.getElementById("resize");

    // Setting up the squares the resize an element
    const TopLeftCornerDrag = document.createElement("div");
    TopLeftCornerDrag.style.transform = "translate(-50%, -50%)";
    TopLeftCornerDrag.style.width = TopLeftCornerDrag.style.height = "7px";
    TopLeftCornerDrag.style.borderWidth = "2px";
    TopLeftCornerDrag.style.borderColor = GetCSSvariableValue("--dark-blue-color"); 
    TopLeftCornerDrag.style.borderStyle = "solid";
    TopLeftCornerDrag.style.backgroundColor = GetCSSvariableValue("--light-color");
    TopLeftCornerDrag.style.zIndex = 9999;
    TopLeftCornerDrag.style.position = "absolute";
    TopLeftCornerDrag.style.top = 0;
    TopLeftCornerDrag.style.left = 0;
    TopLeftCornerDrag.style.zIndex = 500;

    const BottomLeftCornerDrag = TopLeftCornerDrag.cloneNode(false);
    BottomLeftCornerDrag.style.top = "100%";
    BottomLeftCornerDrag.style.left = 0;

    const BottomRightCornerDrag = TopLeftCornerDrag.cloneNode(false);
    BottomRightCornerDrag.style.top = "100%";
    BottomRightCornerDrag.style.left = "100%";

    const TopRightCornerDrag = TopLeftCornerDrag.cloneNode(false);
    TopRightCornerDrag.style.top = 0;
    TopRightCornerDrag.style.left = "100%";

    // Initialize the whole behaviour
    function ScaleBehaviour() {
        if (CurrentToolSelected == ScaleToolName){

            CurrentToolSelected = null;
            return;
        }

        if (LayerSelected == null) { return; }
        CurrentToolSelected = ScaleToolName;

        LayerSelected.Element.style.borderStyle = "dashed";

        let startingTransform = "";

        // Setting up corners
        let CornersParent =  LayerSelected.Element.children[0];
        if (CornersParent == null) {
            const CornersParentParent = document.createElement("div");
            CornersParentParent.style.position = "absolute";
            CornersParentParent.style.width = "100%";
            CornersParentParent.style.height = "100%";
            CornersParentParent.style.pointerEvents = "none";
            CornersParentParent.style.zIndex = 9999;
            CornersParentParent.style.top = 0;
            CornersParentParent.style.left = 0;
            CornersParentParent.style.backgroundColor = "#00000000";

            CornersParent = document.createElement("div");
            CornersParent.style.position = "relative";
            CornersParent.style.width = "100%";
            CornersParent.style.height = "100%";
            CornersParent.style.pointerEvents = "none";
            CornersParent.style.top = 0;
            CornersParent.style.left = 0;
            CornersParent.style.backgroundColor = "#00000000";

            CornersParentParent.appendChild(CornersParent);
            LayerSelected.Element.appendChild(CornersParentParent);
        }
        else {
            CornersParent = CornersParent.children[0];
        }

        CornersParent.appendChild(TopLeftCornerDrag);
        CornersParent.appendChild(BottomLeftCornerDrag);
        CornersParent.appendChild(BottomRightCornerDrag);
        CornersParent.appendChild(TopRightCornerDrag);

        const StartingMousePosition = GetMousePositionInCanvas();

        let clickedOnElement = false;

        let startingScale = 1;


        // Change the scale of the selected element
        function OnMouseMove() {
            if (!clickedOnElement || LayerSelected == null) { return; }

            const mousePosition = GetMousePositionInCanvas();
            const deltaX = mousePosition.x - StartingMousePosition.x;
            const deltaY = mousePosition.y - StartingMousePosition.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const dotProduct = (deltaX - deltaY) / (distance * SQRT_2);

            let scaleMatch = LayerSelected.Element.style.transform.match(REGEX_TRANSFORM_EXTRACT_SCALE);

            if (scaleMatch) {
                let newScale = Min(startingScale + distance / 500 * dotProduct, 0.2);
                LayerSelected.Element.style.transform = LayerSelected.Element.style.transform.replace(REGEX_TRANSFORM_EXTRACT_SCALE, `scale(${newScale})`);
            }
            else {
                LayerSelected.Element.style.transform += " scale(1)";
            }

            Body.style.cursor = "none";
        }

        // Start rescaling
        function OnMouseDown() {
            clickedOnElement = true;

            if (LayerSelected == null) { return; }
            if (LayerSelected.Element.contentEditable == "true") { return; }
            if (CurrentToolSelected == "Drag" || CurrentToolSelected == "Rotate") { return; }

            startingTransform = LayerSelected.Element.style.transform;
            
            let scaleMatch = LayerSelected.Element.style.transform.match(REGEX_TRANSFORM_EXTRACT_SCALE);
            startingScale = scaleMatch != null ? parseFloat(scaleMatch[1]) : 1; 

            window.addEventListener("mousemove", OnMouseMove);
        }

        LayerSelected.Element.addEventListener("mousedown", OnMouseDown);

        // Stop rescaling
        window.addEventListener("mouseup", () => {
            clickedOnElement = false;

            const CurrentLayer = LayerSelected.Element;
            const CurrentTransform = CurrentLayer.style.transform;
            const PreviousTransform = startingTransform;
            
            ScaleBehaviour();

            AddTaskDone({
                Undo: () => {
                    let transform = PreviousTransform;
                    CurrentLayer.style.transform = transform;
                },
                Redo: () => {
                    let transform = CurrentTransform;
                    CurrentLayer.style.transform = transform;
                }
            });

            CurrentLayer.removeEventListener("mousedown", OnMouseDown);
            window.removeEventListener("mousemove", OnMouseMove);
            window.removeEventListener("mouseup", arguments.callee);

            if (LayerSelected) {
                LayerSelected.Element.style.borderStyle = "solid";
                LayerSelected.Element.children[0].remove();
            }
            
            Body.style.cursor = "default";
        });
        
    }

    // Adding evenets
    ResizeButton.addEventListener("mouseup", ScaleBehaviour);
    ScaleButton.addEventListener("click", ScaleBehaviour);
    window.addEventListener("keyup", function(event) {
        if (event.key != "s") { return; }

        // Cannot scale en object when the user is writing the name
        if (IsUserWritingTheNameOfTheProject) { return; }

        ScaleBehaviour();
    })
}