import gsap from 'gsap'
import barba from '@barba/core'

import Exp from '../Exp.js'

export default class PageTransitions
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.world = this.exp.world
        this.home = this.world.home

        this.setTransitions() 
    }

    setTransitions()
    {
        const pageTransition = (data) =>
        {
            const tl = gsap.timeline()

            tl.to('.transition', {duration: .5, scaleY: 1, transformOrigin: 'bottom center', delay: .5, onComplete: () => {
                this.location = window.location.pathname
                this.world.setWorld(this.location)
            }})

            tl.to('.transition', {duration: .5, scaleY: 0, transformOrigin: 'top center', delay: .5})

        }

        const delay = (n) =>
        {
            n = n || 2000 
            return new Promise(done => {
                setTimeout(() => {
                    done()
                }, n)
            })
        }

        barba.init({
            sync: true,
            transitions: [{
                async leave(data) {
                    const done = this.async()
                    pageTransition(data)
                    await delay(1500)
                    done()
                }
            }], 
        })
    }

    homeBeforeLeave()
    {
        gsap.to(this.home.mat.uniforms.u_size, 
        {
            value: 0.,
            duration: 1.,
            delay: 2.,
        })
    }

    homeAfterEnter()
    {
        gsap.from(this.home.mat.uniforms.u_size, 
        {
            value: 1,
            duration: 1.,
            delay: 2.,
        })
    }

}