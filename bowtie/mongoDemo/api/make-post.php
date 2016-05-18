<?php
   header('Content-type: application/json');

   require_once('../db.php');

   $rtn = makePost($_GET['author'], $_GET['title'], $_GET['content']);

   echo json_encode($rtn);
?>
