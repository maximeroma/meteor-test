Template.home.events({
    'submit form': function (e){
        e.preventDefault();

        var author = $("input[name='auteur']").val();
        var title = $("input[name='titre']").val();
        var content = $("input[name='contenu']").val();

        var post = {
            title: title,
            author: author,
            content: content
        }

        Meteor.call("insertPost", post, function (err,id){
            if(err){
                alert(err.reason);
            } else {
                $("form input, form textarea").val("");
            }
        });
    }
})