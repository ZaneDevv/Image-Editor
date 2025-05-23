<?php

if (isset($_POST["Layers"])) {
    $layersContent = $_POST["Layers"];

    if (!is_dir("../Saved")) {
        mkdir("../Saved", 0777, true);
    }

    $file = fopen("../Saved/testing.txt", "w");

    if ($file) {
        fwrite($file, $layersContent);
        fclose($file);

        echo json_encode([
            "status" => "success",
            "message" => "File created."
        ]);
    }
    else {
        echo json_encode([
            "status" => "error",
            "message" => "Unable to create file."
        ]);
    }
}

?>