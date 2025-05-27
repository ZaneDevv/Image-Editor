<?php

    if (isset($_POST["Name"])) {

        $file_path = "../../Saved/"; 
        $name = $_POST["Name"];

        $file_to_remove = $file_path . $name . ".txt";
        unlink($file_to_remove);

    }
    else {

        echo json_encode([
            "status" => "error",
            "message" => "No file name provided."
        ]);

    }

?>