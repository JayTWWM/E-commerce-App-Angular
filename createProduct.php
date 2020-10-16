<?php
require 'database.php';
$postdata = file_get_contents( 'php://input' );
if ( isset( $postdata ) && !empty( $postdata ) )
 {
    $request = json_decode( $postdata );
    if ( trim( $request->name ) === '' || trim( $request->picLink ) === '' || trim( $request->cost ) === 0 || trim( $request->description ) === '' || trim( $request->discount ) === 100 ) {
        return http_response_code( 400 );
    }
    $name = mysqli_real_escape_string( $con, trim( $request->name ) );
    $picLink = mysqli_real_escape_string( $con, trim( $request->picLink ) );
    $cost = mysqli_real_escape_string( $con, trim( $request->cost ) );
    $description = mysqli_real_escape_string( $con, trim( $request->description ) );
    $discount = mysqli_real_escape_string( $con, trim( $request->discount ) );
    $sql = "INSERT INTO `product`(`Name`,`Piclink`,`Cost`,`Description`,`Discount`) VALUES ('{$name}','{$picLink}','{$cost}','{$description}','{$discount}')";
    if ( mysqli_query( $con, $sql ) )
    {
        http_response_code( 201 );
        $product = [
            'name' => $name,
            'picLink' => $picLink,
            'cost' => $cost,
            'description' => $description,
            'discount' => $discount
        ];
        echo json_encode($product);
    } else {
        http_response_code( 422 );
    }
}
