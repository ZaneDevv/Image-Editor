const ScaleToolName = "Scale";

function EnableScaleTool() {
    const ScaleButton = document.getElementById("rotate");

    // Setting up the squares the resize an element
    const TopLeftCornerDrag = document.createElement("div");
    TopLeftCornerDrag.style.transform = "translate(-50%, -50%)";
    TopLeftCornerDrag.style.width = TopLeftCornerDrag.style.height = "10px";
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
            CornersParent.style.width = CornersParent.style.height = "100%";
            CornersParent.style.backgroundColor = "#ff0000";
            CornersParent.style.position = "relative";
            CornersParent.style.left = CornersParent.style.top = 0;

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