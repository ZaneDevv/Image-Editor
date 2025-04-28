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
    BottomLeftCornerDrag.style.bottom = 0;
    BottomLeftCornerDrag.style.left = 0;

    const BottomRightCornerDrag = TopLeftCornerDrag.cloneNode(false);
    BottomRightCornerDrag.style.bottom = 0;
    BottomRightCornerDrag.style.right = 0;

    const TopRightCornerDrag = TopLeftCornerDrag.cloneNode(false);
    TopRightCornerDrag.style.top = 0;
    TopRightCornerDrag.style.right = 0;

    TopLeftCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nwse-resize");
    BottomLeftCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nesw-resize");
    BottomRightCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nwse-resize");
    TopLeftCornerDrag.addEventListener("mouseenter", () => Body.style.cursor = "nesw-resize");


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
            CornersParent = document.createElement("div");
            CornersParent.style.position = "relative";
            CornersParent.style.width = "100%";
            CornersParent.style.height = "100%";
            CornersParent.style.pointerEvents = "none";
            CornersParent.style.zIndex = 9999;
            CornersParent.style.top = 0;
            CornersParent.style.left = 0;
            CornersParent.style.backgroundColor = "#ff0000";

            LayerSelected.Element.appendChild(CornersParent);
        }

        CornersParent.appendChild(TopLeftCornerDrag);
        CornersParent.appendChild(BottomLeftCornerDrag);
        CornersParent.appendChild(BottomRightCornerDrag);
        CornersParent.appendChild(TopRightCornerDrag);
    }

    ScaleButton.addEventListener("click", ScaleBehaviour);
    window.addEventListener("keyup", function(event) {
        if (event.key != "s") { return; }
        ScaleBehaviour();
    })
}