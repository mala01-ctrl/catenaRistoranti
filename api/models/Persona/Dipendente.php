<?php
require_once __DIR__ . "/Persona.php";
class Dipendente extends Persona
{
    public $id_dipendente;
    public $cellulare;
    public $password;
    public $nomeUnita;
    public $idUnita;

    public function __construct()
    {
        parent::__construct();
    }

    public function addDipendente()
    {
        if (!$this->addPersona())
            return false;
        try {
            $sql = "INSERT INTO dipendenti(id_dipendente, cellulare, password, idUnita)
                VALUES (:id_dipendente, :cellulare, :password, :idUnita)";
            $stmt = $this->conn->prepare($sql);
            $data = [
                'id_dipendente' => $this->id_persona,
                'cellulare' => $this->cellulare,
                'password' => password_hash($this->password, PASSWORD_DEFAULT),
                'idUnita' => $this->idUnita
            ];
            return $stmt->execute($data);
        } catch (PDOException $e) {
            echo json_encode($e);
        }
    }

    public function login()
    {
        try {
            $sql = "SELECT p.username, d.password, d.id_dipendente, u.nome as unita
             FROM persona p
             INNER JOIN dipendenti d on d.id_dipendente = p.id_persona
             INNER JOIN unitalavorativa u on u.id_unita = d.idUnita
             WHERE p.username = :username";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue('username', $this->username);
            $stmt->execute();
            $dipendente = $stmt->fetchObject();
            $this->nomeUnita = $dipendente->unita;
            $this->id_persona = $dipendente->id_dipendente;
            if (password_verify($this->password, $dipendente->password))
                return true;
        } catch (PDOException $e) {
            echo json_encode($e);
        }
    }
}
