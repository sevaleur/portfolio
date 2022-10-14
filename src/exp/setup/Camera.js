import * as THREE from 'three'
import Exp from '../Exp.js'

export default class Camera 
{
    constructor()
    {
        this.exp = new Exp()
        this.scene_one = this.exp.scene_one
        this.scene_two = this.exp.scene_two 
        this.sizes = this.exp.sizes
        this.scroll = this.exp.scroll_sections

        this.setInstance()
    }

    setInstance()
    {
        this.instance_ortho = new THREE.OrthographicCamera(
            -0.5,
            0.5, 
            0.5, 
            -0,5,
            -1000,
            1000
        )
        this.instance_ortho.position.set(0., 0., 2.)
        this.scene_one.add(this.instance_ortho)

        this.instance_persp = new THREE.PerspectiveCamera(
            2 * Math.atan((this.sizes.height / 2) / 600) * (180 / Math.PI),
            this.sizes.width / this.sizes.height, 
            0.1, 
            1000
        )
        this.instance_persp.position.set(0, 0, 600)
        this.scene_two.add(this.instance_persp)
    }

    resize()
    {
        this.instance_ortho.left = -0.5
        this.instance_ortho.right = 0.5
        this.instance_ortho.top = 0.5
        this.instance_ortho.bottom = -0.5
        this.instance_ortho.near = -1000 
        this.instance_ortho.far = 1000

        this.instance_persp.aspect = this.sizes.width / this.sizes.height 
        this.instance_persp.updateProjectionMatrix()
    }

    update()
    {
        this.instance_persp.position.y = - this.scroll.scrollY / this.sizes.height * 350
    }
}