$(document).ready(function() {

    function getBlogs() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/api/blogposts',
            contentType: 'application/json'
        }).then(function(success) {
            console.log(success);
            $('.blogs-body').first().empty();
            success.forEach(function(blogs) {
                console.log(blogs);
                
                    var newBlogDiv = document.createElement('div');
                    newBlogDiv.className = 'new-blog';
                    var blogHeader = document.createElement('p');
                    blogHeader.className = 'blog-header';
                    var blogTextPar = document.createElement('p');
                    blogTextPar.className = 'blog-text';
                    var deleteBtn = document.createElement('BUTTON');
                    var deleteText = document.createTextNode('delete');
                    deleteBtn.className = 'delete-btn';
                    var blogText = document.createTextNode(blogs.post);
                    var name = document.createTextNode(blogs.user + ' ');
                    var nameDiv = document.createElement('div');
                    nameDiv.className = 'name-name';
                    var titleDiv = document.createElement('div');
                    var title = document.createTextNode(blogs.title);
                    titleDiv.className = 'title-div';
                    var blogsHere = document.getElementsByClassName('blogs-body')[0];

                    blogTextPar.appendChild(blogText);
                    blogHeader.appendChild(titleDiv);
                    titleDiv.appendChild(title);
                    blogHeader.appendChild(nameDiv);
                    nameDiv.appendChild(name);
                    deleteBtn.appendChild(deleteText);
                    blogHeader.appendChild(deleteBtn);
                    newBlogDiv.appendChild(blogHeader);
                    newBlogDiv.appendChild(blogTextPar);
                    blogsHere.appendChild(newBlogDiv);
                    console.log(newBlogDiv);



                $(deleteBtn).click(function() {
                    console.log('deleting');
                    $.ajax({
                        method: 'DELETE',
                        url: 'http://localhost:3000/api/blogposts/' + blogs.id,
                        contentType: 'application/json'
                    }).then(function() {
                        console.log('finished deleting');
                        getBlogs();
                    });
                });
            });
        });
    };

    getBlogs();





});