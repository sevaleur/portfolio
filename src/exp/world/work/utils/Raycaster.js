import * as THREE from 'three'

import Exp from '../../../Exp.js'

export default class Raycaster 
{
    constructor()
    {
        this.exp = new Exp()
        this.scene = this.exp.scene_two
        this.mouse = this.exp.mouse 
        this.camera = this.exp.camera
        this.raycaster = new THREE.Raycaster()

        this.currentIntersect = null

        this.addEvent()
    }

    clickEvent()
    {
        if(this.currentIntersect)
        {
            switch(this.currentIntersect.object.name)
            {
                case 0: 
                    console.log('0')
                    break 
                case 1: 
                    console.log('1')
                    break 
                case 2: 
                    console.log('2')
                    break 
                case 3: 
                    console.log('3')
                    break
                default: 
                    break
            }
        }
    }

    addEvent()
    {
        document.addEventListener('click', this.clickEvent)
    }

    removeEvent()
    {
        document.removeEventListener('click', this.clickEvent)
    }

    update(mesh)
    {
        this.raycaster.setFromCamera(this.mouse.mouse_coord, this.camera.instance_persp)
        this.intersects = this.raycaster.intersectObjects(mesh)

        if(this.intersects.length)
        {
            if(this.currentIntersect === null)
            {
                
            }

            this.currentIntersect = this.intersects[0]
        } 
        else 
        {
            if(this.currentIntersect)
            {
                
            }

            this.currentIntersect = null
        }
    }
}