//create buttons
    //new title needs to be pushed to array and button needs to be created from it

//when button is clicked, show all gifs pertaining to that button




var topics = ['The Office','Silicon Valley','Bob\'s Burgers','Rick and Morty'];
var title;
var queryURL;
// var clearBtnList = false;


$(document).ready(function(){


    function retrieveGif(){
        $('button').on('click', function(event){
            $('.gif-container').empty()
            console.log(event);
            var btnClicked = event.currentTarget.innerText
            if(btnClicked){
                btnClicked = btnClicked.replace(/ /g, '+'); //replaces the space with a + for the api search
                title = btnClicked;
                queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        title+ "&rating=pg&api_key=3fcca21e51fa4757b14794a0e52c4059&limit=10";
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
            // clearBtnList = true;
            buttonBuild()
            retrieveGif()
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

    //creates the gifs and gives them the appropriate attributes and classes
    function gifBuild(r){
       
        for(var i=0; i<r.data.length; i++){
            var gifContainer = $('.gif-container');
            var gifHolder = $('<div class="gif-holder">');
            var gifRating = $('<p>');
            var gifImg = $('<img class="gif-img"></div>');
            
            gifContainer.append(gifHolder);
            gifHolder.append(gifRating);
            gifRating.text('Rated: '+r.data[i].rating);
            gifHolder.append(gifImg);
            gifHolder.append('</div>');
            gifImg.attr('src', r.data[i].images.fixed_height_still.url)
            gifImg.attr('data-still',r.data[i].images.fixed_height_still.url);
            gifImg.attr('data-animate', r.data[i].images.fixed_height.url);
            gifImg.attr('data-state', 'still')
        }            
    }


    //builds the buttons at the top of the screen
    function buttonBuild(){
        //clears the buttons and then appends the new button. otherwise it would duplicate buttons
        $('.topic-buttons').empty();
       
        for(var i=0; i<topics.length; i++){
            var topicButtons = $('.topic-buttons');
            var topicButtonGen = $('<button>');
            topicButtonGen.addClass('btn btn-primary btn-sm topic-btn')
            topicButtonGen.attr('data-title',topics[i])
            topicButtonGen.text(topics[i])
            topicButtons.append(topicButtonGen)
            console.log(topics)
        }
    }

    //this function starts and stops the gifs
    function startStop(){
        $("body").on('click', '.gif-img', function(event){
            var gifImg = $(this);
            var gifState = gifImg.attr('data-state');
            var gifAnimate = gifImg.attr('data-animate');
            var gifStill = gifImg.attr('data-still');  
            if(gifState === 'still'){
                gifImg.attr('src',gifAnimate);
                gifImg.attr('data-state', 'animate');
            } else {
                gifImg.attr('src', gifStill);
                gifImg.attr('data-state', 'still')
            }
        }) 

    }

    function main(){
        startStop();
        addItem();
        buttonBuild();
        retrieveGif();
    }
    main()


    //class example
    // the 2nd parameter is another check on the body talking about on clicks on the body
    // $("body").on('click', '.gif', function(event)){

    // }
});