<?php include_once 'header.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./src/output.css" rel="stylesheet">
    <title>Focus6</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>


<body>
<div id="default-carousel" class="relative w-full" data-carousel="slide">

    <div class="relative h-[20rem] overflow-hidden md:h-[600px]">
        <div class="duration-700 ease-in-out" data-carousel-item>
            <img src="place.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="eerste image">
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="place1.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="tweedeimage">
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="place2.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="derde image">
        </div>
    </div>

    
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
    </div>

    
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>

    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>

</body>

<script>
    const carouselElement = document.getElementById('default-carousel');

    const items = [
        { position: 0, el: document.querySelectorAll('[data-carousel-item]')[0] },
        { position: 1, el: document.querySelectorAll('[data-carousel-item]')[1] },
        { position: 2, el: document.querySelectorAll('[data-carousel-item]')[2] }
    ];

    let currentPosition = 0;

    const showNextSlide = () => {
        items[currentPosition].el.classList.add('hidden');
        currentPosition = (currentPosition + 1) % items.length;
        items[currentPosition].el.classList.remove('hidden');
    };

    
    const showPrevSlide = () => {
        items[currentPosition].el.classList.add('hidden');
        currentPosition = (currentPosition - 1 + items.length) % items.length;
        items[currentPosition].el.classList.remove('hidden');
    };

    
    document.querySelector('[data-carousel-prev]').addEventListener('click', showPrevSlide);
    document.querySelector('[data-carousel-next]').addEventListener('click', showNextSlide);

    
    setInterval(showNextSlide, 10000);
</script>

<?php include_once 'footer.php'; ?>
