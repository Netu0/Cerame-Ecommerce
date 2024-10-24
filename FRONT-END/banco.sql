-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 05/07/2023 às 04:14
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_api_projeto`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_categoria`
--

CREATE TABLE `tb_categoria` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_categoria`
--

INSERT INTO `tb_categoria` (`id`, `nome`) VALUES
(32, 'Copo'),
(31, 'Pratos'),
(29, 'Xicara');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_compra`
--

CREATE TABLE `tb_compra` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `valor` float NOT NULL,
  `datas` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_compra`
--

INSERT INTO `tb_compra` (`id`, `id_usuario`, `valor`, `datas`) VALUES
(52, 36, 400, '2023-06-15'),
(53, 36, 400, '2023-06-15'),
(54, 36, 400, '2023-06-15'),
(55, 44, 4000, '2023-06-16'),
(56, 36, 400, '2023-06-15'),
(57, 36, 400, '2023-06-15'),
(59, 44, 4000, '2023-06-16');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_compra_produto`
--

CREATE TABLE `tb_compra_produto` (
  `compra_id` int(11) UNSIGNED NOT NULL,
  `produto_id` int(11) UNSIGNED NOT NULL,
  `quantidade` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_compra_produto`
--

INSERT INTO `tb_compra_produto` (`compra_id`, `produto_id`, `quantidade`) VALUES
(55, 7, 1.00),
(55, 8, 1.00),
(56, 7, 1.00),
(56, 8, 1.00),
(57, 7, 1.00),
(57, 8, 1.00),
(59, 22, 9.00),
(59, 28, 7.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_produto`
--

CREATE TABLE `tb_produto` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(30) NOT NULL,
  `descricao` text NOT NULL,
  `preco` float NOT NULL,
  `quantidade` int(11) NOT NULL,
  `caminho_imagem` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_produto`
--

INSERT INTO `tb_produto` (`id`, `nome`, `descricao`, `preco`, `quantidade`, `caminho_imagem`, `id_categoria`) VALUES
(23, 'copinho marinho', 'Copinho em cerâmica de alta temperatura. Esmalte azul marinho brilhante.', 46, 15, 'https://static.wixstatic.com/media/5906ab_9b1437ffdba54c90af30a1e0acb169f9~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_9b1437ffdba54c90af30a1e0acb169f9~mv2.jpg', 32),
(24, 'copinho blush', 'Copinho em cerâmica de alta temperatura. Esmalte blush-rosadinho acetinado.', 46, 7, 'https://static.wixstatic.com/media/5906ab_b0689cdcea5746ecbd3bba794c0815cd~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_b0689cdcea5746ecbd3bba794c0815cd~mv2.jpg', 32),
(25, 'copinho aveia', 'Copinho em cerâmica de alta temperatura. Esmalte acetinado na cor aveia-bege-fendi-chique, às vezes é bege, às vezes é um creme esverdeado, mas nunca branco.', 46, 2, 'https://static.wixstatic.com/media/5906ab_e28546fceecb4458935f59269609f5d9~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_e28546fceecb4458935f59269609f5d9~mv2.jpg', 32),
(26, 'xícara aveia', 'Xícara em cerâmica de alta temperatura. Esmalte acetinado na cor aveia-bege-fendi-chique, às vezes é bege, às vezes é um creme esverdeado, mas nunca branco.', 78, 13, 'https://static.wixstatic.com/media/5906ab_bb8989cc3de540d38d1cb77e8e760a04~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_bb8989cc3de540d38d1cb77e8e760a04~mv2.jpg', 29),
(27, 'xícara blush', 'Xícara em cerâmica de alta temperatura. Esmalte blush-rosadinho acetinado.', 78, 6, 'https://static.wixstatic.com/media/5906ab_7fcaf0b6c86c43518b1667a9ace9a9de~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_7fcaf0b6c86c43518b1667a9ace9a9de~mv2.jpg', 29),
(28, 'xícara marinho', 'Xícara em cerâmica de alta temperatura. Esmalte azul marinho brilhante.', 78, 17, 'https://static.wixstatic.com/media/5906ab_47eb469cc4664dd796f22c20d1eb0173~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_47eb469cc4664dd796f22c20d1eb0173~mv2.jpg', 29),
(29, 'prato refeição blush', 'Prato em cerâmica de alta temperatura. Esmalte blush-rosado acetinado.', 142, 27, 'https://static.wixstatic.com/media/5906ab_a4efc409560f42968ffd7e2b02362b49~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_a4efc409560f42968ffd7e2b02362b49~mv2.jpg', 31),
(30, 'prato refeição aveia', 'Prato em cerâmica de alta temperatura. Esmalte acetinado na cor aveia-bege-fendi-chique, às vezes é bege, às vezes é um creme esverdeado, mas nunca branco.', 142, 5, 'https://static.wixstatic.com/media/5906ab_21161e8298eb4bc3b1f074f7bde21b45~mv2.jpg/v1/fill/w_373,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5906ab_21161e8298eb4bc3b1f074f7bde21b45~mv2.jpg', 31);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_produto_categoria`
--

CREATE TABLE `tb_produto_categoria` (
  `produto_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_produto_categoria`
--

INSERT INTO `tb_produto_categoria` (`produto_id`, `categoria_id`) VALUES
(29, 29),
(30, 29),
(26, 31),
(27, 31),
(28, 31),
(23, 32),
(24, 32),
(25, 32);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(20) NOT NULL DEFAULT '',
  `nascimento` date DEFAULT NULL,
  `adm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`id`, `nome`, `email`, `senha`, `nascimento`, `adm`) VALUES
(36, 'Estefani', 'Estefani@gmail.com', '1234', '2003-11-11', 1),
(42, 'Oswaldo', 'Valdo@gmail.com', '1234', '2002-11-25', 0),
(43, 'Maria Celia', 'Celia@gmail.com', '1234', '1965-01-10', 0),
(44, 'Usuario1', 'Usuario1@gmail.com', '1234', '2003-11-11', 1),
(46, 'Usuario2', 'Usuario2@gmail.com', '1234', '2003-09-11', 0),
(55, 'user', 'user@gmail.com', '0', '4132-03-12', 0),
(57, 'Estelinha', 'mar@gmail.com', '123', '1980-03-29', 0),
(58, 'Pessini', 'pessini@gmail.com', 'pes', '2334-04-10', 0),
(59, 'k', 'k@gmail.com', '1', '1111-11-11', 0),
(60, 'Oswaldo Beltrani neto', 'neto@gmail.com', '123', '2002-11-25', 0),
(61, 'Oswaldo Beltrani', 'neto1@gmail.com', '123', '2002-11-25', 0),
(62, 'Heloisa', 'Helo@gmail.com', '1234', '1965-07-01', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_categoria`
--
ALTER TABLE `tb_categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `tb_compra`
--
ALTER TABLE `tb_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_compra_usuario` (`id_usuario`);

--
-- Índices de tabela `tb_compra_produto`
--
ALTER TABLE `tb_compra_produto`
  ADD PRIMARY KEY (`compra_id`,`produto_id`);

--
-- Índices de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tb_produto_categoria`
--
ALTER TABLE `tb_produto_categoria`
  ADD PRIMARY KEY (`categoria_id`,`produto_id`);

--
-- Índices de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `admin` (`adm`) USING BTREE;

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_categoria`
--
ALTER TABLE `tb_categoria`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `tb_compra`
--
ALTER TABLE `tb_compra`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tb_compra`
--
ALTER TABLE `tb_compra`
  ADD CONSTRAINT `fk_compra_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id`);

--
-- Restrições para tabelas `tb_compra_produto`
--
ALTER TABLE `tb_compra_produto`
  ADD CONSTRAINT `fk_compraproduto_compra` FOREIGN KEY (`compra_id`) REFERENCES `tb_compra` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
