<?php
require 'database.php';
$postdata = file_get_contents( 'php://input' );
if ( isset( $postdata ) && !empty( $postdata ) )
 {
    $request = json_decode( $postdata );
    if ( trim( $request->email ) === '' || trim( $request->count ) === 0 || trim( $request->cost ) === 0) {
        return http_response_code( 400 );
    }
    $email = mysqli_real_escape_string( $con, trim( $request->email ) );
    $cost = mysqli_real_escape_string( $con, trim( $request->cost ) );
    $count = mysqli_real_escape_string( $con, trim( $request->count ) );
    $sql = "INSERT INTO `orders`(`email`,`cost`,`count`) VALUES ('{$email}','{$cost}','{$count}');";
    if ( mysqli_query( $con, $sql ) )
    {
        http_response_code( 201 );
        $checkout = [
            'email' => $email,
            'cost' => $cost,
            'count' => $count
        ];
        echo json_encode($checkout);
    } else {
        http_response_code( 422 );
    }
}