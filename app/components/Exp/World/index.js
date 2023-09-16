import * as THREE from 'three'
import gsap from 'gsap'

import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'

export default class World
{
    constructor(_scene, _time, _sizes)
    {
      this.scene = _scene
      this.time = _time
      this.sizes = _sizes

      this.setObj()
      this.setMouse()
      this.resize()
      this.show()
    }

    setObj()
    {
      this.geo = new THREE.PlaneGeometry(1, 2, 2, 1)
      this.mat = new THREE.ShaderMaterial({
        uniforms: {
          u_time: { value: 0.0 },
          u_scale: { value: new THREE.Vector2(1, 1) },
          u_mouse: { value: new THREE.Vector2(-10, 0) },
          u_size: { value: 0.0 }
        },
        vertexShader: vertex,
        fragmentShader: fragment
      })

      this.obj = new THREE.Mesh(this.geo, this.mat)
      this.scene.add(this.obj)
    }

    setMouse()
    {
      this.mouse = new THREE.Vector2(0, 0)
      window.addEventListener('mousemove', (e) =>
      {
        this.mouse.x = e.clientX / this.sizes.width * 2 - 1
        this.mouse.y = -(e.clientY / this.sizes.height * 2 - 1)
      })
    }

    show()
    {
      gsap.fromTo(
        this.mat.uniforms.u_size,
        {
          value: 1.0
        },
        {
          value: 0.0,
          duration: 3.0,
          delay: 0.5,
          ease: 'power.inOut'
        }
      )
    }

    resize()
    {
      this.aspect = 1.77
      this.vpa = this.sizes.width / this.sizes.height

      if(this.aspect > this.vpa)
      {
        this.mat.uniforms.u_scale.value.x = this.aspect / this.vpa
        this.mat.uniforms.u_scale.value.y = 1
      }
      else
      {
        this.mat.uniforms.u_scale.value.x = 1
        this.mat.uniforms.u_scale.value.y = this.vpa / this.aspect
      }
    }

    update()
    {
      this.mat.uniforms.u_time.value = this.time.elapsed / 300

      gsap.to(
        this.mat.uniforms.u_mouse.value,
        {
          x: this.mouse.x,
          y: this.mouse.y,
          duration: 2.5,
          ease: 'linear'
        }
      )
    }
}
