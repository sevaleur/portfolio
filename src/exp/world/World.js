import Exp from '../Exp.js'
import Home from './home/Home.js'
import Work from './work/Work.js'

export default class World
{
    constructor()
    {
        this.exp = new Exp()
        this.renderer = this.exp.renderer
        this.entry_location = window.location.pathname
        this.setWorld()
    }

    setWorld(location = this.entry_location)
    {
        switch(location)
        {
            case '/index.html':
                this.setHome()
                break 
            case '/work.html': 
                this.setWork()
                break 
            case '/about.html':
                this.setAbout()
                break 
            default: 
                //this.fourOfour = new NotFound()
                this.setHome()
                break
        }
    }

    setHome()
    {
        this.home = new Home()
        this.renderer.location = true
        this.renderer.instance.setClearColor('#232323')

        if(this.work)
            this.work.delete()

        /* if(this.about)
            this.about.delete() */
    }

    setWork()
    {
        this.work = new Work()
        this.renderer.location = false
        this.renderer.instance.setClearColor('#ced1d3')

        if(this.home)
            this.home.delete()

        /* if(this.about)
            this.about.delete() */
    }

    setAbout()
    {
        //this.about = new About()
        this.renderer.location = false
        this.renderer.instance.setClearColor('#232323')

        if(this.home)
            this.home.delete()

        if(this.work)
            this.work.delete()
    }

    resize()
    {
        if(this.home)
            this.home.resize()
        
        /* if(this.work)
            this.work.resize()

        if(this.about)
            this.about.resize() */
    }

    update()
    {
        if(this.home)
            this.home.update()

        if(this.work)
            this.work.update()
    }
}