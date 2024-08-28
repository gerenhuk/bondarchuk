// Функція ініціалізації слайдера
const initSlider = () => {
    // Вибирає список зображень у слайдері
    const imageList = document.querySelector(".slider-wrapper .image-list");
    // Вибирає кнопки для перемикання слайдів
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    // Вибирає елемент для прокрутки слайдера
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    // Вибирає елемент, що представляє повзунок прокрутки
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

    // Перевіряє, чи існують усі необхідні елементи, щоб уникнути помилок
    if (!imageList || !slideButtons.length || !sliderScrollbar || !scrollbarThumb) {
        console.error("Деякі елементи слайдера відсутні!");
        return;
    }

    // Визначає максимальну позицію прокрутки
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Обробник подій для перетягування повзунка прокрутки
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX; // Початкова позиція миші
        const thumbPosition = scrollbarThumb.offsetLeft; // Початкова позиція повзунка
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth; // Максимальна позиція повзунка

        // Оновлює позицію повзунка на рух миші
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX; // Різниця позицій миші
            const newThumbPosition = thumbPosition + deltaX; // Нова позиція повзунка

            // Забезпечує, що повзунок не виходить за межі
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft; // Визначає нову позицію прокрутки
            
            scrollbarThumb.style.left = `${boundedPosition}px`; // Оновлює позицію повзунка
            imageList.scrollLeft = scrollPosition; // Оновлює прокрутку списку зображень
        }

        // Видаляє обробники подій на відпускання миші
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Додає обробники подій для перетягування
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Обробник подій для кнопок перемикання слайдів
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1; // Визначає напрямок перемикання
            const scrollAmount = imageList.clientWidth * direction; // Визначає кількість прокрутки
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" }); // Прокручує список зображень

            // Перераховує максимальну позицію прокрутки, якщо розмір контейнера змінюється
            const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
            handleSlideButtons(); // Оновлює видимість кнопок
            updateScrollThumbPosition(); // Оновлює позицію повзунка
        });
    });

    // Оновлює видимість кнопок перемикання в залежності від позиції прокрутки
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex"; // Сховати кнопку "Попередній слайд", якщо на першому слайді
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex"; // Сховати кнопку "Наступний слайд", якщо на останньому слайді
    }

    // Оновлює позицію повзунка прокрутки відповідно до позиції прокрутки зображень
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Викликає ці дві функції, коли список зображень прокручується
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Ініціалізує кнопки та повзунок при завантаженні сторінки
    handleSlideButtons();
    updateScrollThumbPosition();
}

// Ініціалізує слайдер після завантаження сторінки
window.addEventListener("load", initSlider);
