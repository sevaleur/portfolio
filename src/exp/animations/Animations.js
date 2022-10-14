import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Flip from 'gsap/Flip'

import Exp from '../Exp.js'

gsap.registerPlugin(ScrollTrigger, Flip)

export default class Animations 
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes

        this.name = gsap.utils.toArray('.name p')
        this.socials = gsap.utils.toArray('.social img')

        this.setScrollAnimations()
    }

    setScrollAnimations()
    {    
        let tl_top = gsap.timeline({
            scrollTrigger: {
              trigger: '.hero',
              start: "center center", 
              end: "bottom",
              pin: true,
              pinSpacing: false,
              scrub: 1,
              toggleActions: 'restart pause reverse pause',
            }})
        
        this.socials.reverse().forEach(icon => 
        {
            tl_top.addLabel('start')
            .to(icon, {left: 50}, 'start')
            .to('.top', {y: -200}, 'start')
            .to('.top_l', {y: 200}, 'start')
            .to('.top_t', {y: 200}, 'start')
            .to('.top_b', {y: -200}, 'start')
            .to('.headline', {height: 0}, 'start')
        })

        this.name.reverse().forEach(letter => 
            {
                tl_top.addLabel('start')
                .to(letter, {left: -50, duration: 1}, 'start')
            })

        
        let tl_work = gsap.timeline({
            scrollTrigger: {
              trigger: '#work',
              start: "top top",
              pin: true,
              pinSpacing: false 
            }})

        tl_work.addLabel('start')
        .from('.work__container', {width: 0, opacity: 0}, 'start')
        .from('.work__container', {height: 0}, 'startb')
        .from('.work__headline', {height: 0}, 'middle')
        .from('.projects', {height: 0}, 'end')
        .from('.number', {y: -50}, 'end_text')
        .from('.exp', {y: -50}, 'end_text')
    }
}