import VirtualScroll from "virtual-scroll";

import Exp from "../../../Exp.js";

export default class Scroll 
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.scroller = new VirtualScroll()
        this.scroll = {
            speed: 0, 
            target: 0
        }

        this.addEventListeners()
    }

    calcPos(mesh, WHOLEHEIGHT, margin)
    {
        let calc_pos = (this.scroll.speed + mesh.position.y + WHOLEHEIGHT + this.sizes.height + margin) % WHOLEHEIGHT - this.sizes.height - margin 

        return calc_pos
    }

    scrollEvent()
    {
        this.scroller.on(event => 
        {
            this.scroll.target = event.deltaY / 3
        })
    }

    onTouchDown(event) 
    {
        this.isDown = true
       
        this.scroll.position = this.scroll.speed
        this.start = event.touches ? event.touches[0].clientX : event.clientX
    }
       
    onTouchMove(event) 
    {
        if (!this.isDown) return
        
        const x = event.touches ? event.touches[0].clientX : event.clientX
        const distance = (this.start - x) * 0.05
        
        this.scroll.target = this.scroll.position + distance
    }
       
    onTouchUp(event) 
    {
        this.isDown = false
    }

    addEventListeners()
    { 
        window.addEventListener('mousewheel', this.scrollEvent.bind(this))
        window.addEventListener('wheel', this.scrollEvent.bind(this))
    
        /* window.addEventListener('mousedown', this.onTouchDown.bind(this))
        window.addEventListener('mousemove', this.onTouchMove.bind(this))
        window.addEventListener('mouseup', this.onTouchUp.bind(this))
    
        window.addEventListener('touchstart', this.onTouchDown.bind(this))
        window.addEventListener('touchmove', this.onTouchMove.bind(this))
        window.addEventListener('touchend', this.onTouchUp.bind(this)) */
    }

    update()
    {
        this.scroll.speed += (-this.scroll.speed - this.scroll.target) * 0.1
        this.scroll.speed *= .9
    }
}