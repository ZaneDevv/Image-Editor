<?php

    if (isset($_POST["Name"])) {

        $filepath = "../Saved/" . $_POST["Name"] . ".txt";
        $exists = file_exists($filepath) ? "exists" : "does not exist";

        echo json_encode([
            "status" => "success",
            "message" => $exists
        ]);

    }
    else {

        echo json_encode([
            "status" => "error",
            "message" => "No file name provided."
        ]);

    }

?>