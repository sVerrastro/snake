var game = [];
var snake = [];
var direction = 'right';

function SnakeElement(y, x) {
    this.x = x;
    this.y = y;
}

snake.unshift(new SnakeElement(6, 3));
snake.unshift(new SnakeElement(6, 2));
snake.unshift(new SnakeElement(6, 1));

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
                else col.classList.add("colonna");
            row.appendChild(col);
        }
    }
}

function startGame() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowUp':
                if (direction !== 'bottom') direction = 'top';
                break;
            case 'ArrowDown':
                if (direction !== 'top') direction = 'bottom';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    setInterval(function() {
        move(direction);
    }, 300);
}

function move(direction) {
    let head = snake[0];

    switch(direction) {
        case 'top':
            snake.unshift(new SnakeElement(head.y - 1, head.x));
            break;
        case 'bottom':
            snake.unshift(new SnakeElement(head.y + 1, head.x));
            break;
        case 'left':
            snake.unshift(new SnakeElement(head.y, head.x - 1));
            break;
        case 'right':
            snake.unshift(new SnakeElement(head.y, head.x + 1));
            break;
    }
    snake.pop();

    
    if (snake[0].x == -1 || snake[0].x == 13 || snake[0].y == -1 || snake[0].y == 13) {
        alert('game over');
        location.reload();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            //alert('game over');
            //location.reload();
        }
    }

    drawGrid();
}
