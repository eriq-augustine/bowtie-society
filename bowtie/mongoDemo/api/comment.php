<?php
   header('Content-type: application/json');

   require_once('../db.php');

   comment($_GET['post'], $_GET['parent'], $_GET['author'], $_GET['content']);

   echo '[]';
?>
