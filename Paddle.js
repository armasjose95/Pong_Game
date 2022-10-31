export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
    }

    get position() {
        //Take value from my CSS & converted that into a JS # that we can use
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }

    set position(value) { //pass in a value
        //Position property and set it to a value which gets passed into set position
        this.paddleElem.style.setProperty("--position", value) 
    }
}
