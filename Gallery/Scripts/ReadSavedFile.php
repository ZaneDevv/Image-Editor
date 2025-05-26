<?php

    $file_path = "../../Saved/testing.txt"; 

    if (file_exists($file_path) ) {
        echo file_get_contents($file_path);
    }

?>