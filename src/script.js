import './style.css'
import Exp from './exp/Exp.js'

import { preloadFont } from 'troika-three-text'

preloadFont(
    {
      font: '/font/PlayfairDisplay-Regular.ttf', 
      characters: 'abcdefghijklmnopqrstuvwxyz'
    },
    () => {
        const exp = new Exp(document.querySelector('canvas.webgl'))
    }
  )