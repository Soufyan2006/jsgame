<?php include_once 'header.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .slide {
            display: none;
        }
        .slide.active {
            display: block;
        }
    </style>
</head>
<body>
    <section id="slideshow">
        <div class="slideshow-container">
            <div class="slide active">
                <img src="place.png" alt="Project een">
            </div>
            <div class="slide">
                <img src="place1.png" alt="Project twee">
            </div>
            <div class="slide">
                <img src="place2.png" alt="Project drie">
            </div>
        </div>
    </section>

    <script>
        var slides = document.querySelectorAll('.slide');
        var currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 3000);
    </script>

</body>
</html>
<?php include_once 'footer.php'; ?>
