<?php
    include("conn_db.php");
    include($_SERVER['DOCUMENT_ROOT']."/phonebook/models/main_class.php");
    $mainclass = new Mainclass();

    //POST
    if(isset($_POST['record_id']) ){
        $action = $mainclass->delete_record($_POST['record_id']);
        if($action){
            $mainclass->Redirect("/phonebook?action=record_deleted", false);
        }
    }

    include("header.php");

    $record_id=$_GET["record_id"];
    $res = $mainclass->get_record($record_id);
?>

<style>
.panel-body {
   background: #fcfcfc;
}
</style>

<body>
<div class="container">
<form name='delete_record' id='delete_record' method='post'  action='' class="form-horizontal">
	<input type='hidden' name='record_id' value='<?php echo $record_id; ?>'>

<div class="panel panel-default">
  <div class="panel-heading">
		Dib Management Phone Book
		<div align="right" class="style1"><a href="search.php">Search Contacts</a> | <a href="index.php">Show All Contacts</a> | <a href="phonebook_data.php">Add New Contact</a> </div>
  </div>
  <div class="panel-body">
			<div class="alert alert-warning alert-sm" role="alert">You are going to delete the following Contact...  Are you sure to delete the Contact?</div>
			
  
  
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">First Name</label>
				<div class="col-sm-10">
                    <input disabled type= 'text' name='FirstName' value='<?php echo $res['FirstName']; ?>' class='form-control'  ></div>
			</div> 		

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Last Name</label>
				<div class="col-sm-10">
                    <input disabled type= 'text' name='LastName' value='<?php echo $res['LastName']; ?>' class='form-control' ></div>
			</div> 
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Company Name</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='CompanyName' value='<?php echo $res['CompanyName']; ?>'  class='form-control'>
				</div>
			</div> 

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Title</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='Title' value='<?php echo $res['Title']; ?>'  class='form-control'>
				</div>
			</div> 
			
			 
			<h5 class="text-center text-info"><strong>Phone Numbers:</strong></h5>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Office Phone</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='OfficeNo' value='<?php echo $res['OfficeNo']; ?>'  class='form-control'>
				</div>
			</div> 

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Fax</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='FaxNo' value='<?php echo $res['FaxNo']; ?>'  class='form-control'>
				</div>
			</div> 		

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Mobile Phone</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='MobileNo' value='<?php echo $res['MobileNo']; ?>'  class='form-control'>
				</div>
			</div>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Home Phone</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='HomeNo' value='<?php echo $res['HomeNo']; ?>'  class='form-control'>
				</div>
			</div>			

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Other Phone</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='OtherNo' value='<?php echo $res['OtherNo']; ?>'  class='form-control'>
				</div>
			</div>

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='Email' value='<?php echo $res['Email']; ?>'  class='form-control'>
				</div>
			</div>
			
			 
			<h5 class="text-center text-info"><strong>Work Address:</strong></h5>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Street</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='Street' value='<?php echo $res['Street']; ?>'  class='form-control'>
				</div>
			</div>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">City</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='City' value='<?php echo $res['City']; ?>'  class='form-control'>
				</div>
			</div>
			
				<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">State/Province</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='State' value='<?php echo $res['State']; ?>'  class='form-control'>
				</div>
			</div>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Zip Code</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='Zip' value='<?php echo $res['Zip']; ?>'  class='form-control'>
				</div>
			</div>	

			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Notes</label>
				<div class="col-sm-10">
				<textarea  disabled name='Notes'  class='form-control'><?php echo $res['Notes']; ?></textarea>
				</div>
			</div>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Category</label>
				<div class="col-sm-10">
				<input disabled type= 'text' name='Category' value='<?php echo $res['Category']; ?>'  class='form-control'>
				</div>
			</div>
			
			<div class="form-group text-center ">
				<button type= 'submit' name='delete'  value='' class='btn btn-primary'>Delete Contact</button>
				<a type= 'button' href="/phonebook" class='btn btn-primary'>Cancel</a>
			</div> 
			
  </div>
</div>



</form>
</div>
</body>
</html>
