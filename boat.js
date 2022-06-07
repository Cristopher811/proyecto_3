const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d')
var applesQuantity = 0
const t_h_color = "#9b2226"
const t_l_color = "#386fa4"

window.onload = function(){
    setInterval(changeColor, 5000)
    gameLoop()
} 

function gameLoop(speed) {
    refreshMove = setInterval(show, snake.speed)// here 15 is our fps value
}


function changeColor() {
    if (apple.color == t_h_color) {
        apple.color = t_l_color
    } else {
        apple.color = t_h_color
    }
}


function show() {
    update()
    draw()
}


function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    eatApple()
    checkHitWall()
}

function eatApple() {
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            if (apple.color == t_l_color) {
                snake.speed += 10
                snake.tempH -= 100
                snake.thermodynamics();
            } else{
                snake.speed -= 10
                snake.tempH += 50
                snake.thermodynamics();
            }
            console.log(snake.speed)
            applesQuantity += 1
            console.log(apple.color, snake.speed)
            apple = new Apple();
            clearInterval(refreshMove)
            gameLoop(snake.speed)
        }
}

function checkHitWall() {
    let headTail = snake.tail[snake.tail.length -1]


    if (headTail.x ==  - snake.size) {
        headTail.x = canvas.width - snake.size
   } else if (headTail.x >= canvas.width) {
        headTail.x = 0
    } else if (headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
    } else if (headTail.y >= canvas.height) {
        headTail.y = 0 
    }
    document.getElementById("c1").value = "distancia recorrida:  " + snake.distance
    document.getElementById("c2").value = "Distancia por recorrer:  " + snake.dx
    document.getElementById("c3").value = "Eficiencia:  " + (1-(snake.tempL/snake.tempH))
    document.getElementById("c4").value = "Q_H:  " + snake.tempH
}

function draw() {
    createRect(0,0,canvas.width, canvas.height, "#84d2f6") //color de fondo
    createRect(0,0, canvas.width, canvas.height)


   for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size- 5, "#5e503f")
    }


    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#000000"
    canvasContext.fillText("Score: " + applesQuantity ,canvas.width - 120, 18)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}


function aleatory(list) {
    return [...list].sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 1)
}


function createRect(x,y,width, height,color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}


window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {
            snake.rotateX = -1
            snake.rotateY = 0
        } else if (event.keyCode == 38 && snake.rotateY != 1) {
            snake.rotateX = 0
            snake.rotateY = -1
        } else if (event.keyCode == 39 && snake.rotateX != -1) {
            snake.rotateX = 1
            snake.rotateY = 0
        } else if (event.keyCode == 40 && snake.rotateY != -1) {
            snake.rotateX = 0
            snake.rotateY = 1
        }
    }, 1)
})


class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
        this.speed = 300
        this.cp = 0.20
        this.mass = 1
        this.tempH = 1050
        this.tempL = 353
        this.dx = 108
        this.distance = 0
    }

    thermodynamics(){
        this.efficience = 1 - (this.tempL/this.tempH)
        this.qH = this.mass*this.cp*(this.tempH - this.tempL)
        this.dx = this.efficience*this.qH
    }

    move() {
        let newRect
        this.dx = Math.round(this.dx)
        console.log(this.dx)
        console.log(this.tempH)

        if(this.dx > 0){
            if (this.rotateX == 1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x + this.size,
                    y: this.tail[this.tail.length - 1].y
                }
            } else if (this.rotateX == -1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x - this.size,
                    y: this.tail[this.tail.length - 1].y
                }
            } else if (this.rotateY == 1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y + this.size
                }
            } else if (this.rotateY == -1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y - this.size
                }
            }
            this.tail.shift()
            this.tail.push(newRect)
            this.dx -= 1
            this.distance +=1
        }
    }
}


class Apple{
    constructor(){
        let isTouching
        
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }

            this.size = snake.size
            this.color = aleatory ([t_h_color, t_l_color])

            if (!isTouching) {
                break;
            }
        }
        
    }
}
const snake = new Snake(20,20,20);
let apple = new Apple();
