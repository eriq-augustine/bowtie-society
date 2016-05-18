function getPost() {
   $.ajax({
      url: 'api/post',
      dataType: 'json',
      data: {id: window.postNumber},
      error: function(jqXHR, textStatus, errorThrown) {
         console.log("Error getting post #" + window.postNumber);
      },
      success: function(post, textStatus, jqXHR) {
         console.log(post);

         $('#post-area').html(formatPost(post));
         $('#comment-area').html(formatComments(post.comments));
      }
   });
}

function formatComments(comments) {
   var rtn = "<div class='comments'>";
   var id = 0;

   comments.forEach(function(comment) {
      rtn += formatComment(comment, 1, id++);
   }, this);

   return rtn + "</div>";
}

function formatComment(comment, indentLevel, id) {
   var rtn = "<div id='comment-" + id + "' class='comment' style='margin-left: " + (indentLevel * 20) + "px;'>";

   var date = new Date(0);
   date.setUTCSeconds(comment.time.sec);

   rtn += "<div class='comment-content'>" + comment.content + "</div>";
   rtn += "<div class='comment-author'>" + comment.author + "</div>";
   rtn += "<div class='comment-time'>" + date + "</div>";
   rtn += "<div class='comment-comment-area'>" +
           "<p>Make a comment:</p>" +
           "<span>Author: </span><input id='comment-" + id + "-comment-author' type='text' />" +
           "<span>Content: </span><textarea id='comment-" + id + "-comment-content' type='text'></textarea>" +
           "<button onclick='comment(\"" + id + "\");'>Comment</button>" +
          "<hr />" +
          "</div>";

   rtn += "<div class='comment-kids'>";

   var kidId = 0;
   comment.comments.forEach(function(kid) {
      rtn += formatComment(kid, indentLevel + 1, id + '.comments.' + kidId++);
   }, this);
   rtn += "</div>";

   return rtn + "</div>";
}

function comment(commentNumber) {
   var author = $('#comment-' + commentNumber + '-comment-author').val();
   var content = $('#comment-' + commentNumber + '-comment-content').val();

   $.ajax({
      url: 'api/comment',
      type: 'GET',
      data: {author: author, post: window.postNumber, 'parent': commentNumber, content: content},
      error: function(jqXHR, textStatus, errorThrown) {
         console.log("Error making comment.");
      },
      success: function(data) {
         window.location.href = 'post?id=' + window.postNumber;
      }
   });
}

function formatPost(post) {
   var date = new Date(0);
   date.setUTCSeconds(post.time.sec);

   return "<div class='post'>" +
           "<div class='post-title'>" + post.title + "</div>" +
           "<div class='post-author'>" + post.author + "</div>" +
           "<div class='post-time'>" + date + "</div>" +
           "<div class='post-content'>" + post.content + "</div>" +
           "<div class='comment-comment-area'>" +
            "<p>Make a comment:</p>" +
            "<span>Author: </span><input id='comment--1-comment-author' type='text' />" +
            "<span>Content: </span><textarea id='comment--1-comment-content' type='text'></textarea>" +
            "<button onclick='comment(\"-1\");'>Comment</button>" +
           "<hr />" +
           "</div>" +
          "</div>";
}

document.addEventListener('DOMContentLoaded', function () {
   getPost();
});
