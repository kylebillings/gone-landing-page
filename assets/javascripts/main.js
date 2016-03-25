$(document).ready(function(){
    $('body').css('visibility','visible');
    var input = document.createElement("input");

    if(('placeholder'in input)==false){
        $('[placeholder]').focus(function(){
            var i = $(this);
            if(i.val()==i.attr('placeholder')){
                i.val('').removeClass('placeholder');
                if(i.hasClass('password')){
                    i.removeClass('password');
                    this.type='password';
                }
            }
        }).blur(function(){
            var i = $(this);
            if(i.val()==''||i.val()==i.attr('placeholder')){
                if(this.type=='password'){
                    i.addClass('password');
                    this.type='text';
                }
                i.addClass('placeholder').val(i.attr('placeholder'));
            }
        }).blur().parents('form').submit(function(){
            $(this).find('[placeholder]').each(function(){
                var i = $(this);
                if(i.val()==i.attr('placeholder'))
                    i.val('');
            })
        });
    }

    var firstSection = 0;
    var lastSection = 7;
    var currentSection = 0;
    var scrollingBeHappening = false;
    var displayingVideo = false;
    var windowHeight = $(window).height();
    $('.show-video').click(function() {
        displayingVideo = true;
    });
    $('.button-close').click(function() {
        displayingVideo = false;
    });
    $('.scroll-down').click(function() {
        animatedScrollTo("#content-container-1");
        currentSection = 1;
    });
    $('body').bind('keydown', function(e) {
        if ((e.keyCode == '38') || (e.keyCode == '32') || (e.keyCode == '40')) {
            e.preventDefault();
        }
        // if ESC and video is playing
        if (e.keyCode == '27' && !$('#video-overlay').hasClass('hidden')){
            stopVideo();
        }
    });
    $('body').bind('wheel DOMMouseScroll mousewheel keyup', function(e) {
        if (scrollingBeHappening === false && displayingVideo === false) {
            if (e.type == 'mousewheel') {
                if (e.originalEvent.wheelDelta >= 0) {
                    currentSection = (currentSection - 1) >= firstSection ? currentSection - 1 : currentSection;
                    scrollDirection = 'down';
                }
                else {
                    currentSection = (currentSection + 1) <= lastSection ? currentSection + 1 : currentSection;
                    scrollDirection = 'up';
                }
                scrollingBeHappening = true;
            }
            else if (e.type == 'DOMMouseScroll') {
                if (e.originalEvent.detail >= 0) {
                    currentSection = (currentSection - 1) >= firstSection ? currentSection - 1 : currentSection;
                    scrollDirection = 'down';
                }
                else {
                    currentSection = (currentSection + 1) <= lastSection ? currentSection + 1 : currentSection;
                    scrollDirection = 'up';
                }
                scrollingBeHappening = true;
            }
            else if (e.type == 'wheel') {
                if (e.originalEvent.deltaY <= 0) {
                    currentSection = (currentSection - 1) >= firstSection ? currentSection - 1 : currentSection;
                    scrollDirection = 'up';
                }
                else {
                    currentSection = (currentSection + 1) <= lastSection ? currentSection + 1 : currentSection;
                    scrollDirection = 'down';
                }
                scrollingBeHappening = true;
            }
            else if (e.type == 'keyup') {
                if (e.keyCode == '38') {
                    currentSection = (currentSection - 1) >= firstSection ? currentSection - 1 : currentSection;
                    scrollDirection = 'up';
                }
                else if (e.keyCode == '40' || e.keyCode == '32') {
                    currentSection = (currentSection + 1) <= lastSection ? currentSection + 1 : currentSection;
                    scrollDirection = 'down';
                }
            }
            $('html, body').animate({scrollTop: $("#content-container-" + currentSection).offset().top}, 1000, function() {
                setTimeout(function() {
                    scrollingBeHappening = false;
                }, 500)
            });
            return false;
        } else if (e.type == 'keyup' && e.keyCode == 27) {
            displayingVideo = false;
        } else {
            return false;
        }
        ;
    });
    function animatedScrollTo(id) {
        $('html, body').animate({scrollTop: $(id).offset().top}, 1000);
    }
    // $('.sign-up-button').click(function() {
    //     animatedScrollTo("#content-container-0");
    //     currentSection = 0;
    // });
    $('#tracker-node-0').click(function() {
        animatedScrollTo("#content-container-0");
        currentSection = 0;
    });
    $('#tracker-node-1').click(function() {
        animatedScrollTo("#content-container-1");
        currentSection = 1;
    });
    $('#tracker-node-2').click(function() {
        animatedScrollTo("#content-container-2");
        currentSection = 2;
    });
    $('#tracker-node-3').click(function() {
        animatedScrollTo("#content-container-3");
        currentSection = 3;
    });
    $('#tracker-node-4').click(function() {
        animatedScrollTo("#content-container-4");
        currentSection = 4;
    });
    // $('#tracker-node-5').click(function() {
    //     animatedScrollTo("#content-container-5");
    //     currentSection = 5;
    // });
    // $('#tracker-node-6').click(function() {
    //     animatedScrollTo("#content-container-6");
    //     currentSection = 6;
    // });
    $('#tracker-node-5').click(function() {
        animatedScrollTo("#content-container-5");
        currentSection = 5;
    });
    $('#tracker-node-6').click(function() {
        animatedScrollTo("#content-container-6");
        currentSection = 6;
    });
    $('#tracker-node-7').click(function() {
        animatedScrollTo("#content-container-7");
        currentSection = 7;
    });

    $(window).resize(function() {
        windowHeight = $(window).height();
        $('.content-container').height(windowHeight);
        $(window).scrollTop($("#content-container-" + currentSection).offset().top);
    });

    $('.thumbnail-overlay').on('click', playVideo);
    $('#video-overlay').on('click', stopVideo);

    function playVideo(){
        var $videoOverlay = $('#video-overlay');
        createYoutubeContainer();
        displayingVideo = true;
        $videoOverlay.css('opacity', 0);
        $videoOverlay.removeClass('hidden');
        $('.thumbnail-container').fadeTo(400, 0);
        $videoOverlay.fadeTo(400, 0.7);
    }

    function stopVideo(){
        var $videoOverlay = $('#video-overlay, #gone-video');

        $videoOverlay.fadeTo(400, 0, function(){
            $('#gone-video').remove();
            $videoOverlay.addClass('hidden');
            displayingVideo = false;
            $('.thumbnail-container').fadeTo(300, 1);
        });

    }

    function createYoutubeContainer(){

        var yt = $('<iframe>');
        yt.attr('id', 'gone-video');
        yt.attr('width', '90%');
        yt.attr('height', '90%');
        yt.attr('frameborder', '0');
        yt.attr('allowfullscreen', '0');
        yt.css('margin', 'auto');
        yt.css('left', '5%');
        yt.css('top', '5%');
        yt.css('z-index', '1000');
        yt.css('position', 'absolute');
        yt.attr('src', 'http://www.youtube.com/embed/V1HIVHMoA18?autoplay=1&vq=hd1080&rel=0');

        yt.appendTo($('body').get(0));
    }

});
skrollr.init({forceHeight: false});