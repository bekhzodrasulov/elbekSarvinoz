document.addEventListener('DOMContentLoaded', () => {

    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ (ФЭЙД-ИН С ЭФФЕКТОМ ПРИ СКРОЛЛЕ)
    const fadeBlocks = document.querySelectorAll('.fade-in');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Отключаем слежку после появления
            }
        });
    }, {
        threshold: 0.1, // Блок начнет появляться при пересечении экрана на 10%
        rootMargin: "0px 0px -50px 0px"
    });

    fadeBlocks.forEach(block => {
        scrollObserver.observe(block);
    });

    // 2. ОБРАБОТКА И СБОР ДАННЫХ АНКЕТЫ (RSVP FORM)
    const rsvpForm = document.getElementById('wedding-rsvp-form');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Собираем данные формы в объект
            const formData = new FormData(rsvpForm);

            const guestNames = formData.get('guest_names');
            const attendance = formData.get('attendance') === 'yes' ? 'Придёт' : 'Не сможет прийти';

            // Собираем все выбранные чекбоксы напитков
            const selectedDrinks = [];
            formData.getAll('drinks').forEach(drink => {
                selectedDrinks.push(drink);
            });
            const drinksComment = formData.get('drinks_comment');

            // Симуляция успешной отправки
            console.log('Данные гостя:', { guestNames, attendance, selectedDrinks, drinksComment });

            alert(`Спасибо, ${guestNames}! Ваша анкета успешно отправлена.`);
            rsvpForm.reset();
        });
    }
});