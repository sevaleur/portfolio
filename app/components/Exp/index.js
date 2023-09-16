import * as THREE from 'three'

import Sizes from './utils/Sizes'
import Time from './utils/Time'

import Camera from './setup/Camera'
import Renderer from './setup/Renderer'

import World from './World'

export default class Exp 
{
  static instance 

  constructor(_template, _canvas)
  {
    if(Exp.instance)
      return Exp.instance

    Exp.instance = this 

    this.canvas = _canvas 
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()

    this.camera = new Camera(
      this.scene
    )

    this.renderer = new Renderer(
      this.canvas, 
      this.sizes.screen, 
      this.camera, 
      this.scene
    )

    this.world = new World(
      this.scene, 
      this.time, 
      this.sizes.screen
    )

    this.sizes.on('resize', () => { this.resize() })
    this.time.on('update', () => { this.update() })
  }

  resize()
  {
    if(this.world)
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