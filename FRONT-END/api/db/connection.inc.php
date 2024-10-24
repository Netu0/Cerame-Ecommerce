<?php
$servername = 'localhost';
$port = 3306;
$username = 'root';
$password = '';
$dbname = 'db_api_projeto1';

$pdo = new PDO("mysql:host=$servername;dbname=$dbname",$username, $password);
?>