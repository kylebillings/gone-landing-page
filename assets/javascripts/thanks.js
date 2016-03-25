var gone = (function ($) {

    var init = function(){
        $('#btn-facebook').on('click', onFacebookShare);
        // $('#btn-twitter').on('click', onTwitterShare);

        var twitterText = 'Get back to zero with Gone! Visit www.thegoneapp.com and subscribe to the newsletter to find out more.';
        twitterText = encodeURIComponent(twitterText);
        var twitterReferer = 'http://www.thegoneapp.com';
        twitterReferer = encodeURIComponent(twitterReferer);

        var twitterHref = 'https://twitter.com/intent/tweet?original_referer=';
        twitterHref += twitterReferer;
        twitterHref += 'source=tweetbutton&text=';
        twitterHref += twitterText;

        console.log(twitterHref);
        $('#btn-twitter').attr('href', twitterHref);

    };

    var onFacebookShare = function () {
        var facebookShareData = {
            method: 'feed',
            link: 'http://thegoneapp.com/',
            picture: 'http://thegoneapp.com/gone.png',
            name: 'Get back to zero with Gone!',
            caption: 'Visit www.thegoneapp.com, subscribe to the newsletter and find out more.',
            description: '',
            redirect_uri: 'http://thegoneapp.com'
        };

        FB.ui(facebookShareData, onFacebookShareResponse);
    };

    var onFacebookShareResponse = function(){

    };

    var onTwitterShare = function () {

    };


    $(document).ready(init);

});