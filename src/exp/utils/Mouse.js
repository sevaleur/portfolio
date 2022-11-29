
import Exp from "../Exp"

export default class Mouse 
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.mouse_coord = {x: 0, y: 0}

        this.mousemove()
    }

    mousemove()
    {
        window.addEventListener('mousemove', (e) => 
        {
            this.mouse_coord.x = (e.clientX / this.sizes.width) * 2 - 1
            this.mouse_coord.y = -(e.clientY / this.sizes.height * 2 - 1)
        })
    }
}