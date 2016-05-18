<html>
   <head>
      <link rel='stylesheet' type='text/css' media='screen' href='/css/style.css' />
      <script src='/js/jquery-2.0.0.min.js'></script>
      <script src='/js/main.js'></script>
   </head>

   <body>
      <div id='top'>
      </div>

      <div id='content'>
         <div>
            <span>Author: </span><input type='text' id='new-post-author' />
            <span>Title: </span><input type='text' id='new-post-title' />
            <br />
            <span>Content: </span><textarea id='new-post-content'></textarea>
            <button onclick='post();'>Post!</button>
         </div>

         <hr />

         <div id='posts-area'>
         </div>
      </div>

      <div id='bottom'>
      </div>
   </body>
</html>
