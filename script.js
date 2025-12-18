// Таймер: до выхода игры
const releaseDate = new Date(2026, 0, 13, 18, 0, 0); // January 13, 2026, 18:00:00
const releaseDaysElement = document.getElementById('release-days');
const releaseHoursElement = document.getElementById('release-hours');
const releaseMinutesElement = document.getElementById('release-minutes');
const releaseSecondsElement = document.getElementById('release-seconds');

function updateReleaseTimer() {
    const now = new Date();
    const timeDifference = releaseDate - now;
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Проверить, какие числа изменились
        const oldDays = parseInt(releaseDaysElement.textContent) || 0;
        const oldHours = parseInt(releaseHoursElement.textContent) || 0;
        const oldMinutes = parseInt(releaseMinutesElement.textContent) || 0;
        const oldSeconds = parseInt(releaseSecondsElement.textContent) || 0;

        // Добавить анимацию только к изменившимся
        if (days !== oldDays) releaseDaysElement.classList.add('flip');
        if (hours !== oldHours) releaseHoursElement.classList.add('flip');
        if (minutes !== oldMinutes) releaseMinutesElement.classList.add('flip');
        if (seconds !== oldSeconds) releaseSecondsElement.classList.add('flip');

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

setInterval(updateReleaseTimer, 1000);
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
    // Проверяем наличие файла
    fetch('/file/l.zip', { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // Файл найден, скачиваем
                window.location.href = '/file/l.zip';
            } else {
                // Файл не найден, перенаправляем на страницу ошибки
                window.location.href = 'error.html';
            }
        })
        .catch(error => {
            // Ошибка запроса, тоже на страницу ошибки
            window.location.href = 'error.html';
        });
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

// Release popup при загрузке страницы
const releasePopup = document.getElementById('release-popup');

if (releasePopup) {
    setTimeout(() => {
        releasePopup.style.display = 'block';
    }, 1000); // Показать через 1 секунду

    // Закрытие release popup
    const releaseCloseBtn = releasePopup.querySelector('.popup-close');

    function closeReleasePopup() {
        releasePopup.classList.add('closing');
        setTimeout(() => {
            releasePopup.style.display = 'none';
            releasePopup.classList.remove('closing');
        }, 600);
    }

    releasePopup.addEventListener('click', (e) => {
        if (e.target === releasePopup) {
            closeReleasePopup();
        }
    });

    if (releaseCloseBtn) {
        releaseCloseBtn.addEventListener('click', closeReleasePopup);
    }
}



// Функция для создания салюта
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    const numberOfFireworks = 3; // Добавляем 3 салюта каждые 10 секунд

    for (let i = 0; i < numberOfFireworks; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');

        // Случайный цвет
        const colors = ['#FF0000', '#00FF00', '#FFFF00', '#FF1493', '#00FFFF', '#FFA500', '#FF4500'];
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Случайный размер
        const size = Math.random() * 20 + 10; // От 10px до 30px
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;

        // Случайная позиция
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 50}%`; // В верхней половине

        fireworksContainer.appendChild(firework);

        // Удаляем салют после завершения анимации
        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    }

    // Повторяем создание салюта каждые 10 секунд
    setTimeout(createFireworks, 10000);
}

// Запускаем салют при загрузке страницы
createFireworks();
