const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d')
var applesQuantity = 0


//window.onload = () => {
window.onload = function(){
    setInterval(changeColor, 5000)
    gameLoop()
} 
 

function gameLoop(speed) {
    refreshMove = setInterval(show, snake.speed)// here 15 is our fps value
}


function changeColor() {
    if (apple.color == "blue") {
        apple.color = "red"
    } else {
        apple.color = "blue"
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
 //   apple = new Apple(); //quiero que se creen más manzanas pero se ponen todas locas xd
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            if (apple.color == "blue") {
                snake.speed += 10
                snake.tempH -= 50
                snake.thermodynamics();
            } else{
                snake.speed -= 10
                snake.tempH += 50
                snake.thermodynamics();
            }
            applesQuantity += 1
            console.log(apple.color, snake.speed)
            apple = new Apple();
            clearInterval(refreshMove)
            gameLoop(snake.speed)
        }
}

function checkHitWall() {
    let headTail = snake.tail[snake.tail.length -1]


    if (headTail.x == - snake.size) {
        headTail.x = canvas.width - snake.size
    } else if (headTail.x >= canvas.width) {
        headTail.x = 0
    } else if (headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
    } else if (headTail.y >= canvas.height) {
        headTail.y = 0 
    }
    document.getElementById("c1").value = "coordenadas:  " + headTail.x + ", " + headTail.y
    document.getElementById("c2").value = "Energía:  " + snake.dx
}


function draw() {
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)


   for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size- 5, "white")
    }


    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
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
        this.tempH = 300
        this.tempL = 30
        this.dx = 30

    }

    thermodynamics(){
        this.efficience = 1 - (this.tempL/this.tempH)
        this.qH = this.mass*this.cp*(this.tempH - this.tempL)
        this.dx = this.efficience*this.qH
    }

    move() {
        let newRect
        this.dx = Math.round(this.dx)
        //console.log(this.dx)

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
            this.color = aleatory (["red", "blue"])


            if (!isTouching) {
                break;
            }
        }
        
    }
}
const snake = new Snake(20,20,20);
let apple = new Apple();
