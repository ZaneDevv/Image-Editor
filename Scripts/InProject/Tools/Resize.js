const ScaleToolName = "Scale";

function EnableScaleTool() {
    const ScaleButton = document.getElementById("rotate");
    const Body = document.getElementsByTagName("body")[0];

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

    const BottomLeftCornerDrag = TopLeftCornerDrag.cloneNode(false);
    BottomLeftCornerDrag.style.top = "100%";
    BottomLeftCornerDrag.style.left = 0;

    const BottomRightCornerDrag = TopLeftCornerDrag.cloneNode(false);
    BottomRightCornerDrag.style.top = "100%";
    BottomRightCornerDrag.style.left = "100%";

    const TopRightCornerDrag = TopLeftCornerDrag.cloneNode(false);
    TopRightCornerDrag.style.top = 0;
    TopRightCornerDrag.style.left = "100%";

    TopLeftCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nwse-resize");
    BottomLeftCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nesw-resize");
    BottomRightCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nwse-resize");
    TopRightCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nesw-resize");


    function ScaleBehaviour() {
        if (CurrentToolSelected == ScaleToolName){

            CurrentToolSelected = null;
            return;
        }

        if (LayerSelected == null) { return; }
        CurrentToolSelected = ScaleToolName;

        LayerSelected.Element.style.borderStyle = "dashed";

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

        // Moving mouse to scale methods
        function LeftTopCornerMove() {
            let currentTransform = LayerSelected.Element.style.transform;
            let scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);

            const StartingMousePosition = GetMousePositionInCanvas();

            if (scaleMatch) {
                let currentScale = parseFloat(scaleMatch[1]);

                let difference 

                LayerSelected.Element.style.transform = currentTransform.replace(scaleRegex, `scale(${newScale})`);
            } else {
                LayerSelected.Element.style.transform += " scale(1)";
            }
        }

        TopLeftCornerDrag.addEventListener("mousedown", LeftTopCornerMove);
    }

    ScaleButton.addEventListener("click", ScaleBehaviour);
    window.addEventListener("keyup", function(event) {
        if (event.key != "s") { return; }
        ScaleBehaviour();
    })
}