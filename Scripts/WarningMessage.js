{
    const WarningMessage = "Are you sure you want to leave? Any unsaved data will be lost.";

    // Warns the user that if the page is either reloaded or closed, the project will not be saved
    window.addEventListener("beforeunload", function(event) {
        if (!IsInProject) { return; }
        event.returnValue = WarningMessage;
    
        return WarningMessage;
    })
}