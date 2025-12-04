$(document).ready(function() {
    // Header scroll effect - cambia color del top-header y navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#main-header').addClass('scrolled');
            $('.top-header').addClass('scrolled');
        } else {
            $('#main-header').removeClass('scrolled');
            $('.top-header').removeClass('scrolled');
        }
    });

    // Smooth scrolling for ALL anchor links (header, footer, etc.)
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            var headerHeight = $('#main-header').outerHeight() || 120;
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 800);
            // Cerrar menú móvil después de hacer click
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-collapse').removeClass('show');
            }
        }
    });

    // Video del hero en loop
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.loop = true;
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.play();
        });
    }

    // Reviews carousel functionality
    var currentReview = 0;
    var reviews = [
        { name: 'JEFF FRESHMAN', text: 'FOR US IT IS VERY IMPORTANT TO KNOW THE OPINIONS OF OUR CLIENTS' },
        { name: 'MARIA GONZALEZ', text: 'EXCELLENT UNIVERSITY WITH THE BEST TEACHERS AND PROGRAMS' },
        { name: 'CARLOS RODRIGUEZ', text: 'I LEARNED SO MUCH AND GOT THE BEST EDUCATION HERE' },
        { name: 'LAURA MARTINEZ', text: 'THE EXPERIENCE WAS AMAZING, HIGHLY RECOMMENDED' }
    ];

    function updateReview(index) {
        $('.review-name-button').text(reviews[index].name);
        $('#reviews .card-title').text(reviews[index].text);
        $('.dots .dot').removeClass('active');
        $('.dots .dot').eq(index).addClass('active');
    }

    // Click en dots para cambiar review
    $('.dots .dot').on('click', function() {
        currentReview = $(this).index();
        updateReview(currentReview);
    });

    // Auto-rotate reviews cada 5 segundos
    setInterval(function() {
        currentReview = (currentReview + 1) % reviews.length;
        updateReview(currentReview);
    }, 5000);

    // Video de opinión en reviews
    $('.play-review-video').on('click', function() {
        var videoContainer = $(this).siblings('.review-video-container');
        var video = videoContainer.find('video')[0];
        $(this).hide();
        videoContainer.show();
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    });

    // Team Carousel - configuración mejorada
    var teamCurrentSlide = 0;
    var totalTeamMembers = $('.team-card-wrapper').length;

    function isMobile() {
        return $(window).width() <= 768;
    }

    function updateTeamCarousel() {
        if (isMobile()) {
            // En móvil, mostrar uno a la vez con transición
            $('.team-card-wrapper').hide();
            $('.team-card-wrapper').eq(teamCurrentSlide).fadeIn(300);
        } else {
            // En desktop, mostrar todos
            $('.team-card-wrapper').show();
        }
    }

    // Controles del carrusel de team
    $('#teamCarousel .carousel-control-prev').on('click', function(e) {
        e.preventDefault();
        if (isMobile()) {
            teamCurrentSlide = (teamCurrentSlide - 1 + totalTeamMembers) % totalTeamMembers;
            updateTeamCarousel();
        }
    });

    $('#teamCarousel .carousel-control-next').on('click', function(e) {
        e.preventDefault();
        if (isMobile()) {
            teamCurrentSlide = (teamCurrentSlide + 1) % totalTeamMembers;
            updateTeamCarousel();
        }
    });

    // Auto-rotate team carousel en móvil cada 4 segundos
    setInterval(function() {
        if (isMobile()) {
            teamCurrentSlide = (teamCurrentSlide + 1) % totalTeamMembers;
            updateTeamCarousel();
        }
    }, 4000);

    // Inicializar carrusel de team
    updateTeamCarousel();
    $(window).on('resize', function() {
        updateTeamCarousel();
    });

    // Initial load state for header
    if ($(window).scrollTop() > 50) {
        $('#main-header').addClass('scrolled');
        $('.top-header').addClass('scrolled');
    }
});