//create buttons
    //new title needs to be pushed to array and button needs to be created from it

//when button is clicked, show all gifs pertaining to that button




var topics = ['Game of Thrones','Silicon Valley','Bob\'s Burgers','Rick and Morty'];
var title;
var queryURL;
var clearBtnList = false;


$(document).ready(function(){


    function retrieveGif(){
        $('button').on('click', function(event){
            console.log(event);
            var btnClicked = event.currentTarget.innerText
            if(btnClicked){
                btnClicked = btnClicked.replace(/ /g, '+');
                title = btnClicked;
                queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        title+ "&api_key=3fcca21e51fa4757b14794a0e52c4059&limit=10";
                ajaxCall()
            }
        });
        
    }

    function addItem(){
        $('#add-item').on('click',function(event){
            event.preventDefault();
            var item = $('#title-input').val().trim();
            console.log(item)
            topics.push(item);
            clearBtnList = true;
            buttonBuild()
        })
    }

    function ajaxCall(){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            var r = response;
            console.log(r)
            gifBuild(r);
        });
    }

    function gifBuild(r){
        for(var i=0; i<r.data.length; i++){
            var gifContainer = $('.gif-container');
            var gifRating = $('<p>');
            var gifImg = $('<img>');
            gifRating.text('Rated: '+r.data[i].rating)
            gifContainer.append(gifRating);
            gifRating.append(gifImg);
            gifImg.attr('src',r.data[i].images.fixed_height.url)
            gifImg.appendTo(gifContainer);

        }
    }

    function buttonBuild(){
        if(clearBtnList){
            $('.topic-buttons').clear();
        }
        for(var i=0; i<topics.length; i++){
            var topicButtons = $('.topic-buttons');
            var topicButtonGen = $('<button>');
            topicButtonGen.addClass('btn btn-primary btn-sm topic-btn')
            topicButtonGen.attr('data-title',topics[i])
            topicButtonGen.text(topics[i])
            topicButtons.append(topicButtonGen)
        }
    }


    addItem()
    buttonBuild()
    retrieveGif()


    //class example
    // the 2nd parameter is another check on the body talking about on clicks on the body
    // $("body").on('click', '.gif', function(event)){

    // }
});