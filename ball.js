const INITIAL_VELOCITY = .025 // not too slow but fast enough so not boring
const VELOCITY_INCREASE = .00001 //increase by a very small amount but gets faster each hit

export default class Ball{  //naming class called ball
    constructor(ballElem) {
        this.ballElem = ballElem  //inside the constructor we're going to pass in the element that corresponds to our ball.
        this.reset()
    }


//get css property    
    get x() {  
        //Take value from my CSS & converted that into a JS # that we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    //setter for x
    set x(value) {
        this.ballElem.style.setProperty("--x", value) //X property and set it to a value which gets passed into set x
    }



    //get css property    
    get y() {  
        //Take value from my CSS & converted that into a JS # that we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    //setter for y
    set y(value) {
        this.ballElem.style.setProperty("--y", value) //y property and set it to a value which gets passed into set y
    }



    rect() {
        return this.ballElem.getBoundingClientRect()
    }




    reset() { //helper function. Allows us to set all those propertie, so when we create a ball, we call that reset function
        this.x = 50 //default values
        this.y = 50 //default values
        /*There is a x&y axis but ball goes along the A line(actual direction ball is traveling)(combo of our x&y)
        Lenght of A = 1. Gives us a unit vector. Then can multiply UV by our velocity.
        Velocity only thing determines how fast we go
        Direction only determines which direction we're going & not velocity. 
        */
        this.direction = { x: 0 }
        /*If greater > .9, then ball moves almost side to side completley.(almost no up and down motion)
        Less than .2 means it's moving up & down completly(almost no side to side motion)
        No negative #'s so use Math.abs
        */
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumberBetween(0, 2 * Math.PI) /*# between 0-360 (2*pi is basically 360) gives it to us in radians. 
            We can use cosine and sine to actually determine the x and the y direction
            taken that direction and we've converted to a x&y position & this is a unit vector for those positions.
            Gives us an x and y direction.
            When you combine those together, you get a unit vector that points 1 in the direction of x&y combined. 
            */
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)} 
        }
        this.velocity = INITIAL_VELOCITY
    }


    
    update(delta, paddleRects) {  //update function that takes in a delta. What are we updating? x&y position, velocity, direction
        //Direction x is going on * this.velocity. * delta because to void long delays/pauses between frames
        this.x += this.direction.x * this.velocity * delta 
        this.y += this.direction.y * this.velocity * delta 
        //multiply our velocity by some kind increasing value.Include delta so that it scales with the frame times
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()

        //rect.bottom/top window.innerHeight means we've gone past the bottom of our screen or top of our screen
        if (rect.bottom >= window.innerHeight ||rect.top <= 0 ) {
            this.direction.y *= -1 //flipping the y direction when we hit the top to go downwards or hit bottom and go up
        }

        //loops in all our paddle rectangles. If any return true for isCollision function,returns treu for entire thing
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1 //flipping the x direction when we hit right to go left or hit left and go right
        }
    }
}

function randomNumberBetween(min, max) {
    /*Math.random = random # between 0-1. 
    Max-min to make sure it's going to scale this value to be within our range. Add min on just so it's always making
    sure the min is the lowest # we can get. 
    */
    return Math.random() * (max - min) + min
}


//if we have a collision with any of our paddles, we swap our x direction
function isCollision(rect1, rect2) {
    return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top)
}