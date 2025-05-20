let MousePosition = {x: 0, y: 0};

const CanvasDiv = document.getElementById("canvas");

// Updating mouse's positions
document.addEventListener('mousemove', function(event) {
    // Bearing in mind the scroll position 
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0);
    }

    MousePosition.x = event.pageX;
    MousePosition.y = event.pageY;
})


// Get mouse in canvas
function GetMousePositionInCanvas() {
  const scaleX = CanvasRect.width / Canvas.offsetWidth;
  const scaleY = CanvasRect.height / Canvas.offsetHeight;

  return {
      x: (MousePosition.x - CanvasRect.left) / scaleX,
      y: (MousePosition.y - CanvasRect.top) / scaleY
  };
}