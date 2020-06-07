<?php
class Database
{
    private static $pdo;

    function __construct()
    {
        if (self::$pdo == null) {
            $credentials = file_get_contents(__DIR__ . '/../credentials/sql-credentials.json');
            if ($credentials === false) {
                throw new Exception('db credentials file not found');
            }

            $creds_json = json_decode($credentials, true);

            self::$pdo = new PDO($creds_json['dbConnectionString'], $creds_json['user'], $creds_json['pass']);
            self::$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // use 'real prepared statements' for security
        }
    }

    function __destructor()
    {
        self::$pdo = null;
    }

    public function getPDO()
    {
        return self::$pdo;
    }
}
