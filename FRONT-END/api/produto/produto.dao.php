<?php
// DAO (Data Access Object)

class ProdutoDAO
{
    private $pdo;
    
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Obter todos os produtos da tabela
     */
    public function getAll()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto WHERE id = ?");
        $stmt->bindParam(1, $_REQUEST['id']);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    public function getByCategoria($categoriaid)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto WHERE id_categoria = ?");
        $stmt->bindParam(1, $categoriaid);
        $stmt->execute();

        // Retorna um array de objetos
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /*
     * Inserir um produto no banco de dados
     */
    public function insert($produto)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_produto (nome, descricao, preco, quantidade, caminho_imagem, id_categoria) 
        VALUES (:nome, :descricao, :preco, :quantidade, :caminho_imagem, :id_categoria)");

        $stmt->bindValue(":nome", $produto->nome);
        $stmt->bindValue(":descricao", $produto->descricao);
        $stmt->bindValue(":preco", $produto->preco);
        $stmt->bindValue(":quantidade", $produto->quantidade);
        $stmt->bindValue(":caminho_imagem", $produto->caminho_imagem);
        $stmt->bindValue(':id_categoria', $produto->id_categoria);

        $stmt->execute();
        $produto = clone $produto;
        $produto->id = $this->pdo->lastInsertId();
        return $produto;
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM tb_produto WHERE id = :id");
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        return $stmt->rowCount();
    }

    public function update($id, $produto)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_produto SET nome = :nome, descricao = :descricao, preco = :preco, quantidade = :quantidade, caminho_imagem = :caminho_imagem, id_categoria=:id_categoria WHERE id = :id");

        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":nome", $produto->nome);
        $stmt->bindValue(":descricao", $produto->descricao);
        $stmt->bindValue(":preco", $produto->preco);
        $stmt->bindValue(":quantidade", $produto->quantidade);
        $stmt->bindValue(":caminho_imagem", $produto->caminho_imagem);
        $stmt->bindValue(":id_categoria", $produto->id_categoria);

        return $stmt->execute();
    }
}
?>
