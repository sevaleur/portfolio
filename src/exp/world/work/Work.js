import * as THREE from 'three'
import { Text } from 'troika-three-text'
import gsap from 'gsap'

import Exp from '../../Exp.js'
import Scroll from './utils/Scroll.js'
import Raycaster from './utils/Raycaster.js'

import vShader from './shaders/planes/vertex.glsl'
import fShader from './shaders/planes/fragment.glsl'
import vText from './shaders/text/vertex.glsl'
import fText from './shaders/text/fragment.glsl'

export default class Work 
{
    constructor()
    {
        this.exp = new Exp()
        this.scene = this.exp.scene_two
        this.sizes = this.exp.sizes 
        this.time = this.exp.time
        this.resources = this.exp.resources
        this.camera = this.exp.camera
        this.mouse = this.exp.mouse
        this.scroller = new Scroll()
        this.raycaster = new Raycaster()

        this.setProjects()
        this.setScene()
    }

    setProjects()
    {
        this.projects_ = [
            { image: this.resources.items.statue, text: 'STATUE' },
            { image: this.resources.items.game, text: 'GAME' },
            { image: this.resources.items.space, text: 'SPACE' },
            { image: this.resources.items.droids, text: 'DROIDS' },
        ]
    }

    setScene()
    {
        this.mat = new THREE.ShaderMaterial({
            uniforms: 
            {
                u_tex: {value: null},
                u_time: {value: 0.0},
                u_state: {value: 0.},
                u_intensity: {value: 2.},
                u_displacement: {value: this.resources.items.noise},
                u_scroll: {value: 0.0}
            }, 
            vertexShader: vShader,
            fragmentShader: fShader
        })

        this.materials = []
        this.meshes = []
        
        this.projects = this.projects_.map(({image, text}, index) => 
        {
            let geometry = new THREE.PlaneGeometry(500, 500, 100, 100)
            let material = this.mat.clone()
            material.uniforms.u_displacement.value = this.resources.items.noise
            material.uniforms.u_tex.value = image 

            this.materials.push(material)
            let mesh = new THREE.Mesh(geometry, material)

            this.margin = 600
            this.WHOLEHEIGHT = this.projects_.length*(mesh.scale.y + this.margin)

            mesh.position.y = -this.margin * index
            mesh.name = index
            this.meshes.push(mesh)
            this.scene.add(mesh)

            gsap.to(mesh.material.uniforms.u_state, 
            {
                value: 1.0, 
                duration: 1.0, 
                delay: 1.0
            })

            const project_text = new Text()
            this.scene.add(project_text)

            project_text.text = text
            project_text.position.z = 100
            project_text.position.y = -this.margin * index
            project_text.anchorX = 'center'
            project_text.font = '/font/PlayfairDisplay-Regular.ttf'

            this.sizes.mobile ? project_text.fontSize = 50 : project_text.fontSize = 150

            project_text.material = new THREE.ShaderMaterial({
                uniforms: 
                {
                    u_scroll: {value: 0.0}
                },
                vertexShader: vText,
                fragmentShader: fText
            })
           
            return {
                mesh: mesh, 
                image: image, 
                text: project_text, 
                index: index 
            }
        })
    }

    delete()
    {
        this.projects.forEach(project => 
        {
            this.scene.remove(project.mesh, project.text)
            project.mesh.material.dispose()
            project.mesh.geometry.dispose()
            project.text.dispose()
        })

        this.raycaster.removeEvent()
    }

    resize()
    {

    }

    update()
    {
        this.scroller.update()
        this.raycaster.update(this.meshes)

        this.projects.forEach(project => 
        {
            project.mesh.material.uniforms.u_time.value = this.time.elapsed / 2000
            project.mesh.material.uniforms.u_scroll.value = this.scroller.scroll.speed

            project.text.material.uniforms.u_scroll.value = this.scroller.scroll.speed

            project.mesh.position.y = this.scroller.calcPos(project.mesh, this.WHOLEHEIGHT, this.margin)
            project.text.position.y = this.scroller.calcPos(project.text, this.WHOLEHEIGHT, this.margin)
    
            project.text.sync()
        })
    }
}