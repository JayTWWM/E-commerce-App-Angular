<?php
require 'database.php';
$postdata = file_get_contents( 'php://input' );
if ( isset( $postdata ) && !empty( $postdata ) )
 {
    $request = json_decode( $postdata );
    if ( trim( $request->first_name ) === '' || trim( $request->last_name ) === '' || trim( $request->email ) === '' || trim( $request->phone ) === '' || trim( $request->password ) === '' ) {
        return http_response_code( 400 );
    }
    $first_name = mysqli_real_escape_string( $con, trim( $request->first_name ) );
    $last_name = mysqli_real_escape_string( $con, trim( $request->last_name ) );
    $email = mysqli_real_escape_string( $con, trim( $request->email ) );
    $phone = mysqli_real_escape_string( $con, trim( $request->phone ) );
    $password = mysqli_real_escape_string( $con, trim( $request->password ) );
    $sql = "INSERT INTO `user`(`First Name`,`Last Name`,`Email`,`Phone`,`Password`) VALUES ('{$first_name}','{$last_name}','{$email}','{$phone}','{$password}')";
    if ( mysqli_query( $con, $sql ) )
    {
        http_response_code( 201 );
        $user = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'phone' => $phone,
            'password' => $password
        ];
        echo json_encode($user);
    } else {
        http_response_code( 422 );
    }
}