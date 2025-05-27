<?php

    $file_path = "../../Saved/"; 

    if (is_dir($file_path)) {
        $children = scandir($file_path);
        $children = array_diff($children, array('.', '..'));
        
        $files_info = array();
        
        foreach ($children as $child) {
            $full_path = $file_path . $child;

            if (is_file($full_path)) {
                $file_contents = file_get_contents($full_path);
                $files_info[] = array(
                    'Name' => pathinfo($child, PATHINFO_FILENAME),
                    'Content' => $file_contents
                );
            }
        }

        echo json_encode($files_info); 
    }
    else {
        echo json_encode([]);
    }

?>
