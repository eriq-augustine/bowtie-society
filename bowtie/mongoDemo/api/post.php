<?php
   header('Content-type: application/json');

   require_once('../db.php');

   $rtn = getPost($_GET['id']);

   echo json_encode($rtn);
?>
