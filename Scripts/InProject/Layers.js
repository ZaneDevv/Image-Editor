let Layers = [];
let LayerSelected = null;
let layerSelectedIndex = null;

const LayersContainer = document.getElementById("layers-container");

function RemoveLayer(layer) {
    if (layer.Name == "Background") { return; } // Doesn't allow to remove the background

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

function AddLayer(name, object) {
    object.style.zIndex = Layers.length + 1;

    // Creating layer
    const NewLayer = document.createElement("div");
    NewLayer.className = "layers";
    NewLayer.title = `Layer #${Layers.length + 1}: ${name}`

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
}

document.addEventListener("keyup", function(event) {
    if (LayerSelected === null) { return; } // Cannot work without a selected layer

    switch (event.key) {
        case "Backspace": // Remove layer
            RemoveLayer(LayerSelected);
            UnselectLayer();

            break;

        case "ArrowUp": // Go next layer 
            UnselectLayer();
            SelectLayer(layerSelectedIndex + 1)
            break;

        case "ArrowDown": // Go previous layer
            UnselectLayer();
            SelectLayer(layerSelectedIndex - 1)
            break;

        default: break;
    }
});