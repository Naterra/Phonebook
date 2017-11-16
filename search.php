<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>



<title>DIBmanagement Phone Book Search</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>

<body><center>

<?php 
include("conn_db.php");
$cat= @mysql_query("select DISTINCT Category from data ORDER BY Category asc");
$com= @mysql_query("select DISTINCT CompanyName from data ORDER BY CompanyName asc");
?>
 <table border="1" width="800" >
 <tr align="left" bgcolor="#999999" background="">
    <td>  <span class="style1">Dib Management Phone Book</span>    <div align="right" class="style1"><a href="search.php">Search Contacts</a> | <a href="index.php">Show All Contacts</a> | <a href="phonebook_data.php">Add New Contact</a> </div>
	</td></tr><tr><td align="top" bgcolor="#CCCCCC">
<?php 
echo "<table border=\"0\" width=\"500\" align=\"center\" bgcolor=\"#CCCCCC\">"; 
	echo "<tr><td></td><td><strong>Search Contact by</strong></td></tr>";
	 echo "<form method='post' action='index.php'>";
	echo "<tr><td  align=left>First Name:</td><td><input type= 'text' name='srhFirstName'  ></td></tr>";
	echo "<tr><td  align=left>Last Name:</td><td><input type= 'text' name='srhLastName'  ></td></tr>";
	echo "<tr><td  align=left>Company Name:</td><td>&nbsp;<input type= 'text' name='srhCompanyName'  ></td></tr><br>";
	echo "<tr><td  align=left>Trade/Category:</td><td><select name=\"srhCategory\" size=\"1\">  <option value=\"\">Please Select </option>";
while($result=mysql_fetch_array($cat))
 {
echo " <option value=\"$result[Category]\" >$result[Category]</option>";
}


 echo " </select></td></tr>";
 /*echo "<tr><td  align=left>Company Name:</td><td><select name=\"srhCompanyName\" size=\"1\">  <option value=\"\">Please Select Company </option>";

	while($result=mysql_fetch_array($com))
 {
echo " <option value=\"$result[CompanyName]\" >$result[CompanyName]</option>";
}


 echo " </select></td></tr>";*/
  echo "<tr><td>&nbsp;</td><td><input type= 'submit' name='gsearch'  value='Search'></td></tr>";
  echo "</form>";

echo "</table>";
?>
	</td>
  </tr></table>
</body></center>
</html>
