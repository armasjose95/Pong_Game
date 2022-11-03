const SPEED = .02 //set up computer to have a max speed

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        this.reset()
    }

    get position() {
        //Take value from my CSS & converted that into a JS # that we can use
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }

    set position(value) { //pass in a value
        //Position property and set it to a value which gets passed into set position
        this.paddleElem.style.setProperty("--position", value) 
    }


    rect() {
        return this.paddleElem.getBoundingClientRect()
    }


    reset() {
        this.position = 50 //resets paddle back to the middle after each point
    } 



    update(delta, ballHeight) {
        //paddle moves to exactly where the ball is, but computer would always win
        //so if ball is above our current position, we move upward and vice versa
        //(ballHeight - this.position)  gives us a negative or positive #
        // # is larger when our paddle is furter away from the ball so comp. can move faster when it's further away from the ball
        this.position += SPEED * delta * (ballHeight - this.position) 
        
    }
}
