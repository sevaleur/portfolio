import * as THREE from 'three'
import gsap from 'gsap'

import Exp from '../../Exp.js'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class Lab_Exp 
{
    constructor()
    {
        this.exp = new Exp()
        this.time = this.exp.time 
        this.scene = this.exp.scene_two
        this.sizes = this.exp.sizes
        this.scroll = this.exp.scroll
        this.resources = this.exp.resources

        this.isPlaying = false
        
        this.mouseEvents()
        this.setLab()
        this.resize()
    }

    mouseEvents()
    {
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (e) => 
        {
            this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
            this.mouse.y = -(e.clientY / this.sizes.height  * 2 - 1)
        })
    }

    setLab()
    {
        let geometry = new THREE.PlaneGeometry(300, 200, 500, 500)
        this.material = new THREE.ShaderMaterial({
            uniforms: 
            {
                u_tex: { value: this.resources.items.water },
                u_tex2: { value: this.resources.items.game },
                u_time: { value: 0 },
                u_progress: { value: 0 },
                u_intensity: { value: 2 },
                u_opacity: { value: 1 },
                u_wave: { value: 1 },
                u_resolution: { value: new THREE.Vector4() }
            },
            vertexShader: vertex, 
            fragmentShader: fragment,
            transparent: true
        })

            this.mesh = new THREE.Mesh(geometry, this.material)
            this.mesh.position.x = -300
            this.mesh.rotation.y = 0.2
            this.mesh.scale.set(0)
            this.scene.add(this.mesh)
    }

    pause()
    {
        this.isPlaying = false
    }

    play()
    {
        this.isPlaying = true
    }

    resize()
    {
        this.imageAspect = 1.77 
        let a1, a2

        if(this.sizes.height / this.sizes.width > this.imageAspect) 
        {
            a1 = (this.sizes.width / this.sizes.height) * this.imageAspect
            a2 = 1
        } 
        else
        {
            a1 = 1
            a2 = (this.sizes.height / this.sizes.width) / this.imageAspect
        }

        this.material.uniforms.u_resolution.value.x = this.sizes.width;
        this.material.uniforms.u_resolution.value.y = this.sizes.height;
        this.material.uniforms.u_resolution.value.z = a1;
        this.material.uniforms.u_resolution.value.w = a2;
    }
    
    update()
    {
        if(!this.isPlaying)
            return 


            
        this.material.uniforms.u_time.value = this.time.elapsed / 2000
        this.mesh.position.x = -300 + (this.mouse.x * 2)
        gsap.to(this.mesh.position, {y: this.mouse.y * 100, duration: 2})
    }
}