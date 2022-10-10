import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(_sources)
    {
        super()

        this.sources = _sources 
        this.items = {}

        this.loaded = 0
        this.to_load = this.sources.length 

        this.startLoading()
    }

    startLoading()
    {
        this.textureLoader = new THREE.TextureLoader()
        this.gltfLoader = new GLTFLoader()

        for(const source of this.sources)
        {
            switch(source.type)
            {
                case 'texture':
                    this.textureLoader.load(
                        source.path, 
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break
                case 'gltf': 
                    this.gltfLoader.load(
                        source.path, 
                        (file) => 
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file 

        this.loaded++ 

        if(this.loaded === this.to_load)
        {
            this.trigger('loaded')
        }
    }
}