<?php

    if (isset($_POST["Layers"]) && isset($_POST["Name"])) {

        $layersContent = $_POST["Layers"];
        $name = $_POST["Name"];

        if (!is_dir("../Saved")) {
            mkdir("../Saved", 0777, true);
        }

        $file = fopen("../Saved/" . $name . ".txt", "w");

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