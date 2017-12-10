<?php

class Mainclass{

private $conn ;

function __construct(){
	$this->conn = new mysqli("localhost", "homestead", "secret", "homestead_phonebook");

	// check connection
	if ($this->conn->connect_error) {
	  trigger_error('Database connection failed: '  .$this->conn->connect_error, E_USER_ERROR);
	}

}

//facade
function save_record($param){
    $this->add_record($param);
}

function add_record($param){
    $id = isset($param['Id']) ? $param['Id'] : 'null';

    foreach($param as $k=>$p){
        $param[$p] = isset($p) ? $p : '';
    }

   $sql ="INSERT INTO `data` SET 
            `Id` =   ".$id.",
            ".(isset($param['FirstName']) ?  "`FirstName` = '".htmlentities($param['FirstName'])."', " :'')."
            ".(isset($param['LastName']) ?  "`LastName` = '".htmlentities($param['LastName'])."', " :'')."
            ".(isset($param['CompanyName']) ?  "`CompanyName` = '".htmlentities($param['CompanyName'])."', " :'')."
            ".(isset($param['Title']) ?  "`Title` = '".htmlentities($param['Title'])."', " :'')."
            ".(isset($param['OfficeNo']) ?  "`OfficeNo` = '".htmlentities($param['OfficeNo'])."', " :'')."
            ".(isset($param['FaxNo']) ?  "`FaxNo` = '".htmlentities($param['FaxNo'])."', " :'')."
            ".(isset($param['MobileNo']) ?  "`MobileNo` = '".htmlentities($param['MobileNo'])."'," :'')."
            ".(isset($param['HomeNo']) ?  "`HomeNo` = '".htmlentities($param['HomeNo'])."'," :'')."
            ".(isset($param['OtherNo']) ?  "`OtherNo` = '".htmlentities($param['OtherNo'])."'," :'')."
            ".(isset($param['Email']) ?  "`Email` = '".htmlentities($param['Email'])."'," :'')."
            ".(isset($param['Street']) ?  "`Street` = '".htmlentities($param['Street'])."'," :'')."
            ".(isset($param['City']) ?  "`City` = '".htmlentities($param['City'])."'," :'')."
            ".(isset($param['State']) ?  "`State` = '".htmlentities($param['State'])."'," :'')."
            ".(isset($param['Zip']) ?  "`Zip` = '".htmlentities($param['Zip'])."'," :'')."
            `Notes` = ".(isset($param['Notes']) ?  "'".htmlentities($param['Notes'])."'" : "''" ).",
            `Category` = ".(isset($param['Category']) ?  "'".htmlentities($param['Category'])."'" : "''")."
                                                                   
            ON DUPLICATE KEY UPDATE
                ".(isset($param['FirstName']) ?  "`FirstName` = '".htmlentities($param['FirstName'])."'," :'')."
                ".(isset($param['LastName']) ?  "`LastName` = '".htmlentities($param['LastName'])."'," :'')."
                ".(isset($param['CompanyName']) ?  "`CompanyName` = '".htmlentities($param['CompanyName'])."'," :'')."
                ".(isset($param['Title']) ?  "`Title` = '".htmlentities($param['Title'])."'," :'')."
                ".(isset($param['OfficeNo']) ?  "`OfficeNo` = '".htmlentities($param['OfficeNo'])."'," :'')."
                ".(isset($param['FaxNo']) ?  "`FaxNo` = '".htmlentities($param['FaxNo'])."'," :'')."
                ".(isset($param['MobileNo']) ?  "`MobileNo` = '".htmlentities($param['MobileNo'])."'," :'')."
                ".(isset($param['HomeNo']) ?  "`HomeNo` = '".htmlentities($param['HomeNo'])."'," :'')."
                ".(isset($param['OtherNo']) ?  "`OtherNo` = '".htmlentities($param['OtherNo'])."'," :'')."
                ".(isset($param['Email']) ?  "`Email` = '".htmlentities($param['Email'])."'," :'')."
                ".(isset($param['Street']) ?  "`Street` = '".htmlentities($param['Street'])."'," :'')."
                ".(isset($param['City']) ?  "`City` = '".htmlentities($param['City'])."'," :'')."
                ".(isset($param['State']) ?  "`State` = '".htmlentities($param['State'])."'," :'')."
                ".(isset($param['Zip']) ?  "`Zip` = '".htmlentities($param['Zip'])."'," :'')."
                `Notes` = ".(isset($param['Notes']) ?  "'".htmlentities($param['Notes'])."'" : "''").", 
                `Category` = ".(isset($param['Category']) ?  "'".htmlentities($param['Category'])."'" : "''")."
									";
    $res= $this->conn->query($sql);
    return $res;

}


function get_records_by($param){
    $order_by ='';

    //ORDER
    if($param['order_by'] && is_array($param['order_by'])){
        $order_by = "ORDER BY ".$param['order_by'][0].' '.$param['order_by'][1];
    }

    //WHERE
    if($param['where_like'] && is_array($param['where_like'])){
        $where = "WHERE ".$param['where_like'][0]." LIKE '".$param['where_like'][1] ."%'  ";
    }
    elseif($param['where'] && is_array($param['where'])){
        $where = "WHERE ".$param['where'][0]." = '".$param['where'][1] ."'  ";
    }
    else{}

    $q = " select * from data  ".$where." ".$order_by." ";
    $query= $this->conn->query($q);

    $data = [];
    foreach( mysqli_fetch_all($query,MYSQLI_ASSOC) as $row){
         $data[] = $row;
    }
    return $data;
}

function get_all_records($param){
    $where = array();

    if($param['limit']  && is_array($param['limit']) ){

        $limit = 'LIMIT '.(implode(', ',$param['limit']));
    }else{
        $limit ='';
    }

    if($param['where_like'] && is_array($param['where_like']) ){
        $where[] = " `".$param['where_like'][0]."` LIKE '".$param['where_like'][1]."%' ";
    }


    $sql = "SELECT SQL_CALC_FOUND_ROWS * FROM `data` ".(!empty($where) ? "WHERE ".implode(' AND ', $where) : '' )." ORDER BY `FirstName` ASC ". $limit;
    $query= $this->conn->query($sql);

    $data =array();
    while($res = mysqli_fetch_assoc($query)){
        $data[] = $res;
    }

    $total_query = $this->conn->query('SELECT FOUND_ROWS()');
    $total = mysqli_fetch_assoc($total_query);


	return array(
	    'data'=> $data,
        'total'=>(int)$total['FOUND_ROWS()']
    );
}

function get_record($id){
		$query= $this->conn->query("select * from data where Id=".$id);
		$res = mysqli_fetch_assoc($query);
		return $res;
 }
 function get_num_rows($sort){
 	$result  = $this->conn->query("SELECT COUNT(id) AS numrows FROM data where FirstName like '$sort%' ");

	$row     = mysqli_fetch_array($result);
	$numrows = $row['numrows'];
	return $numrows;
 }
 
 function edit_record($data){
	 $q = "UPDATE `data` SET 
				`FirstName` ='".htmlentities($data['FirstName'], ENT_QUOTES)."',
				`LastName` ='".htmlentities($data['LastName'], ENT_QUOTES)."',
				`CompanyName` ='".htmlentities($data['CompanyName'], ENT_QUOTES)."',
				`Title` ='".htmlentities($data['Title'], ENT_QUOTES)."',
				`OfficeNo` ='".htmlentities($data['OfficeNo'], ENT_QUOTES)."',
				`FaxNo` ='".htmlentities($data['FaxNo'], ENT_QUOTES)."',
				`MobileNo` ='".htmlentities($data['MobileNo'], ENT_QUOTES)."',
				`HomeNo` ='".htmlentities($data['HomeNo'], ENT_QUOTES)."',
				`OtherNo` ='".htmlentities($data['OtherNo'], ENT_QUOTES)."',
				`Email`   ='".htmlentities($data['Email'], ENT_QUOTES)."',
				`Street`  ='".htmlentities($data['Street'], ENT_QUOTES)."',
				`City`    ='".htmlentities($data['City'], ENT_QUOTES)."',
				`State`   ='".htmlentities($data['State'], ENT_QUOTES)."',
				`Zip`     ='".htmlentities($data['Zip'], ENT_QUOTES)."',
				`Notes`   ='".htmlentities($data['Notes'], ENT_QUOTES)."',
				`Category` ='".htmlentities($data['Category'], ENT_QUOTES)."' 
				WHERE `Id` ='".$data['id']."' ";

     $result  = $this->conn->query($q);

	return $result;
 }
 
 
 function delete_record($id){
     if($id>=0 && is_numeric($id)){
         $res  = $this->conn->query("DELETE FROM data WHERE Id=".$id);
         return $res==1 ? true: false;
     }else{
         return false;
     }
 }
 
 function Redirect($url, $permanent = false){
	 header('Location: ' . $url, true, $permanent ? 301 : 302);
	 exit();
}



}
?>