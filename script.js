var game = [];
var snake = [];
var direction = 'right';
var apple;

var timerInterval;
var gameInterval;
var startTime;
var speed = 350;
var maxSeconds = 10;

function SnakeElement(y, x) {
    this.x = x;
    this.y = y;
}

function Apple() {
    try{
        do {
            this.x = Math.floor(Math.random() * 13);
            this.y = Math.floor(Math.random() * 13);
        } while (game[this.y][this.x] == 1);
    } catch {}
}

apple = new Apple();
snake.unshift(new SnakeElement(6, 3));

drawGrid();
startGame();

function drawSnake() {
    for (let y = 0; y < 13; y++) {
        game[y] = [];
        for (let x = 0; x < 13; x++) {
            game[y][x] = 0;
        }
    }

    snake.forEach(element => {
        game[element.y][element.x] = 1;
    });

    game[apple.y][apple.x] = 2;
}

function drawGrid() {
    drawSnake();

    let griglia = document.getElementById("grid");
    griglia.innerHTML = "";

    for (let y = 0; y < 13; y++) {
        let row = document.createElement('div');
        row.classList.add("riga");
        row.id = ('row' + y);
        griglia.appendChild(row);

        for (let x = 0; x < 13; x++) {

            let col = document.createElement('div');
            if (game[y][x] == 1) col.classList.add("serpente");
            else if (game[y][x] == 2) col.classList.add("mela");
            else col.classList.add("colonna");
            row.appendChild(col);
        }
    }
}

function startGame() {
    startTimer();
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowUp':
                if (direction != 'bottom') direction = 'top';
                break;
            case 'ArrowDown':
                if (direction != 'top') direction = 'bottom';
                break;
            case 'ArrowLeft':
                if (direction != 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction != 'left') direction = 'right';
                break;
        }
    });

    setInterval(function() {move(direction);}, speed);
}

function move(direction) {
    let head = snake[0];
    let newHead;

    switch(direction) {
        case 'top':
            newHead = new SnakeElement(head.y - 1, head.x);
            break;
        case 'bottom':
            newHead = new SnakeElement(head.y + 1, head.x);
            break;
        case 'left':
            newHead = new SnakeElement(head.y, head.x - 1);
            break;
        case 'right':
            newHead = new SnakeElement(head.y, head.x + 1);
            break;
    }

    if (newHead.x < 0 || newHead.x >= 13 || newHead.y < 0 || newHead.y >= 13) {
        alert("Game Over! Collision with wall");
        location.reload();
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            //alert("Game Over! Collision with self");
            location.reload();
            return;
        }
    }

    if (newHead.x == apple.x && newHead.y == apple.y) {
        apple = new Apple();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    drawGrid();
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}
    
function stopTimer() {
    clearInterval(timerInterval);
}
    
function updateTimer() {
    var now = new Date().getTime();
    var elapsedTime = now - startTime;
    var minutes = Math.floor(elapsedTime / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    seconds = (seconds < 10 ? "0" : "") + seconds;
    console.log(minutes + ":" + seconds);

    if (seconds == maxSeconds) {
        if (speed > 50) {
            maxSeconds+= 10;
            speed -= 25;

            //clearInterval(function() {move(direction)});
            //setInterval(function() {move(direction), speed});
            console.log(speed)
        }
    }
}