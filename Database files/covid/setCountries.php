<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'config.php';

$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email=$obj['email'];
$country=$obj['country'];
$value=array();
$Sql_Query ="INSERT INTO `userdata`(`email`, `country`) VALUES ('$email','$country')";
$result = $mysqli->query($Sql_Query);
    
$mysqli->close();
?>