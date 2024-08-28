// Вибирає всі слайди з класом 'reviews-slide'
const reviewsSlides = document.querySelectorAll('.reviews-slide');
// Вибирає кнопку для переходу до попереднього слайду
const reviewsPrevBtn = document.querySelector('.reviews-prev-btn');
// Вибирає кнопку для переходу до наступного слайду
const reviewsNextBtn = document.querySelector('.reviews-next-btn');
// Вибирає елемент для відображення номера поточного слайду
const reviewsCounter = document.querySelector('.reviews-counter');
// Ініціалізує змінну для відстеження поточного індексу слайду
let reviewsCurrentIndex = 0;

// Функція для оновлення слайдера
function updateReviewsSlider() {
    // Отримує ширину одного слайду
    const reviewsSlideWidth = reviewsSlides[0].clientWidth;
    // Переміщує слайдер, щоб показати поточний слайд
    document.querySelector('.reviews-slider').style.transform = `translateX(-${reviewsCurrentIndex * reviewsSlideWidth}px)`;
    // Оновлює лічильник слайдів
    reviewsCounter.textContent = `${reviewsCurrentIndex + 1} / ${reviewsSlides.length}`;
}

// Додає обробник події для кнопки переходу до наступного слайду
reviewsNextBtn.addEventListener('click', () => {
    // Збільшує індекс слайду, переходить до наступного слайду, обчислюючи новий індекс
    reviewsCurrentIndex = (reviewsCurrentIndex + 1) % reviewsSlides.length;
    // Оновлює слайдер
    updateReviewsSlider();
});

// Додає обробник події для кнопки переходу до попереднього слайду
reviewsPrevBtn.addEventListener('click', () => {
    // Зменшує індекс слайду, переходить до попереднього слайду, обчислюючи новий індекс
    reviewsCurrentIndex = (reviewsCurrentIndex - 1 + reviewsSlides.length) % reviewsSlides.length;
    // Оновлює слайдер
    updateReviewsSlider();
});

// Викликає функцію для початкового оновлення слайдера
updateReviewsSlider();
