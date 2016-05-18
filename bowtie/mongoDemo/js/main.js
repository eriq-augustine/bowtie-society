function getPosts() {
   $.ajax({
      url: 'api/posts',
      dataType: 'json',
      data: {num: 10},
      error: function(jqXHR, textStatus, errorThrown) {
         console.log("Error getting posts");
      },
      success: function(data, textStatus, jqXHR) {
         console.log(data);

         data.forEach(function(post) {
            $('#posts-area').append(formatPost(post));
         });
      }
   });
}

function formatPost(post) {
   return "<div class='post-snippet'>" +
           "<span class='post-title'><a href='/post?id=" + post['_id']['$id'] + "'>" + post.title + "</a></span>" +
           "<span class='post-author'> -- by " + post.author + "</span>" +
          "</div>";
}

function post() {
   var author = $('#new-post-author').val();
   var title = $('#new-post-title').val();
   var content = $('#new-post-content').val();

   $.ajax({
      url: 'api/make-post',
      type: 'GET',
      data: {author: author, title: title, content: content},
      error: function(jqXHR, textStatus, errorThrown) {
         console.log("Error making post.");
      },
      success: function(data) {
         //TEST
         console.log(data);

         window.location.href = 'post?id=' + data;
      }
   });
}

document.addEventListener('DOMContentLoaded', function () {
   getPosts();
});
