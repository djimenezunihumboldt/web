$(document).ready(function() {
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { // Adjust scroll threshold as needed
            $('#main-header').addClass('scrolled');
        } else {
            $('#main-header').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('a.nav-link[href^="#"]').on('click', function(event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - $('#main-navbar').outerHeight() // Adjust for fixed header
            }, 1000);
        }
    });

    // Play video in Reviews section
    $('.play-button').on('click', function() {
        var videoContainer = $(this).siblings('.video-placeholder');
        var videoIframe = videoContainer.find('iframe');
        // IMPORTANTE: Reemplaza 'dQw4w9WgXcQ' con el ID real de tu video de YouTube.
        // Puedes encontrar el ID en la URL del video de YouTube, por ejemplo:
        // https://www.youtube.com/watch?v=dQw4w9WgXcQ -> ID es dQw4w9WgXcQ
        var videoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&showinfo=0"; 
        videoIframe.attr('src', videoSrc);
        $(this).hide(); // Hide play button
        videoContainer.show(); // Show video iframe
    });

    // Ciclo video/imagen HERO
    const heroVideo = document.getElementById('hero-video');
    const heroImage = document.getElementById('hero-image');
    let heroCycleTimeout = null;
    function showHeroImageThenVideo() {
        heroVideo.style.display = 'none';
        heroImage.style.display = 'block';
        heroCycleTimeout = setTimeout(() => {
            heroImage.style.display = 'none';
            heroVideo.currentTime = 0;
            heroVideo.style.display = 'block';
            heroVideo.play();
        }, 5000);
    }
    if (heroVideo && heroImage) {
        heroVideo.addEventListener('ended', showHeroImageThenVideo);
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.play();
        });
    }
    window.addEventListener('beforeunload', function() {
        if (heroCycleTimeout) clearTimeout(heroCycleTimeout);
    });

    // Video de opinión en reviews
    $('.play-review-video').on('click', function() {
        var videoContainer = $(this).siblings('.review-video-container');
        var video = videoContainer.find('video')[0];
        $(this).hide();
        videoContainer.show();
        video.currentTime = 0;
        video.play();
    });

    // Carousel for Team section (adjust for mobile view)
    $('#teamCarousel').carousel({
        interval: false // Disable auto-play
    });

    // Handle carousel for mobile view (1 item) vs PC view (4 items)
    function adjustTeamCarousel() {
        if ($(window).width() <= 768) {
            // For mobile, ensure only one item is visible
            $('.team-card-wrapper').each(function(index) {
                if (index > 0) {
                    $(this).hide();
                } else {
                    $(this).show(); // Ensure the first one is shown
                }
            });
            // Show only the active carousel item for mobile
            $('#teamCarousel .carousel-item').removeClass('active');
            $('#teamCarousel .carousel-item:first-child').addClass('active');

        } else {
            // For PC, show all 4 items
            $('.team-card-wrapper').show();
        }
    }

    // Call on load and resize
    adjustTeamCarousel();
    $(window).on('resize', adjustTeamCarousel);

    // Initial load state for header
    if ($(window).scrollTop() > 50) {
        $('#main-header').addClass('scrolled');
    }
});