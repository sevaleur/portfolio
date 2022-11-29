import * as THREE from 'three'
import gsap from 'gsap'

import Exp from '../../Exp.js'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class Home
{
    constructor()
    {
        this.exp = new Exp()
        this.scene = this.exp.scene_one
        this.time = this.exp.time
        this.sizes = this.exp.sizes
        this.camera = this.exp.camera
        this.mouse = this.exp.mouse
        
        this.isPlaying = true

        this.setObj()
        this.resize()
    }

    setObj()
    {

        this.geo = new THREE.PlaneGeometry(1, 1, 1, 1)
        this.mat = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: 
            {
                u_time: { value: 0.0 },
                u_scale: { value: new THREE.Vector2(1, 1) },
                u_mouse: { value: new THREE.Vector2(0., 0.) },
                u_size: { value: 0.0 }
            },
        })
        this.shaderScale = this.mat.uniforms.u_scale.value

        this.obj = new THREE.Mesh(this.geo, this.mat)

        this.scene.add(this.obj)
    }
    
    delete()
    {
        this.scene.remove(this.obj)
        this.obj.material.dispose()
        this.obj.geometry.dispose()
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
        this.image_aspect = 1.77
        this.viewport_aspect = this.sizes.width / this.sizes.height

        if(this.image_aspect > this.viewport_aspect)
        {
            this.shaderScale.set(this.image_aspect / this.viewport_aspect, 1)
        }
        else 
        {
            this.shaderScale.set(1, this.viewport_aspect / this.image_aspect)
        }
    }

    update()
    {
        if(!this.isPlaying)
            return
        
        this.mat.uniforms.u_time.value = this.time.elapsed / 300

        gsap.to(this.mat.uniforms.u_mouse.value, {x: this.mouse.mouse_coord.x, y: this.mouse.mouse_coord.y, duration: 5, ease: 'linear'})
    }
}