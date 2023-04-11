$(".link").on("mouseenter mouseleave", function() {
    $(".cursor").toggleClass("is--active");
    $(".cursor-marquee").toggleClass("is--active");
    $(".cursor-content").toggleClass("is--active");


});


(function() {
    const cursor = document.querySelector(".cursor");
    const cursorContent = document.querySelector(".cursor-content");
    let prevX = 0;
    let velocity = 0;
    let angle = 0;
    const maxVelocity = 75;

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    gsap.set(cursorContent, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener("pointermove", movecursor);

    function movecursor(e) {
        // Calculate horizontal velocity
        let deltaX = e.clientX - prevX;
        velocity = Math.abs(deltaX);

        // Normalize velocity and calculate angle based on horizontal movement
        let normalizedVelocity = Math.min(1, velocity / maxVelocity);
        angle =
            deltaX > 0 ?
            45 * normalizedVelocity :
            deltaX < 0 ?
            -45 * normalizedVelocity :
            0;

        // Move cursor
        gsap.to(cursor, {
            duration: 0,
            x: e.clientX,
            y: e.clientY,
        });

        // Move cursor content
        gsap.to(cursorContent, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
        });

        // Rotate cursor content
        gsap.to(cursorContent, {
            duration: 0.2,
            rotation: angle,
            ease: "power1.out",
        });

        // Update previous mouse coordinates
        prevX = e.clientX;
    }
})();