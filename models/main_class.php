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
//    echo '<pre>';
//    print_r($param);
//    echo '</pre>';

    $firstName   =  $param['FirstName'] ? $param['FirstName']  : 'Null';
    $lastName    =  $param['LastName'] ? $param['LastName']  : 'Null';
    $companyName =  $param['CompanyName'] ? $param['CompanyName']  : 'Null';
    $category    =  $param['Category'] ? $param['Category']  : 'Null';

    $res= $this->conn->query("INSERT INTO `data` SET 
                                        `Id` = '".$param['Id']."',
                                        `FirstName` = '".htmlentities($firstName, ENT_QUOTES)."',
                                        `LastName` = '".htmlentities($lastName, ENT_QUOTES)."',
                                        `CompanyName` = '".htmlentities($companyName, ENT_QUOTES)."',
                                        `Title` = '".htmlentities($param['Title'], ENT_QUOTES)."',
                                        `OfficeNo` = '".htmlentities($param['OfficeNo'], ENT_QUOTES)."', 
                                        `FaxNo` = '".htmlentities($param['FaxNo'], ENT_QUOTES)."',
                                        `MobileNo` = '".htmlentities($param['MobileNo'], ENT_QUOTES)."',
                                        `HomeNo` = '".htmlentities($param['HomeNo'], ENT_QUOTES)."',
                                        `OtherNo` = '".htmlentities($param['OtherNo'], ENT_QUOTES)."',
                                        `Email` = '".htmlentities($param['Email'], ENT_QUOTES)."', 
                                        `Street` = '".htmlentities($param['Street'], ENT_QUOTES)."',
                                        `City` = '".htmlentities($param['City'], ENT_QUOTES)."',
                                        `State` = '".htmlentities($param['State'], ENT_QUOTES)."',
                                        `Zip` = '".htmlentities($param['Zip'], ENT_QUOTES)."',
                                        `Notes` = '".htmlentities($param['Notes'], ENT_QUOTES)."',
                                        `Category`  = '".htmlentities($category, ENT_QUOTES)."' 
									ON DUPLICATE KEY UPDATE
                                        `FirstName` = '".htmlentities($firstName, ENT_QUOTES)."',
                                        `LastName` = '".htmlentities($lastName, ENT_QUOTES)."',
                                        `CompanyName` = '".htmlentities($companyName, ENT_QUOTES)."',
                                        `Title` = '".htmlentities($param['Title'], ENT_QUOTES)."',
                                        `OfficeNo` = '".htmlentities($param['OfficeNo'], ENT_QUOTES)."', 
                                        `FaxNo` = '".htmlentities($param['FaxNo'], ENT_QUOTES)."',
                                        `MobileNo` = '".htmlentities($param['MobileNo'], ENT_QUOTES)."',
                                        `HomeNo` = '".htmlentities($param['HomeNo'], ENT_QUOTES)."',
                                        `OtherNo` = '".htmlentities($param['OtherNo'], ENT_QUOTES)."',
                                        `Email` = '".htmlentities($param['Email'], ENT_QUOTES)."', 
                                        `Street` = '".htmlentities($param['Street'], ENT_QUOTES)."',
                                        `City` = '".htmlentities($param['City'], ENT_QUOTES)."',
                                        `State` = '".htmlentities($param['State'], ENT_QUOTES)."',
                                        `Zip` = '".htmlentities($param['Zip'], ENT_QUOTES)."',
                                        `Notes` = '".htmlentities($param['Notes'], ENT_QUOTES)."',
                                        `Category`  = '".htmlentities($category, ENT_QUOTES)."'
									");
    return $res;

}

//function get_records_by($field, $param){
function get_records_by($param){

    //$sort is for "where FirstName like '$sort%'"
    //use where_like ' $sort%'

//    echo '<pre>';
//    print_r($param);
//    echo '</pre>';
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

    //echo  '<br>'.$q. ' <br>';

    $query= $this->conn->query($q);

    $data = [];
    //$result,MYSQLI_ASSOC
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
        //print_r($param['where_like']);
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
        'total'=>$total['FOUND_ROWS()']
    );
}

function get_record($id){
		$query= $this->conn->query("select * from data where Id=".$id);
		//echo "select * from data where Id=".$id ;
		$res = mysqli_fetch_assoc($query);
		return $res;
 }
 function get_num_rows($sort){
 	//echo '<pre>';  	print_r($con);  echo '</pre>';

 	$result  = $this->conn->query("SELECT COUNT(id) AS numrows FROM data where FirstName like '$sort%' ");
	//$result  = mysqli_query($con, "SELECT COUNT(id) AS numrows FROM data where FirstName like '$sort%' ")  ;
	$row     = mysqli_fetch_array($result);
	$numrows = $row['numrows'];
	return $numrows;
 }
 
 function edit_record($data){
	 //echo ' FN edit_record';
	 //echo '<pre>'; print_r($data); echo '</pre>';
	 
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
     }
	 return $res;
 }
 
 function Redirect($url, $permanent = false){
	 header('Location: ' . $url, true, $permanent ? 301 : 302);
	 exit();
}

function get_alpha(){
	$div ='
 
  
  <div class="" STYLE="width:100%"   >
		  <div class="btn-toolbar" role="toolbar">
		  <div class="btn-group btn-group-justified">
		   
		   <button onClick="document.forms[0].sort.value=\'A\';document.forms[0].submit()" type="button" class="btn btn-primary">A</button>
		   <button onClick="document.forms[0].sort.value=\'B\';document.forms[0].submit()" type="button" class="btn btn-primary">B</button>
		   <button onClick="document.forms[0].sort.value=\'C\';document.forms[0].submit()" type="button" class="btn btn-primary">C</button>
		   <button onClick="document.forms[0].sort.value=\'D\';document.forms[0].submit()" type="button" class="btn btn-primary">D</button>
		   <button onClick="document.forms[0].sort.value=\'E\';document.forms[0].submit()" type="button" class="btn btn-primary">E</button>
		   <button onClick="document.forms[0].sort.value=\'F\';document.forms[0].submit()" type="button" class="btn btn-primary">F</button>
		   <button onClick="document.forms[0].sort.value=\'G\';document.forms[0].submit()" type="button" class="btn btn-primary">G</button>
		   <button onClick="document.forms[0].sort.value=\'H\';document.forms[0].submit()" type="button" class="btn btn-primary">H</button>
		   <button onClick="document.forms[0].sort.value=\'I\';document.forms[0].submit()" type="button" class="btn btn-primary">I</button>
		   <button onClick="document.forms[0].sort.value=\'J\';document.forms[0].submit()" type="button" class="btn btn-primary">J</button>
		   <button onClick="document.forms[0].sort.value=\'K\';document.forms[0].submit()" type="button" class="btn btn-primary">K</button>
		   <button onClick="document.forms[0].sort.value=\'L\';document.forms[0].submit()" type="button" class="btn btn-primary">L</button>
		   <button onClick="document.forms[0].sort.value=\'M\';document.forms[0].submit()" type="button" class="btn btn-primary">M</button>
		   <button onClick="document.forms[0].sort.value=\'N\';document.forms[0].submit()" type="button" class="btn btn-primary">N</button>
		   <button onClick="document.forms[0].sort.value=\'O\';document.forms[0].submit()" type="button" class="btn btn-primary">O</button>
		   <button onClick="document.forms[0].sort.value=\'P\';document.forms[0].submit()" type="button" class="btn btn-primary">P</button>
		   <button onClick="document.forms[0].sort.value=\'Q\';document.forms[0].submit()" type="button" class="btn btn-primary">Q</button>
		   <button onClick="document.forms[0].sort.value=\'R\';document.forms[0].submit()" type="button" class="btn btn-primary">R</button>
		   <button onClick="document.forms[0].sort.value=\'S\';document.forms[0].submit()" type="button" class="btn btn-primary">S</button>
		   <button onClick="document.forms[0].sort.value=\'T\';document.forms[0].submit()" type="button" class="btn btn-primary">T</button>
		   <button onClick="document.forms[0].sort.value=\'U\';document.forms[0].submit()" type="button" class="btn btn-primary">U</button>
		   <button onClick="document.forms[0].sort.value=\'V\';document.forms[0].submit()" type="button" class="btn btn-primary">V</button>
		   <button onClick="document.forms[0].sort.value=\'W\';document.forms[0].submit()" type="button" class="btn btn-primary">W</button>
		   <button onClick="document.forms[0].sort.value=\'X\';document.forms[0].submit()" type="button" class="btn btn-primary">X</button>
		   <button onClick="document.forms[0].sort.value=\'Y\';document.forms[0].submit()" type="button" class="btn btn-primary">Y</button>
		   <button onClick="document.forms[0].sort.value=\'Z\';document.forms[0].submit()" type="button" class="btn btn-primary">Z</button>
		   
		  </div>
		</div> 
		</div><br>';
	return $div;
}

function show_records_list_html($param){
//    $query= @mysql_query("select * from data where FirstName like '$sort%' ORDER BY FirstName ASC
//		" .
//        " LIMIT $offset, $rowsPerPage"
//    );


    $result= $this->get_records_by(array(
        'where_like'=>['FirstName', $param['sort'] ],
        'order_by'=>['FirstName', 'ASC']
    ));



    $html = "<table id='table_4' class='table table-hover table-striped' >";
    $html .='<thead>';
	$html .='<tr>';
	$html .="    <td><span class=''>Name</span></td>";
	$html .='    <td><span class="">Company Name</span></td>';
	$html .='    <td><span class="">Work Phone</span></td>';
	$html .='    <td><span class="">Mobile Phone</span></td>';
	$html .="    <td class='col-sm-2'><span class=''>Fax No.</span></td>";
	$html .='    <td><span class="">Category</span></td>';
	$html .='    <td><span  >Notes</span></td>';
	$html .="    <td class='col-sm-2'><span class=''>Modify</span></td>	";
	$html .="</tr>";
	$html .="</thead>";
	$html .="<tbody> ";


    foreach($result as $k=>$val ){
//   echo '<pre>';   print_r($val);  echo '</pre>';

        $html .="<input type='hidden' name='Id' value='".$val['Id']."' >";
        $html .="<tr >";
        $html .="    <td> <a href='index.php?record_id=".$val['Id']."' >  ".$val['FirstName']."  ".$val['LastName']."</a></td>";
        $html .="    <td>".$val['CompanyName']."</td>";
        $html .="    <td>".$val['OfficeNo']."</td>";
        $html .="    <td  >".$val['MobileNo']."</td>";
        $html .="    <td  >".$val['FaxNo']."</td>";
        $html .="    <td  >".$val['Category']."</td>";
        $html .="    <td  >".stripslashes($val['Notes'])."</td>";
        $html .="    <td >";
        $html .="       <a href='edit.php?record_id=".$val['Id']."'>(Edit) </a> ";
        $html .="       <a href='delete.php?record_id=".$val['Id']."'>(Delete)</a>";
        $html .="    </td>";
        $html .="</tr>";
    }

    $html .="  </tbody>";
    $html .="</table>";

   //$this->show_paging();
    return $html;
}

function single_page_view_html($record_id){
    $record = $this->get_record($record_id);
    //echo '<pre>'; print_r($record);  echo '</pre>';

    $record['FirstName']=="Null" ? $record['FirstName']="": '';
    $record['LastName']=="Null" ? $record['LastName']="": '';
    $record['CompanyName']=="Null" ? $record['CompanyName']="": '';
    $record['Category']=="Null" ? $record['Category']="": '';

    $html =  "<table class='table' id='table_2'  >";
    $html .= "<tr ><input type='hidden' name='Id' value='".$record['Id']."'>";
    $html .= "    <td align='right'><b>Name:</b></td>";
    $html .= "    <td align='left' >". $record['FirstName'] ." ".$record['LastName']."</td>";
    $html .= "    <td align='right'><b>Title:</b></td>";
    $html .= "    <td align='left' >".$record['Title']."</td>";
    $html .= "</tr>";

    $html .= "<tr>";
    $html .= "    <td align='right'><b>Office Phone#:</b></td>";
    $html .= "    <td align='left' >".$record['OfficeNo']."</td>";
    $html .= "    <td align='right'><b>Company Name:</b></td>";
    $html .= "    <td align='left' >".$record['CompanyName']."</td>";
    $html .= "</tr>";

    $html .= "<tr>";
    $html .= "    <td align='right'><b>Mobile Phone#:</b></td>";
    $html .= "    <td align='left' >".$record['MobileNo']."</td>";
    $html .= "    <td align='right'><b>Email:</b></td>";
    $html .= "    <td align='left'>".$record['Email']."</td>";
    $html .= "</tr>";

    $html .= "<tr>";
    $html .= "    <td align='right'><b>Home Phone#:</b></td>";
    $html .= "    <td align='left' >".$record['HomeNo']."</td>";
    $html .= "    <td align='right'><b>Category:</b></td>";
    $html .= "    <td align='left' >".$record['Category']."</td>";
    $html .= "</tr>";

    $html .= "<tr>";
    $html .= "  <td align='right'><b>Other Phone#:</b></td>";
    $html .= "  <td align='left' >".$record['OtherNo']."</td>";
    $html .= "  <td></td>";
    $html .= "  <td></td>";
    $html .= "</tr>";

    $html .= "<tr>";
    $html .= "    <td align='right'><b>Fax#:</b></td>";
    $html .= "    <td align='left'>".$record['FaxNo']."</td>";
    $html .= "    <td align='right'><b>Fax#:</b></td>";
    $html .= "    <td align='left'>".$record['Notes']."</td>";
    $html .= "</tr>";

    $html .= "<tr>";
    $html .= " <td align='right'><b>Work Address:</b></td>";
    $html .= " <td align='left' valign='left'>".$record['Street']." ".$record['City']." ".$record['State'].", ".$record['Zip']."</td>";
    $html .= "  <td align='right'><b>Notes:</b></td>";
    $html .= "  <td align='left'>".$record['Notes']."<td>";
    $html .= "</tr>";

    $html .= "</table>";

return $html;

}

function show_paging(){
    //    $result  = mysqli_query($con, "SELECT COUNT(id) AS numrows FROM data where FirstName like '$sort%' ") or die('Error, this query failed');
    //    $row     = mysql_fetch_array($result, MYSQL_ASSOC);
    //    $numrows = $row['numrows'];

    // how many pages we have when using paging?
       // $maxPage = ceil($numrows/$rowsPerPage);

    // print the link to access each page
        //$self = $_SERVER['PHP_SELF'];
    //    $nav  = '';
    //
    //    for($page = 1; $page <= $maxPage; $page++)
    //    {
    //        if ($page == $pageNum)
    //        {
    //            $nav .= " $page "; // no need to create a link to current page
    //        }
    //        else
    //        {
    //            $nav .= " <a href=\"$self?page=$page\">$page</a> ";
    //        }
    //    }
    //
    //    if ($pageNum > 1)
    //    {
    //        $page  = $pageNum - 1;
    //        $prev  = " <a href=\"$self?page=$page\">[Prev]</a> ";
    //
    //        $first = " <a href=\"$self?page=1\">[First Page]</a> ";
    //    }
    //    else
    //    {
    //        $prev  = '&nbsp;'; // we're on page one, don't print previous link
    //        $first = '&nbsp;'; // nor the first page link
    //    }
    //
    //    if ($pageNum < $maxPage)
    //    {
    //        $page = $pageNum + 1;
    //        $next = " <a href=\"$self?page=$page\">[Next]</a> ";
    //
    //        $last = " <a href=\"$self?page=$maxPage\">[Last Page]</a> ";
    //    }
    //    else
    //    {
    //        $next = '&nbsp;'; // we're on the last page, don't print next link
    //        $last = '&nbsp;'; // nor the last page link
    //    }
}

}

 

?>