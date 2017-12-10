<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Origin: *");

$_POST = json_decode(file_get_contents('php://input'), true);
include("./main_class.php");
$mainclass = new Mainclass();

//URL param
parse_str($_SERVER['QUERY_STRING'], $url);

//Get All Contacts (param)
if( $url['action'] =='get_contacts' && $_SERVER['REQUEST_METHOD']=="GET"){
    $page =  ($url['page']-1) * $url['limit'];
    $limit =[$page, $url['limit']];


    $records = $mainclass->get_all_records([
            'limit'=>$limit,
            'where_like'=>['firstName', $url['filterBy']],
            'page'=>$url['page']
    ]);
    echo json_encode($records);
}

// DELETE contact
if( $url['action'] =='delete_contact' && $_SERVER['REQUEST_METHOD']=="POST"){
    $res = $mainclass->delete_record($_POST['id']) ;
    echo json_encode($res);
}

//INSERT OR UPDATE
if( $url['action'] =='save_contact' && $_SERVER['REQUEST_METHOD']=="POST"){
    $records = $mainclass->add_record($_POST);
    echo json_encode($records);
}

if( $url['action'] =='get_contact' && $_SERVER['REQUEST_METHOD']=="GET"){
    if(!is_numeric($url['id']) || $url['id']<0){
      return false;
    }

    $record = $mainclass->get_record($url['id']);
    echo json_encode($record);
}
?>