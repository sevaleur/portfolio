import gsap from 'gsap'

import Exp from '../Exp.js'

import Top_Exp from './home/Top_Exp.js'
import Lab_Exp from './lab/Lab_Exp.js'

export default class World
{
    constructor()
    {
        this.exp = new Exp()
        this.scroll = this.exp.scroll
        this.resources = this.exp.resources
        this.camera = this.exp.camera
        this.sizes = this.exp.sizes

        this.top_exp = new Top_Exp()
        this.lab_exp = new Lab_Exp()
    }

    resize()
    {
        if(this.top_exp)
            this.top_exp.resize()

        if(this.lab_exp)
            this.lab_exp.resize()
    }

    update()
    {
        if(this.top_exp)
        {
            this.top_exp.update()

            if(this.scroll.uniform_scroll != undefined)
            {
                gsap.to(this.top_exp.mat.uniforms.u_scroll, 
                    {
                        value: this.scroll.uniform_scroll * 2,
                        duration: 1.,
                        ease: 'power.Out'
                    })

                if(this.scroll.uniform_scroll >= 1)
                {
                    this.top_exp.pause()

                    if(this.lab_exp)
                    {
                        this.lab_exp.play()
                        this.lab_exp.update()
                    }
                }
                else 
                {
                    this.top_exp.play()
                    this.lab_exp.pause()
                }
            }
        }
    }
}