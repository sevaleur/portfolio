import Exp from './components/Exp'

import Home from './pages/home'

export default class App
{
  constructor()
  {
    this.createContent()
    this.createCanvas()

    this.createPages()
  }

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
  }

  createCanvas()
  {
    this.exp = new Exp(
      this.template,
      this.canvas
    )
  }

  createPages()
  {
    this.pages = {
    home: new Home()
    }

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }
}

new App()
