<?php
require 'database.php';
$array1 = array();
$sql = "SELECT * FROM `product`";
$result = $con->query($sql);
if (isset($result->num_rows) &&  $result->num_rows > 0 )
{
    while($rows = $result->fetch_assoc())
    {
        $array1[] = $rows;
    }
    http_response_code( 201 );
    echo json_encode($array1);

} else {
    http_response_code( 422 );
}