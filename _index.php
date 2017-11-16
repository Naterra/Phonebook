<?php

// Path to the system directory
//define('BASEPATH', $system_path);
//defined('BASEPATH') OR exit('No direct script access allowed');

    include($_SERVER['DOCUMENT_ROOT']."/phonebook/conn_db.php");
    include("models/main_class.php");
    $mainclass = new Mainclass();

$rowsPerPage = 20;
$pageNum = 1;  // by default we show first page

// if $_GET['page'] defined, use it as page number
if(isset($_GET['page'])){
    $pageNum = $_GET['page'];
}

$offset = ($pageNum - 1) * $rowsPerPage;
?>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Address Book</title>
<link rel="stylesheet" href="adminstyle.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

</head>

<body>
<div id="root"></div>
<script src="dist/bundle.js"></script>


<div class="container">
    <div class="col-sm-12">
    <form action="index.php" method="post">
    <input type="hidden" name="sort" value="<?php echo isset($_POST["sort"]) ? $_POST["sort"]: ''?>">


<?php
    $sort= isset($_POST['sort']) ? $_POST['sort']: false  ;
    if ($sort==""){ $sort="A"; }

    $srhFirstName= isset($_POST['srhFirstName']) ?trim( $_POST['srhFirstName']) : false ;
    $LastName = isset($_POST['LastName']) ? trim($_POST['LastName']) : false;
    $srhLastName= isset($_POST['srhLastName']) ? trim($_POST['srhLastName']) : '';

    $srhCompanyName= isset($_POST['srhCompanyName']) ? $_POST['srhCompanyName'] : '';
    $srhCategory =  isset($_POST['srhCategory']) ? trim( $_POST['srhCategory'] ) : '';
?>
<style>
thead{
	font-weight: bold;
}
</style>

<?php echo $mainclass->get_alpha(); ?>
  

<div class="col-sm-12">
    <div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">
			<h3>Dib Management Phone Book</h3> 
		   <div align="right" class="style1"><a href="search.php">Search Contacts</a> | <a href="index.php">Show All Contacts</a> | <a href="phonebook_data.php">Add New Contact</a></div>
    </div>
    <div class="panel-body">
  
  
<table class="table table-hovered"  >
  <tr>
  <div style="width:100px;">
       <td  bordercolor="#cccccc" bgcolor="#FFFFFF">

<?php

//View Record Page
if( isset($_GET['record_id']) ){
   echo $single_page_html = $mainclass->single_page_view_html($_GET['record_id']);
}

else if( isset($_POST['gsearch']) ){
		$Str = "";
			$Where = Array();
				
			if ( $srhFirstName != "")
			//$Where[]= "'FirstName' LIKE '%".$srhFirstName."%'";
				$Where[] = "instr(FirstName,'".$srhFirstName."')";
			if ($srhLastName != "")
				$Where[] = "instr(LastName,'".$srhLastName."')";
			if ($srhCompanyName != "")
				$Where[] = "instr(CompanyName,'".$srhCompanyName."')";
			if ($srhCategory != "")
				$Where[] = "instr(Category,'".$srhCategory."')";
		//echo $Where;		
			if (count($Where) > 0)
			{
				$Str = implode(" and ", $Where);				
			}
			$Str = "select * FROM data WHERE " . $Str;
			
			$srhquery= @mysql_query($Str);
	$num_rows = mysql_num_rows($srhquery);

	if ($num_rows){
		echo "<table id='table_3' class='table' >
				<thead class='bg-primary'>
					<tr>
					<td><span>Name</span></td>
					<td><span>Company Name</span></td>
					<td><span>Address</span></td>
					<td><span>Work Phone</span></td>
					<td><span>Mobile Phone</span></td>
					<td class='col-sm-2' ><span class=''>Fax No.</span></td>
					<td><span class=''>Category</span></td>
					<td><span class=''>Notes</span></td>
					</tr>
				</thead>
				<tbody>
		";
		  
		while($srhresult=mysql_fetch_array($srhquery)){



		  if($srhresult[FirstName]=="Null")
		 { $srhresult[FirstName]=""; }
		 if($srhresult[LastName]=="Null")
		 { $srhresult[LastName]=""; }
		 if($srhresult[CompanyName]=="Null")
		 { $srhresult[CompanyName]=""; }
		 if($srhresult[Category]=="Null")
		 { $srhresult[Category]=""; }
			  echo "<tr><input type='hidden' name='Id' value='$srhresult[Id]'>";
			echo "<td  >&nbsp;".stripslashes($srhresult['FirstName'])."&nbsp;$srhresult[LastName]</td></a>";
		   echo "<td  >&nbsp;$srhresult[CompanyName]</td>";
		   echo "<td  >&nbsp;$srhresult[Street], $srhresult[City], $srhresult[State], $srhresult[Zip]</td>";
		   echo "<td  >&nbsp;$srhresult[OfficeNo]</td>";
		   echo "<td  >&nbsp;$srhresult[MobileNo]</td>";
			  echo "<td  >&nbsp;$srhresult[FaxNo]</td>";
		   echo "<td  >&nbsp;$srhresult[Category]</td>";
		   echo "<td  >&nbsp;$srhresult[Notes]</td></tr>";
		  

			} 
			
		}
		else
		echo "No Such Record found.<br> Please check Your Spellings or Enter a valid Name or Category";
}

//DELETE record
 else if(isset($_GET['action']) && $_GET['action']=='record_deleted'){
	echo"Record has been Deleted Successfully<br>";
	echo "<a href='index.php'>Show All Contacts</a>";
}

//EDIT record
else if(isset($_GET['action']) && $_GET['action']=='record_updated'){
	if($_GET['status']=="ok"){
		echo "Record has been Updated Successfully<br>";
	}else{
		echo "Record has not been Updated Successfully<br>";
	}
}

//ADD Record POST METHOD
else if ( isset($_POST['AddContact']) ) {
    echo '<br> AddContact <br>';
    $new_rec = $mainclass->add_record($_POST);

     if($new_rec ==1){
		    echo "New contact of <b>".$_POST['FirstName']."  ".$LastName."</b> has Added";
		}else{
		    echo "New contact of <b>".$_POST['FirstName']."  ".$LastName."</b> was not Added<br>";
        }

	echo $record_list_html = $mainclass->show_records_list_html(array(
        'sort'=> $sort,
        'offset' => $offset,
        'rowsPerPage' => $rowsPerPage
    ));
}

  //Default View ?
else {
      echo $record_list_html = $mainclass->show_records_list_html(array(
          'sort'=> $sort,
          'offset' => $offset,
          'rowsPerPage' => $rowsPerPage
      ));
}

?>




<?php echo $mainclass->get_alpha(); ?>
		</div>
		</div>
</form>

</div>
</div>
</div>

</body>
</html>
