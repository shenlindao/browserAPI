document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelector('.slider__points');
    const container = document.querySelector('.slider__container');
    const prevButton = document.querySelector('.slider__prev');
    const nextButton = document.querySelector('.slider__next');

    const images = [
        'img/image-random-1.jpg',
        'img/image-random-2.jpg',
        'img/image-random-3.jpg',
        'img/image-random-4.jpg',
        'img/image-random-5.jpg',
        'img/image-random-6.jpg',
        'img/image-random-7.jpg',
        'img/image-random-8.jpg',
        'img/image-random-9.jpg',
        'img/image-random-10.jpg',
    ];

    let currentIndex = 0;

    const updateImage = (index) => {
        container.style.backgroundImage = `url(${images[index]})`;

        document.querySelectorAll('.slider__point').forEach((point, i) => {
            if (i === index) {
                point.classList.add('active');
            } else {
                point.classList.remove('active');
            }
        });
    };

    images.forEach((image, index) => {
        const point = document.createElement('div');
        point.className = 'slider__point';
        point.setAttribute('data-img', index);

        point.addEventListener('click', () => {
            currentIndex = index;
            updateImage(currentIndex);
        });

        points.appendChild(point);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        updateImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        updateImage(currentIndex);
    });

    updateImage(currentIndex);
});
