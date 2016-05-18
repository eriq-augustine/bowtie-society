<?php
   header('Content-type: application/json');

   require_once('../db.php');

   $rtn = getPosts($_GET['num']);

   if (count($rtn) == 0) {
      echo "[]";
   } else {
      echo json_encode($rtn);
   }
?>
