const Element = document.documentElement;

function GoFullScreen(activate) {
    if (!activate) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }

        return;
    }

    if (Element.requestFullscreen) {
        Element.requestFullscreen();
    }
}