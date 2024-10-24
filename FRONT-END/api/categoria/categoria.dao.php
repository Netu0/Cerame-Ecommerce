<?php
//DAO Data Acess Objetct

class categoriaDAO
{
    private $pdo;
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Obter todas as categorias da tabela
     */

    public function getAll()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM tb_categoria");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);

    }

    public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_categoria WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    /*
     * Inserir uma categoria no banco de dados
     */

    public function insert($categoria)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_categoria (nome) 
        VALUES (:nome)");

        $stmt->bindValue("nome", $categoria->nome);

        $stmt->execute();
        $categoria = clone $categoria; //nunca se mexe diretamente no que é enviado, primeiro se clona a info em caso de imprevistos
        $categoria->id = $this->pdo->lastInsertId();
        return $categoria;

    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM tb_categoria WHERE id=:id"); //sempre colocar a where se não apaga tudo
        $stmt->bindValue("id", $id);

        $stmt->execute();
        // Retorna a qdt de linhas afetadas
        return $stmt->rowCount();
    }

    public function update($id, $categoria)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_categoria SET nome = :nome WHERE id = :id");

        $data = [
            "id" => $id,
            "nome" => $categoria->nome,
        ];

        return $stmt->execute($data);

    }

}


?>