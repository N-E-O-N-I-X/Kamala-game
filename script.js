document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const stopButton = document.getElementById('stop-button');
    const beavers = document.querySelectorAll('.beaver');
    const titleSound = document.getElementById('title-sound');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');

    let score = 0;
    let timer = 60;
    let gameInterval, timerInterval;

    // Воспроизведение звука при нажатии на заголовок
    document.getElementById('title').addEventListener('click', () => {
        titleSound.play();
    });

    // Функция для начала игры
    function startGame() {
        score = 0;
        timer = 60;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timer;

        // Показать кнопки Restart и Stop, скрыть кнопку Start
        restartButton.style.display = 'block';
        stopButton.style.display = 'block';
        startButton.style.display = 'none';

        // Запуск таймера
        timerInterval = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer <= 0) {
                endGame();
            }
        }, 1000);

        // Появление и исчезновение бобров
        gameInterval = setInterval(() => {
            beavers.forEach(beaver => {
                if (Math.random() > 0.5) {
                    beaver.classList.add('active');
                } else {
                    beaver.classList.remove('active');
                }
            });
        }, 1500);

        // Клик по бобру
        beavers.forEach(beaver => {
            beaver.addEventListener('click', () => {
                if (beaver.classList.contains('active')) {
                    // Создаем новый звук удара для каждого клика
                    const hitSound = new Audio('hit-sound.mp3');
                    hitSound.play();

                    beaver.classList.remove('active'); // Бобер исчезает после клика
                    score++;
                    scoreDisplay.textContent = score;
                }
            });
        });
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
    
        // Показ модального окна
        const modal = document.getElementById('gameOverModal');
        const finalScore = document.getElementById('finalScore');
        finalScore.textContent = score;
    
        modal.style.display = 'block';
    
        // Закрытие модального окна при клике на крестик
        document.getElementById('closeModal').onclick = function() {
            modal.style.display = 'none';
            resetGame();
        };
    
        // Закрытие модального окна при клике вне его области
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                resetGame();
            }
        };
    }

    // Функция для сброса игры в начальное состояние
    function resetGame() {
        score = 0;
        timer = 60;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timer;

        // Скрыть кнопки Restart и Stop, показать кнопку Start
        restartButton.style.display = 'none';
        stopButton.style.display = 'none';
        startButton.style.display = 'block';
    }

    // Функция для перезапуска игры
    function restartGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        startGame();
    }

    // Функция для полной остановки игры
    function stopGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        resetGame(); // Вернуть в начальное состояние
    }

    // Запуск игры при нажатии на кнопку "Start"
    startButton.addEventListener('click', startGame);

    // Перезапуск игры при нажатии на кнопку "Restart"
    restartButton.addEventListener('click', restartGame);

    // Остановка игры при нажатии на кнопку "Stop"
    stopButton.addEventListener('click', stopGame);
});

document.querySelectorAll('.beaver').forEach(beaver => {
    beaver.addEventListener('click', (event) => {
        // Массив с путями к изображениям
        const images = [
            'pics/hole1.png',
            'pics/hole2.png',
            'pics/hole3.png'
        ];

        // Выбираем случайное изображение
        const randomImage = images[Math.floor(Math.random() * images.length)];

        // Создаем элемент изображения
        const img = document.createElement('img');
        img.src = randomImage; // Устанавливаем случайное изображение
        img.classList.add('cursor-image');
        img.style.left = `${event.pageX}px`;
        img.style.top = `${event.pageY}px`;

        // Добавляем изображение на страницу
        document.body.appendChild(img);

        // Добавляем класс для плавного исчезания через 100 мс
        setTimeout(() => {
            img.classList.add('fade-out');
        }, 100);

        // Удаляем изображение через 2 секунды
        setTimeout(() => {
            img.remove();
        }, 2000);
    });
});
const img = document.createElement('img');
img.src = 'pics/gun.png'; // Укажите путь к вашему PNG-файлу
img.classList.add('gun');
document.body.appendChild(img);

// Обработчик движения мыши
document.addEventListener('mousemove', (event) => {
    const windowWidth = window.innerWidth;
    const imgWidth = img.offsetWidth;

    // Проверяем, чтобы изображение не выходило за границы окна
    let newLeft = event.pageX;

    if (newLeft + imgWidth > windowWidth) {
        newLeft = windowWidth - imgWidth; // Ограничиваем правую сторону
    }
    if (newLeft < 0) {
        newLeft = 0; // Ограничиваем левую сторону
    }

    // Обновляем положение изображения по оси X
    img.style.left = `${newLeft}px`;
    img.style.top = ''; // Сбрасываем значение top, чтобы работал bottom
});