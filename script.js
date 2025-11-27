const targetDate = new Date('November 28, 2025 18:00:00 GMT+3');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateTimer() {
    const now = new Date();
    const timeDifference = targetDate - now;
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    } else {
        daysElement.textContent = '';
        hoursElement.textContent = '';
        minutesElement.textContent = '';
        secondsElement.textContent = '';
        // Assuming we hide the timer or show a message, replace the content
        document.getElementById('timer').innerHTML = '<span class="final-msg">Дата выхода игры: 28 ноября 2025</span>';
        document.querySelector('.final-msg').style.animation = 'celebrate 2s infinite';
    }
}

setInterval(updateTimer, 1000);
updateTimer(); // Initial call to set the timer immediately



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
