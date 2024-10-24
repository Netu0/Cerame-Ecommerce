<?php
//DAO Data Acess Objetct

class compraDAO
{
    private $pdo;
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Obter todas as compras da tabela
     */

     public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();
        return $stmt->fetchObject();
    }


    public function getAll()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);

    }

    public function getAllByUser($userid)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra WHERE usuario_id = ?");
        $stmt->bindParam(1, $userid);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /*
     * Inserir uma compra no banco de dados
     */

    public function insert($compra)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_compra (valor,id_usuario) 
        VALUES (:valor,:id_usuario)");

        $stmt->bindValue("valor", $compra->valor);
        $stmt->bindValue("id_usuario", $compra->id_usuario);

        $stmt->execute();
        $compra = clone $compra; //nunca se mexe diretamente no que é enviado, primeiro se clona a info em caso de imprevistos
        $compra->id = $this->pdo->lastInsertId();
        return $compra;

    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM tb_compra WHERE id=:id"); //sempre colocar a where se não apaga tudo
        $stmt->bindValue("id", $id);

        $stmt->execute();
        // Retorna a qdt de linhas afetadas
        return $stmt->rowCount();
    }

    public function update($id, $compra)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_compra SET valor = :valor, id_usuario = :id_usuario WHERE id = :id");

        $data = [
            "id"=> $id,
            "valor" => $compra->valor,
            "id_usuario" => $compra->id_usuario,
        ];

        return $stmt->execute($data);

    }

}


?>