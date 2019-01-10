<?php
$q = intval($_GET['q']);

$con = mysqli_connect('den1.mysql6.gear.host','g1polish','Rq049ZDV!NB!','g1polish');
if (!$con) {
    echo 'dead';
    die('Could not connect: ' . mysqli_error($con));
}

/* change character set to utf8 */
$con->set_charset("utf8");

mysqli_select_db($con,"g1polish");
$sql="SELECT * FROM data WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result)) {

    echo 'loop';
    $correct = $row['correct'];
    $string = '<div id="question" class="row pl-2">
                        <div class="text-left"><strong>' . $row['question'] . '</strong></div>
                    </div>
                    <div id="options" class="pt-3">
                        <div class="row pl-2 '.(($correct==1)?'correct':"").'">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optiona'] . '</p>
                        </div>
                        <div class="row pl-2 '.(($correct==2)?'correct':"").'">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optionb'] . '</p>
                        </div>
                        <div class="row pl-2 '.(($correct==3)?'correct':"").'">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optionc'] . '</p>
                        </div>
                        <div class="row pl-2 '.(($correct==4)?'correct':"").'">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optiond'] . '</p>
                        </div>
                    </div>';
}
    echo 'end';
    echo $string;
    echo call_user_func_array('mb_convert_encoding', array(&$string,'HTML-ENTITIES','UTF-8'));
mysqli_close($con);
?>