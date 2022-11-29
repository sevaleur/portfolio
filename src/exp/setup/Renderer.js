import * as THREE from 'three'
import Exp from '../Exp.js'

export default class Renderer 
{
    constructor()
    {
        this.exp = new Exp()
        this.canvas = this.exp.canvas
        this.camera = this.exp.camera
        this.scene_one = this.exp.scene_one
        this.scene_two = this.exp.scene_two 
        this.sizes = this.exp.sizes
        this.location = true

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        })
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixel_ratio)
        this.instance.setClearColor('#232323')
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixel_ratio)
    }

    update()
    {
        if(this.location)
        {
            this.instance.render(this.scene_one, this.camera.instance_ortho)
        }
        else 
        {
            this.instance.render(this.scene_two, this.camera.instance_persp)
        }
    }
}