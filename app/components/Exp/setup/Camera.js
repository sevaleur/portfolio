import * as THREE from 'three'

export default class Camera 
{
    constructor(_scene)
    {
        this.scene = _scene 

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.OrthographicCamera(
            -0.5, 
            0.5, 
            0.5,
            -0.5, 
            -1000, 
            1000
        )

        this.instance.position.set(0, 0, 2)
        this.scene.add(this.instance)
    }

    resize()
    {
        this.instance.left = -0.5 
        this.instance.right = 0.5 
        this.instance.top = 0.5 
        this.instance.bottom = -0.5
        this.instance.near = -1000 
        this.instance.far = 1000 
    }
}