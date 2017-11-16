<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Origin: *");

//$_POST = json_decode(file_get_contents('php://input'), true);
//echo '<pre>'; print_r($_POST); echo '</pre>';


include($_SERVER['DOCUMENT_ROOT']."/phonebook/conn_db.php");
include("../models/main_class.php");
$mainclass = new Mainclass();



//URL param
parse_str($_SERVER['QUERY_STRING'], $url);
//echo '<pre>'; print_r($url); echo '</pre>';

if( $url['action'] =='contacts' && $_SERVER['REQUEST_METHOD']=="GET"){
        $records = $mainclass->get_all_records(['limit'=>$url['limit']]);
         echo json_encode($records);
}

if( $url['action'] =='get_contact' && $_SERVER['REQUEST_METHOD']=="GET"){
    if(!is_numeric($url['id']) || $url['id']<0){
      return false;
    }

    $record = $mainclass->get_record($url['id']);
    echo json_encode($record);
}

//echo '<pre>'; print_r($_SERVER); echo '</pre>';
?>