<?php
require_once __DIR__ . "/../Indirizzi/Indirizzo.php";
require_once __DIR__ . "/Persona.php";
class Cliente extends Persona
{
    public $cellulare;
    public $password;
    public $punti;
    public $indirizzo;

    public function Cliente()
    {
        parent::__construct();
        $this->indirizzo = new Indirizzo();
    }

    public function addCliente()
    {
        $this->addPersona();
        try {
            $sql = "INSERT INTO cliente (id_cliente, cellulare, password, punti)
            VALUES (:id_cliente, :cellulare, :password, :punti)";
            $stmt = $this->conn->prepare($sql);
            $data = [
                "id_cliente" => $this->id_persona,
                "cellulare" => $this->cellulare,
                "password" => password_hash($this->password, PASSWORD_DEFAULT),
                "punti" => 10
            ];
            return $stmt->execute($data);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function addClienteIndirizzo()
    {
        try {
            $this->indirizzo->addIndirizzo();
            $this->addCliente();
            $sql = "INSERT INTO cliente_indirizzo(id_cliente, id_indirizzo)
            VALUES(:id_cliente, :id_indirizzo)";
            $stmt = $this->conn->prepare($sql);
            $data = [
                "id_cliente" => $this->id_persona,
                "id_indirizzo" => $this->indirizzo->id_indirizzo
            ];
            return $stmt->execute($data);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function login()
    {
        try {
            $sql = "SELECT p.username, c.password, p.id_persona FROM cliente c 
            INNER JOIN persona p on p.id_persona = c.id_cliente
            WHERE p.username = :username";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue('username', $this->username);
            $stmt->execute();
            $cliente = $stmt->fetchObject();
            $this->id_persona = $cliente->id_persona;
            if (password_verify($this->password, $cliente->password))
                return true;
            return false;
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
