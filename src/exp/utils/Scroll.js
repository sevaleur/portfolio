import Exp from '../Exp.js'

export default class Scroll
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.camera = this.exp.camera

        this.scrollY = window.scrollY
        this.currentSection = 0
        this.uniform_scroll = 0
        
        window.addEventListener('scroll', () => 
        {
            this.setScroll()
        })
    }

    setScroll()
    {
        this.scrollY = window.scrollY
        this.uniform_scroll = this.scrollY / this.sizes.height
        this.newSection = Math.round(this.scrollY / this.sizes.height)
        
        if(this.newSection != this.currentSection) 
        {
            this.currentSection = this.newSection
        }
    }
}