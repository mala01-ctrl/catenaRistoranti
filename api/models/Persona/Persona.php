<?php
require_once __DIR__ . "/../Database.php";
class Persona
{
    public $id_persona;
    public $nome;
    public $cognome;
    public $email;
    public $username;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function addPersona()
    {
        try {
            $sql = "INSERT INTO persona(nome, cognome, email, username)
                VALUES (:nome, :cognome, :email, :username)";
            $stmt = $this->conn->prepare($sql);
            $data = [
                "nome" => $this->nome,
                "cognome" => $this->cognome,
                "email" => $this->email,
                "username" => $this->username
            ];
            $esito = $stmt->execute($data);
            $this->id_persona = $this->conn->lastInsertId();
            return $esito;
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
