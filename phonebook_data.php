<?php 
include("conn_db.php");
 include("models/main_class.php");
 $mainclass = new Mainclass();

include("header.php"); 
?>

<body>
	<div class="container">


<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Create New Contact</h3>
  </div>
  <div class="panel-body">



 <table class="table" >

	
	<tr><td align="top" bgcolor="">
<?php 

//$record = $mainclass->get_record();

//$query= @mysql_query("select * from data");
$query = $mainclass->get_all_records();



while($res = mysqli_fetch_array($query))
{
    echo "<input type= 'hidden'   name='res' value='$res[Id]' size='20'>";
    $curId=$res['Id'];
}
//echo "Create New Contact";
echo "<form name='NewContact' method='post'  action='index.php'>";

echo "<table width=500><tr><td width=200>&nbsp;$res[Id]</td><td></td></tr>";
echo "<input type='hidden' name='curID' value='$curId'>";
echo "<tr><td width=100 align=left>First Name:</td><td>&nbsp;<input class='form-control' type= 'text' name='FirstName' size='40' ></td></tr>";
echo "<tr><td width=100 align=left>Last Name:</td><td>&nbsp;<input class='form-control'  type= 'text' name='LastName' size='40' ></td></tr>";
echo "<tr><td width=100 align=left>Company Name:</td><td>&nbsp;<input class='form-control' type= 'text' name='CompanyName' size='40' ></td></tr>";
echo "<tr><td width=100 align=left>Title</td><td>&nbsp;<input class='form-control' type= 'text' name='Title' size='40' ></td></tr>";
echo "<tr><td width=100 align=left><br></td><td><b>Phone Numbers: <b> <br></td></tr>";
echo "<tr><td width=100 align=left>Office Phone:</td><td>&nbsp;<input class='form-control' type= 'text' name='OfficeNo' size='40' ></td></tr>";
echo "<tr><td width=100 align=left>Fax:</td><td>&nbsp;<input class='form-control' type= 'text' name='FaxNo' size='40' ></td></tr>";
echo "<tr><td width=100 align=left>Mobile Phone:</td><td>&nbsp;<input class='form-control' type= 'text' name='MobileNo' size='40' ></td></tr>";
echo "<tr><td width=100 align=left>Home Phone:</td><td>&nbsp;<input class='form-control' type= 'text' name='HomeNo' size='40'></td></tr>";
echo "<tr><td width=100 align=left>Other Phone:</td><td>&nbsp;<input class='form-control' type= 'text' name='OtherNo' size='40'></td></tr>";
echo "<tr><td width=100 align=left>Email:</td><td>&nbsp;<input class='form-control' type= 'text' name='Email' size='40'></td></tr>";
echo "<tr><td width=100 align=left></td><td><b>Work Address:<b> <br></td></tr>";
echo "<tr><td width=100 align=left>Street:</td><td>&nbsp;<input class='form-control' type= 'text' name='Street' size='40'></td></tr>";
echo "<tr><td width=100 align=left>City:</td><td>&nbsp;<input class='form-control' type= 'text' name='City' size='40'></td></tr>";
echo "<tr><td width=100 align=left>State/Province:</td><td>&nbsp;<input class='form-control' type= 'text' name='State' size='40'></td></tr>";
echo "<tr><td width=100 align=left>Zip Code:</td><td>&nbsp;<input class='form-control' type= 'text' name='Zip' size='40'></td></tr>";
 echo "<td width=100 align=left>Notes:</td><td>&nbsp;<TEXTAREA  name=Notes rows=5 cols=50></TEXTAREA> </td></tr>";
echo "<tr><td width=100 align=left>Category:</td><td>&nbsp;<input class='form-control' type= 'text' name='Category' size='40'></td></tr>";

  echo "<td  align=left>&nbsp;</td><td>&nbsp;<input class='btn btn-info' type= 'submit' name='AddContact'  value='Create Contact'></td></tr>";
  echo "</form>";
echo "</table>";
?>
</table>

   
  </div>
</div>


</div>

</body>
</html>
