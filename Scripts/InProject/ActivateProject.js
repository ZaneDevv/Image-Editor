function EnableProjectEditing() {
    if (DEBUGGING_MODE) {
        DebugPrint("Enabling project tools.");
    }

    EnableFullScreenButton();
    EnableRename();

    /* Enable controls */
    EnableZoom();
    EnableMovement();
    EnableCopyPaste();
    EnableUndoRedo();
    

    /* Enable tools */
    EnableInsertText();
    EnableInsertImage();
    EnableRotationTool();
    EnableColorSelection();
    EnableScaleTool();
    EnableSave();
}