<?php

use Firebase\JWT\JWT;

function createJWT($username, $_codPersona, $userType)
{
    $jwtSettings = file_get_contents(__DIR__ . '/../credentials/jwt-settings.json');
    if ($jwtSettings === false) {
        throw new Exception('jwt settings file not found');
    }
    $jwtSettings = json_decode($jwtSettings);
    $tokenId = base64_encode(random_bytes(32));
    $issuedatClaim = time();
    $notbeforeClaim = intval($issuedatClaim + 10);
    $expireClaim = intval($issuedatClaim + 14400); // SCADENZA IN SECONDI 24 ore
    $token = array(
        "iss" => $jwtSettings->issuer_claim,
        "iat" => $issuedatClaim,
        'jti' => $tokenId,
        "nbf" => $notbeforeClaim,
        "exp" => $expireClaim,
        "data" => array(
            "username" => $username,
            "_codPersona" => $_codPersona,
            "userType" => $userType
        )
    );
    return JWT::encode($token, $jwtSettings->secretKey);
}
