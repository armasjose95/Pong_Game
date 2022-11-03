/* Update Loop: Every single frame that passes, we're calling a function.
-That function is going to update the positions and the logic of all the pieces of my game.
-ex. Computer AI is going to move the paddle & ball is going to move in the current direction it's goin.
-I can move my paddle wih my mouse.
-This is going to update all the positions and paint everything on the screen exactly where it needs to go inside of the update loop.
-Breaking out everything in my game into seperate classes.
*/

import Ball from "./Ball.js" //imported filed from ball.js
import Paddle from "./Paddle.js"

/*selecting the ball HTML element and creating a new class for that ball & now have access to it here & can use inside 
our update loop
*/
const ball = new Ball(document.getElementById("ball")) 
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
//update loop is going to take in a time variable for how much time has passed since the start of our program
function update(time){ 
    /* Every time we call update, we're taking our last time and we're subtracting our time from that last time
    to get our delta and then we're setting our lastTime =(to) time 
    Then it'll repeat but the 1st time we call update lastTime is null, we don't have a lasttime yet, need to check 4 that.
    */

    if (lastTime != null) {
        const delta = time - lastTime
        //Update Code happening here only if we have a last time. We just set our lastTime and call it again the 1st time.
        //important to use that delta to make sure all of our movements in our game are based on that because delta flucutaes
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]) // both of our rectangles passed into the ball
        //pass in y position of our ball because the paddle needs to know where the ball is to move to that position
        computerPaddle.update(delta, ball.y)
        //selects our root element that has the hue variable inside of it
       const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

       //slowly changing our hue by a very small amount every time that our frame changes
       document.documentElement.style.setProperty("--hue", hue + delta * .01)

        if(isLose()) handleLose() //resets game back to where it was before
    }


    lastTime = time
    window.requestAnimationFrame(update)
}


function isLose() { //return as a variable
    const rect = ball.rect()
    return rect.right >= window.innerWidth ||rect.left <= 0 // is our ball out of bounds on r or l side?
}


function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) { // if ball hits r side of the screen, pt for user player
        //parse an integer vers. of the text that's in there rn and add 1 to score
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) +1 
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) +1 //pt if computer wins
    }

    
    ball.reset()
    computerPaddle.reset() 
}



document.addEventListener("mousemove", e => { // y poistion of paddle is the same as our mouse 
    //convert to a value between 0&1 and value between 0&100(part)
    //convert from a pixel value to a percentage
    playerPaddle.position = (e.y / window.innerHeight) * 100 // event object has a y property
})


/*In order to call update(time) function
-With requestAnimationFrame is every time that you can change what's on the screen, this function is going to be called.
-JS knows you can't change anything on the screen, so  don't run code.
-But as soon as you can run something on the screen, it calls this function.
-As long as we call window.requestAnimationFrame, it's going to infinitley loop.
-every frame it calls this function
*/
window.requestAnimationFrame(update)