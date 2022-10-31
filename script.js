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
        //ball.update(delta) 
    }
    lastTime = time
    window.requestAnimationFrame(update)
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