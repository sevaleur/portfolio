import * as THREE from 'three'

import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import Resources from './utils/Resources.js'
import Mouse from './utils/Mouse.js'

import _sources from './data/sources.js'

import Camera from './setup/Camera.js'
import Renderer from './setup/Renderer.js'

import World from './world/World.js'
import PageTransitions from './animations/PageTransitions.js'

export default class Exp 
{
    static instance 

    constructor(_canvas)
    {
        if(Exp.instance)
        {
            return Exp.instance
        }

        Exp.instance = this 

        this.canvas = _canvas 
        this.sizes = new Sizes()
        this.time = new Time()
        this.resources = new Resources(_sources)
        this.mouse = new Mouse()
        this.scene_one = new THREE.Scene()
        this.scene_two = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        
        this.resources.on('loaded', () => 
        {
            this.world = new World()
            this.pageTransitions = new PageTransitions()
        })

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.time.on('update', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.world.resize()
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        if(this.world)
            this.world.update()
            
        this.renderer.update()
    }
}