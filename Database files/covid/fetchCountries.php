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
$value=array();
$Sql_Query ="SELECT country FROM `userdata` where email = '$email'";
$result = $mysqli->query($Sql_Query);
if (@$result->num_rows >0) {
    while($row[] = $result->fetch_assoc()) {
        $item = $row;
        $json = json_encode($item);
   }
   echo @$json;
} else {
    echo json_encode($value);
}
    
$mysqli->close();
?>