$(document).ready(function() {

    $('#new-blog-button').attr('disabled', true)
    
    $('#input-text').keyup(function() {
        if($('#input-text').val().length != 0) {
            $('#new-blog-button').attr('disabled', false)
        }
    });
    
    $('#list-category').click(function() {
        $('#dropdown-btn').innerHTML($('#list-category').innerHTML());
    });


    $('#new-blog-button').click(function() {
    console.log('starting POST');
    var blogPost = $('#input-text').val();
    var blogTitle = $('#enter-title').val();
    var blogCategory = $('#dropdown-btn').text();
    console.log($('#enter-title').val());
    console.log($('#dropdown-btn').val());   
    var blogObj = {
        category: blogCategory,
        title: blogTitle,
        post: blogPost,
        user: 'gperanich'
    };

    if (blogPost != undefined) {
        
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/api/blogposts',
            contentType: 'application/json',
            data: JSON.stringify(blogObj)
        }).then(function() {
            console.log('finished POST');

            // send post to main blogs page
        }).then(function() {
            $('#input-text').val('');
            $('#enter-title').val('');
        }).then(function() {
            $('#new-blog-button').attr('disabled', true);
        });
            
        
        console.log('Posting the blog');
        }
    });





});