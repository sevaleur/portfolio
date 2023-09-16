import gsap from 'gsap'

import Page from '../../classes/Page'
import Show from '../../animations/Show'

export default class Home extends Page
{
    constructor()
    {
      super({
        id: 'home',
        element: '.home',
        elements: {
          text: document.querySelectorAll('p'),
          title: '.home__title__text',
          sub: '.home__sub__title',
          hook: '.home__hook__title'
        }
      })
    }

    create()
    {
      super.create()

      this.title_show = new Show(this.elements.hook)
    }

    show()
    {
      super.show()

      gsap.fromTo(
        [
          this.elements.title,
          this.elements.sub,
          this.elements.text
        ],
        {
          opacity: 0
        },
        {
          opacity: 1.0,
          duration: 1.0,
          stagger: 0.5,
          delay: 1.0
        }
      )
      gsap.set(
        this.elements.hook,
        {
          opacity: 1.0
        }
      )

      this.title_show.init()
    }

    hide()
    {
      super.hide()

      this.title_show.hide()
    }
}
