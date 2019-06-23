$(document).ready(function () {

    // init wow
    new WOW().init();

    // fit overlay height to be equal document height
    $('.overlay').css({
		height: $(document).innerHeight()
	});

    // fade out overlay and loader
	$(window).on('load', function () {
        $('.loader').fadeOut();
        $('.overlay').delay(300).fadeOut('slow')
    });

    // toggle navbar background when page scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100){
            $('.navigation').addClass('no_bg');
        } else {
            $('.navigation').removeClass('no_bg');
        }
    });

    // animate html, body when click on navbar links
    $('.navbar-nav > li > a, .carousel-caption a').on('click', function(e){
        var link = $(this);
        link.addClass('active');
            // .parents().siblings('li').children('a').removeClass('active');
        $('html, body').stop().animate({
            scrollTop: $(link.attr('href')).offset().top - $('.navigation').height() - 50
        }, 1500);

        e.preventDefault();
    });

    // init counter
    $('.counter').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.counter_num').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });

    // init owl carousal for team
    $('.owl-carousel.team_carousel').owlCarousel({
        items:3,
        loop:true,
        dots: true,
        dotsSpeed: 1000,
    });

    // init owl carousal for client
    $('.owl-carousel.client_carousel').owlCarousel({
        items:5,
        autoplay: true,
        autoplaySpeed: 400,
        rewind: true,
        dots: false,
    });

    // init owl carousal for client
    $('.owl-carousel.process_carousel').owlCarousel({
        items:1,
        autoplay: false,
        autoplaySpeed: 400,
        navSpeed:500,
        mouseDrag: false,
        rewind: true,
        nav: true,
        dots: false,
    });

    // toggle show description when mouse over it and made pic effect
    $('.team .description').hover(function () {
        $(this).toggleClass('opacity').prev().toggleClass('img_effect');
        $(this).children().toggleClass('translate')
    });

    // init parallax
    var parallax = $('.parallax-window');
    parallax.parallax({imageSrc: 'img/process-bg.jpg'});

    // fire mixitup shuffle
    mixitup('.work_inner');

    // fire pop up slider
    var magnifPopup = function () {
        $('.work-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function (openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    };
    // Call the functions
    magnifPopup();

    // add class active to shuffle span
    $('.work_list span').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // toggle some classes when mouse over
    $('.work .item').hover(function () {
       $(this).children('a').children('img').toggleClass('work_img_effect')
       $(this).children('a').children('.description').toggleClass('work_description_effect')
       $(this).children('a').children('.description').children('p').toggleClass('work_description_p_effect')
    });

    // stop testimonials carousal
    $('.testimonial_carousel').carousel({
        interval: false
    });

    var processCarousel = $('.process_carousel');
    processCarousel.carousel({
        interval: 5000
    });

    //init google map
    // function initialize() {
    //     var mapOptions = {
    //         zoom: 15,
    //         scrollwheel: false,
    //         center: new google.maps.LatLng(23.810332, 90.41251809999994)
    //     };
    //     var map = new google.maps.Map(document.getElementById('map'),
    //         mapOptions);
    //     var marker = new google.maps.Marker({
    //         position: map.getCenter(),
    //         icon: 'assets/img/map_pin.png',
    //         map: map
    //     });
    // }
    // google.maps.event.addDomListener(window, 'load', initialize);

    // toggle footer social media links classes
    $('.footer .social a').hover(function () {
        $(this).toggleClass($(this).data('class'))
    });

    // Cache selectors
    var topMenu = $(".navbar-nav li"),
        topMenuHeight = $('.navigation').outerHeight()+100,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop){
                return this;
            }
        });

        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        // Set/remove active class
        menuItems.removeClass("active");
        $("[href='#"+id+"']").addClass('active');

    });

    processCarousel.css({
        top: ($('.process').height() - processCarousel.height()) / 2
    });

    processCarousel.hover(function () {
        $('.process_carousel .carousel-control-prev').toggleClass('control_prev_effect');
        $('.process_carousel .carousel-control-next').toggleClass('control_next_effect');
    })

});