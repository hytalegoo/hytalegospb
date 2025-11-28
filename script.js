// Первый таймер: до старта предзаказа
const preorderDate = new Date('December 13, 2025 00:00:00 GMT+3');
const preorderDaysElement = document.getElementById('preorder-days');
const preorderHoursElement = document.getElementById('preorder-hours');
const preorderMinutesElement = document.getElementById('preorder-minutes');
const preorderSecondsElement = document.getElementById('preorder-seconds');

// Второй таймер: до выхода игры
const releaseDate = new Date('January 13, 2026 00:00:00 GMT+3');
const releaseDaysElement = document.getElementById('release-days');
const releaseHoursElement = document.getElementById('release-hours');
const releaseMinutesElement = document.getElementById('release-minutes');
const releaseSecondsElement = document.getElementById('release-seconds');

function updatePreorderTimer() {
    const now = new Date();
    const timeDifference = preorderDate - now;
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Синхронизированная анимация: добавить flip ко всем span
        preorderDaysElement.classList.add('flip');
        preorderHoursElement.classList.add('flip');
        preorderMinutesElement.classList.add('flip');
        preorderSecondsElement.classList.add('flip');

        // Обновить текст в середине анимации (250ms)
        setTimeout(() => {
            preorderDaysElement.textContent = days;
            preorderHoursElement.textContent = hours;
            preorderMinutesElement.textContent = minutes;
            preorderSecondsElement.textContent = seconds;
        }, 250);

        // Убрать класс через 500ms
        setTimeout(() => {
            preorderDaysElement.classList.remove('flip');
            preorderHoursElement.classList.remove('flip');
            preorderMinutesElement.classList.remove('flip');
            preorderSecondsElement.classList.remove('flip');
        }, 500);
    } else {
        preorderDaysElement.textContent = '0';
        preorderHoursElement.textContent = '0';
        preorderMinutesElement.textContent = '0';
        preorderSecondsElement.textContent = '0';
        document.getElementById('preorder-timer').innerHTML = '<span class="final-msg">Предзаказ стартовал!</span>';
        document.querySelector('.final-msg').style.animation = 'celebrate 2s infinite';
    }
}

function updateReleaseTimer() {
    const now = new Date();
    const timeDifference = releaseDate - now;
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Синхронизированная анимация: добавить flip ко всем span
        releaseDaysElement.classList.add('flip');
        releaseHoursElement.classList.add('flip');
        releaseMinutesElement.classList.add('flip');
        releaseSecondsElement.classList.add('flip');

        // Обновить текст в середине анимации (250ms)
        setTimeout(() => {
            releaseDaysElement.textContent = days;
            releaseHoursElement.textContent = hours;
            releaseMinutesElement.textContent = minutes;
            releaseSecondsElement.textContent = seconds;
        }, 250);

        // Убрать класс через 500ms
        setTimeout(() => {
            releaseDaysElement.classList.remove('flip');
            releaseHoursElement.classList.remove('flip');
            releaseMinutesElement.classList.remove('flip');
            releaseSecondsElement.classList.remove('flip');
        }, 500);
    } else {
        releaseDaysElement.textContent = '0';
        releaseHoursElement.textContent = '0';
        releaseMinutesElement.textContent = '0';
        releaseSecondsElement.textContent = '0';
        document.getElementById('release-timer').innerHTML = '<span class="final-msg">Игра вышла!</span>';
        document.querySelector('.final-msg').style.animation = 'celebrate 2s infinite';
    }
}

setInterval(updatePreorderTimer, 1000);
setInterval(updateReleaseTimer, 1000);
updatePreorderTimer(); // Initial call
updateReleaseTimer(); // Initial call





// Обработка вкладок
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.getElementById(tab).classList.add('active');
    });
});

// Обработка вкладок в info секции
const infoTabButtons = document.querySelectorAll('.info-tab-btn');
const infoTabPanes = document.querySelectorAll('.info-tab-pane');

infoTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        infoTabButtons.forEach(b => b.classList.remove('active'));
        infoTabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.infoTab;
        document.getElementById(tab).classList.add('active');
    });
});

// Обработка форм
const osSelect = document.getElementById('os-select');
const archSelect = document.getElementById('arch-select');
const downloadDirectBtn = document.getElementById('download-direct-btn');
const downloadLauncherBtn = document.getElementById('download-launcher-btn');

// Функция обновления доступности разрядности
function updateArch() {
    // Сброс
    archSelect.innerHTML = '<option value="" disabled selected>Выберите</option>';

    if (osSelect.value) {
        archSelect.disabled = false;
        // Добавляем опции в зависимости от ОС
        if (osSelect.value === 'windows') {
            archSelect.add(new Option('32-bit', '32'));
            archSelect.add(new Option('64-bit', '64'));
        } else if (osSelect.value === 'mac') {
            archSelect.add(new Option('64-bit', '64'));
        } else if (osSelect.value === 'linux') {
            archSelect.add(new Option('64-bit', '64'));
        }
    } else {
        archSelect.disabled = true;
        archSelect.value = '';
    }
}

// Функция проверки для direct
function checkDirect() {
    if (osSelect.value && archSelect.value) {
        downloadDirectBtn.disabled = false;
    } else {
        downloadDirectBtn.disabled = true;
    }
}

// Слушатели для direct
osSelect.addEventListener('change', updateArch);
osSelect.addEventListener('change', checkDirect);
archSelect.addEventListener('change', checkDirect);

// Инициализация
updateArch();
checkDirect();

// Обработчики для скачивания
downloadLauncherBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Файл лаунчера скачивается...');
});

document.getElementById('direct-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Файл игры скачивается...');
});

// Modal для скриншотов
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementsByClassName('close')[0];

document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.dataset.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Кнопка "Узнать больше" - прокрутка к описанию
document.querySelector('.cta').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Карточка модинг - переключение на вкладку модинг
document.querySelector('.modding-special').addEventListener('click', () => {
    infoTabButtons.forEach(b => b.classList.remove('active'));
    infoTabPanes.forEach(p => p.classList.remove('active'));
    document.querySelector('[data-info-tab="modding"]').classList.add('active');
    document.getElementById('modding').classList.add('active');
    // Анимация переключения
    document.querySelector('.modding-special').classList.add('animate');
    setTimeout(() => {
        document.querySelector('.modding-special').classList.remove('animate');
    }, 500);
});

// Popup при движении мыши к выходу со страницы
let popupShown = false;
const popup = document.getElementById('discord-popup');

document.addEventListener('mouseleave', () => {
    if (popupShown) return;
    document.getElementById('discord-popup').style.display = 'block';
    popupShown = true;
});

// Функция закрытия popup с анимацией
function closePopup() {
    popup.classList.add('closing');
    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.remove('closing');
    }, 600);
}

// Закрытие popup при клике на фон или кнопку закрытия
document.getElementById('discord-popup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('discord-popup')) {
        closePopup();
    }
});

document.querySelector('.popup-close').addEventListener('click', closePopup);
