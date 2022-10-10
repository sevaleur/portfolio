import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Exp from '../Exp.js'

gsap.registerPlugin(ScrollTrigger)

export default class Animations 
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.lab_exp = this.exp.world.lab_exp

        this.hl_l = document.querySelector('.hl_l h1')
        this.hl_r = document.querySelector('.hl_r h1')
        this.hl_top = document.querySelector('.hl_top .about__top')
        this.hl_btm = document.querySelector('.hl_btm .about__btm')
        this.projects = gsap.utils.toArray('.project')
        this.headlines = gsap.utils.toArray('.headline')
        this.descriptions = gsap.utils.toArray('.desc')
        this.tech = gsap.utils.toArray('.tech_used')
        this.about_desc_one = document.querySelector('.about_desc_one p')
        this.about_desc_two = document.querySelector('.about_desc_two p')

        this.setAnimations()
    }

    setAnimations()
    {
        let tl_top = gsap.timeline({
            scrollTrigger: {
              trigger: '#headline',
              start: "center center", 
              end: "+=100",
              /* pin: true,
              pinSpacing: false, */
              scrub: 1,
            }})
        
        tl_top.addLabel("start")
            .to('.top', {opacity: 0}, 'start')

        let tl_lab = gsap.timeline({
            scrollTrigger: {
                trigger: '.lab__intro', 
                start: 'top top',
                pin: true, 
                pinSpacing: false,
                end: '+=1000',
                scrub: 1,
                toggleActions: 'restart pause reverse pause',
            }})

        tl_lab.addLabel('start')
            .from(this.hl_l, {x: 490}, 'start')
            .from(this.hl_r, {x: 490}, 'start')
            .addLabel('end')
            .to(this.hl_l, {x: 800}, 'end')
            .to(this.hl_r, {x: 800}, 'end')

        if(this.lab_exp)
        {
            let tl_projects_undervands = gsap.timeline({
                scrollTrigger: {
                    trigger: '._undervands',
                    start: 'top top',
                    end: '+=1000',
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    toggleActions: 'restart pause reverse pause',
                }})

            tl_projects_undervands.addLabel('start')
            .from(this.lab_exp.mesh.scale, {x: 0}, 'starta')
                .from('.hl_undervands', {width: 0}, 'start')
                .from('.desc_undervands_top p', {x: -300}, 'start')
                .from('.desc_undervands_btm p', {x: 300}, 'start')
                .from('.tech_undervands p', {x: -400}, 'start')
                .addLabel('end')
                .to('.hl_undervands', {width: 0}, 'end')
                .to('.desc_undervands_top p', {x: -300}, 'end')
                .to('.desc_undervands_btm p', {x: 300}, 'end')
                .to('.tech_undervands p', {x: -400}, 'end')
                
           let tl_projects_spil = gsap.timeline({
            scrollTrigger: {
                trigger: '._spil',
                start: 'top top',
                end: '+=1000',
                pin: true,
                pinSpacing: false,
                scrub: 1, 
                toggleActions: 'restart pause reverse pause'
            }})

            tl_projects_spil.addLabel('start')
                .from('.hl_spil', {width: 0}, 'start')
                .from('.desc_spil_top p', {x: -300}, 'start')
                .from('.desc_spil_btm p', {x: 300}, 'start')
                .from('.tech_spil p', {x: -400}, 'start')
                .to(this.lab_exp.mesh.material.uniforms.u_progress, {value: 1}, 'start')
                .to(this.lab_exp.mesh.material.uniforms.u_intensity, { value: 1.47}, 'start')
                .addLabel('end')
                .to('.hl_spil h2', {y: 300}, 'end')
                .to('.desc_spil_top p', {y: 300}, 'end')
                .to('.desc_spil_btm p', {y: -300}, 'end')
                .to('.tech_spil p', {y: -100}, 'end')
                .to(this.lab_exp.mesh.scale, {y: 0}, 'end')
        }

        let tl_about_intro = gsap.timeline({
            scrollTrigger: {
                trigger: '.about__intro',
                start: 'top top', 
                end: '+=1350',
                pin: true, 
                pinSpacing: false,
                scrub: 1, 
                toggleActions: 'restart pause reverse pause'
            }})

        tl_about_intro.addLabel('start')
            .from(this.hl_top, { y: 500}, 'start')
            .from(this.hl_btm, { y: 500}, 'start')
            .addLabel('end')
            .to(this.hl_top, {y: -1200}, 'end')
            .to(this.hl_btm, {y: -1200}, 'end')

        let tl_about_main = gsap.timeline({
            scrollTrigger: {
                trigger: '.about_main',
                start: 'top top',
                end: '+=1000',
                pin: true,  
                pinSpacing: true,
                scrub: 1, 
                toggleActions: 'restart pause reverse pause'
            }})

        tl_about_main.addLabel('start')
            .from(this.about_desc_one, {y: 250}, 'start')
            .from(this.about_desc_two, {y: -250}, 'start')
        
    }
}