<?php
   function getDb() {
      $mongo = new Mongo("mongodb://localhost/comments");
      return $mongo->comments;
   }

   function getPosts($numPosts = 10) {
      $db = getDb();
      $posts = $db->posts;

      $query = array();
      $fields = array('title' => 1, 'author' => 1);

      $cursor = $posts->find($query, $fields)->limit($numPosts);
      $results = array();

      foreach ($cursor as $post) {
         $results[] = $post;
      }

      return $results;
   }

   function getPost($id) {
      $db = getDb();
      $posts = $db->posts;

      $query = array('_id' => new MongoId($id));

      return $posts->findOne($query);
   }

   function makePost($author, $title, $content) {
      $db = getDb();
      $posts = $db->posts;

      $newPost = array('_id' => new MongoId(),
                       'title' => $title,
                       'author' => $author,
                       'content' => $content,
                       'time' => new MongoDate(),
                       'comments' => array());

      $posts->insert($newPost);

      return $newPost['_id']->{'$id'};
   }

   function comment($postNum, $parentComment, $author, $comment) {
      $db = getDb();
      $posts = $db->posts;

      if ($parentComment === '-1') {
         $parentComment = 'comments';
      } else {
         $parentComment = 'comments.' . $parentComment . '.comments';
      }

      $newComment = array('author' => $author,
                          'content' => $comment,
                          'time' => new MongoDate(),
                          'comments' => array());

      $postQuery = array('_id' => new MongoId($postNum));
      $postUpdate = array('$push' => array($parentComment => $newComment));

      //TEST
      error_log($parentComment);
      error_log($postNum);
      error_log(var_export($postQuery, true));

      $posts->update($postQuery, $postUpdate);
   }
?>
