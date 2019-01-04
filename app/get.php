<?php
header("Content-Type: text/html;charset=UTF-8");
$q = intval($_GET['q']);

$con = mysqli_connect('localhost','root','','g1polish');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"g1polish");
$sql="SELECT * FROM data WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result)) {
    $string = '<div id="question" class="row">
                        <div class="text-left"><strong>' . $row['question'] . '</strong></div>
                    </div>
                    <div id="options" class="pt-1">
                        <div class="row pl-2">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optiona'] . '</p>
                        </div>
                        <div class="row pl-2">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optionb'] . '</p>
                        </div>
                        <div class="row pl-2">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optionc'] . '</p>
                        </div>
                        <div class="row pl-2">
                            <p><i class="far fa-circle d-none d-md-inline"></i>&nbsp;' . $row['optiond'] . '</p>
                        </div>
                    </div>
                    <div class="row justify-content-end p-2">
                        <div class="col-lg-3">
                            <button id="skip-button" class="btn btn-outline-dark" style="width: 100%">Skip&nbsp;<i class="fas fa-angle-double-right"></i></button>
                            <button id="next-button" class="btn btn-outline-dark" style="width: 100%"hidden>Next&nbsp;<i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>';
}
    echo call_user_func_array('mb_convert_encoding', array(&$string,'HTML-ENTITIES','UTF-8'));
mysqli_close($con);
?>