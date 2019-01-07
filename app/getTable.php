<?php

    $total_questions = intval($_GET['q'])+1;
    $string = "";
    for($i = 1; $i <$total_questions; $i++){
        $string .= "<div>$i</div>";
    }

    echo $string;