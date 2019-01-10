<?php
$q = intval($_GET['q']);

$url = 'data.json';
$data = file_get_contents($url);
$characters = json_decode($data);

$item = json_encode($characters[$q],JSON_UNESCAPED_UNICODE);
echo $item;

?>