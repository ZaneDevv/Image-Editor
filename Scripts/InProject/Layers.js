let Layers = [];
let LayerSelected = null;
let layerSelectedIndex = null;

const LayersContainer = document.getElementById("layers-container");

function RemoveLayer(layer) {
    if (layer.Name == "Background") { return; } // Doesn't allow to remove the background

    // Don't remove layer if the user is writing
    if (layer.Element.contentEditable == "true") { return; }

    LayersContainer.removeChild(layer.LayerDiv);
    document.getElementById("canvas").removeChild(layer.Element);

    // Update the list to avoid empty spaces
    for (let i = layer.Element.style.zIndex - 1; i < Layers.length; i++) {
        if (Layers[i] == null) { continue; }

        Layers[i].Element.style.zIndex -= 1;
        Layers[i].NumberLayerText.innerHTML = `#${i}`;

        Layers[i] = Layers[i + 1];
    }
    Layers.pop();
}

function UnselectLayer() {
    if (LayerSelected === null) { return; } // Checking if there is a layer selected

    LayerSelected.Element.style.border = "0";
    LayerSelected.LayerDiv.style.backgroundColor = "#00000000";

    LayerSelected = null;
}

function SelectLayer(layerIndex) {
    // In case we are trying to select the layer that is already selected, unselect it instead of select it again
    if (LayerSelected != null && layerIndex == layerSelectedIndex) {
        UnselectLayer();
        return;
    }

    console.log(layerIndex)
    if (layerIndex < 0 || layerIndex >= Layers.length) { return; } // Checking if the index exists

    layerSelectedIndex = layerIndex;
    let layer = Layers[layerIndex];

    UnselectLayer();

    if (LayerSelected === layer) { return; } // Checking if the selected layer is the one the user wants to select

    layer.LayerDiv.style.backgroundColor = "#ffffff10";
    layer.Element.style.border = "3px solid #5555ff";

    LayerSelected = layer;
}

function EnableLayerToBeDragged(layerIndex) {
    // Neither non-existent layers nor background layer are allowed to be dragged
    if (Layers[layerIndex] == null || layerIndex == 0) { return; }
    
    let stopClick = false;

    Layers[layerIndex].LayerDiv.addEventListener("mousedown", async function() {
        stopClick = false;
        OnMove = null;

        let DraggableLayer = null;

        // Checking if the user released the click
        window.addEventListener("mouseup", function() {
            stopClick = true;
    
            if (OnMove == null) { return; }

            window.removeEventListener("mousemove", OnMove);
            window.removeEventListener("mouseup", arguments.callee);


            // Checking the new position
            const DraggingLayerRect = DraggableLayer.getBoundingClientRect();

            let closestLayerIndex = 0;
            let closestDistance = Infinity;

            // We check which one is the closest one ignoring the background
            for (let i = 1; i < Layers.length; i++) {
                const CurrentLayer = Layers[i].LayerDiv;
                const CurrentLayerRect = CurrentLayer.getBoundingClientRect();

                const distanceY = Abs(parseInt(CurrentLayerRect.top) - parseInt(DraggingLayerRect.bottom));
                console.log(distanceY, i)

                if (distanceY < closestDistance) {
                    closestLayerIndex = i;
                    closestDistance = distanceY;
                }
            }

            // Update layers
            let currentLayerData = Layers[layerIndex];

            for (let i = layerIndex + 1; i <= closestLayerIndex; i++) {
                Layers[i].LayerDiv.style.order = i;
                Layers[i].LayerDiv.style.zIndex = i - 1;
                Layers[i].NumberLayerText.innerHTML = `#${i}`;
                Layers[i] = Layers[i - 1];
            }

            Layers[closestLayerIndex] = currentLayerData;
            Layers[closestLayerIndex].NumberLayerText.innerHTML = `#${closestLayerIndex + 1}`
            Layers[closestLayerIndex].LayerDiv.style.zIndex = closestLayerIndex;
            Layers[closestLayerIndex].LayerDiv.style.order = closestLayerIndex + 1;
            Layers[closestLayerIndex].LayerDiv.style.opacity = 1;

            LayersContainer.removeChild(DraggableLayer);
        })

        let t = 0;

        while (!stopClick && t < 1) {
            await delay(.1);
            t += .1;
        }
        if (stopClick) { return; }

        // Allow user to drag layers
        DraggableLayer = Layers[layerIndex].LayerDiv.cloneNode(true);
        DraggableLayer.style.zIndex = 300;
        DraggableLayer.style.position = "absolute";
        DraggableLayer.style.border = 0;
        DraggableLayer.style.transform = "translateY(-50%)";
        DraggableLayer.style.backgroundColor = GetCSSvariableValue('--dark-color');
        DraggableLayer.style.width = "18%";

        LayersContainer.appendChild(DraggableLayer);

        Layers[layerIndex].LayerDiv.style.opacity = .25;

        // Drag layer behaviour when mouse moves
        OnMove = function() {
            DraggableLayer.style.top = `${MousePosition.y}px`;
        }

        window.addEventListener("mousemove", OnMove);
    })
}

function AddLayer(name, object) {
    object.style.zIndex = Layers.length + 1;

    // Creating layer
    const NewLayer = document.createElement("div");
    NewLayer.className = "layers";
    NewLayer.title = `Layer #${Layers.length + 1}: ${name}`;
    NewLayer.style.order = Layers.length;

    const NumberOfLayer = document.createElement("span");
    NumberOfLayer.innerHTML = `#${Layers.length + 1}`;
    NumberOfLayer.style.top = '0';

    const LayerName = document.createElement("p");
    LayerName.innerHTML = name == null ? " " : name;
    LayerName.style.top = '0';

    NewLayer.appendChild(NumberOfLayer);
    NewLayer.appendChild(LayerName);

    LayersContainer.appendChild(NewLayer);

    // Saving layer information
    Layers.push({
        LayerDiv: NewLayer,
        Element: object,
        NumberLayerText: NumberOfLayer,
        Name: name,
    })

   
    // Adding evenets
    NewLayer.addEventListener("click", function() {
        SelectLayer(object.style.zIndex - 1);
    });

    EnableLayerToBeDragged(object.style.zIndex - 1);
}


// Keyboard shortcuts

document.addEventListener("keyup", function(event) {
    if (LayerSelected === null) { return; } // Cannot work without a selected layer

    switch (event.key) {
        case "Backspace": // Remove layer
            RemoveLayer(LayerSelected);
            UnselectLayer();

            break;

        case "ArrowUp": // Go next layer 
            UnselectLayer();
            SelectLayer(layerSelectedIndex + 1);

            break;

        case "ArrowDown": // Go previous layer
            UnselectLayer();
            SelectLayer(layerSelectedIndex - 1);

            break;

        default: break;
    }
});


// If mouses's click on anywhere that is neither an object nor a layer, the current selected layer must be unselected 
document.addEventListener("mouseup", function() {

    // Don't unselect the layer if user's clicked on the canvas
    if (MousePosition.x > CanvasRect.left && MousePosition.x < CanvasRect.right && MousePosition.y > CanvasRect.top && MousePosition.x < CanvasRect.bottom) {
        return;
    }


    // Don't unselect the layer if user's clicked on a layer

    UnselectLayer();
})