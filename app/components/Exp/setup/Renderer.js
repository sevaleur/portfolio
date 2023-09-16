import * as THREE from 'three'

export default class Renderer 
{
    constructor(_canvas, _sizes, _camera, _scene)
    {
        this.canvas = _canvas 
        this.sizes = _sizes 
        this.camera = _camera.instance 
        this.scene = _scene 

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas, 
            antialias: true, 
            alpha: true 
        })

        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.ratio)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.ratio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera)
    }
}