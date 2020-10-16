<?php
require 'database.php';
$postdata = file_get_contents( 'php://input' );
if ( isset( $postdata ) && !empty( $postdata ) )
 {
    $request = json_decode( $postdata );
    if ( trim( $request->email ) === '' || trim( $request->password ) === '' ) {
        return http_response_code( 400 );
    }
    $email = mysqli_real_escape_string( $con, trim( $request->email ) );
    $password = mysqli_real_escape_string( $con, trim( $request->password ) );
    $sql = "SELECT * FROM `user` WHERE Email = '$email' AND Password = '$password';";
    $result = $con->query($sql);
    if (isset($result->num_rows) &&  $result->num_rows > 0 )
    {
        http_response_code( 201 );
        $row = $result->fetch_assoc();
        $user = [
            'first_name' => $row["First Name"],
            'last_name' => $row["Last Name"],
            'email' => $row["Email"],
            'phone' => $row["Phone"],
            'password' => $row["Password"]
        ];
        echo json_encode($user);
    } else {
        http_response_code( 422 );
    }
}