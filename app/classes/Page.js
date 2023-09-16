import gsap from 'gsap'

import each from 'lodash/each'

export default class Page
{
  constructor({ element, elements, id })
  {
    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.id = id
  }

  /*
    Create.
  */

  create()
  {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildren, (entry, key) =>
    {
      if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))
      {
        this.elements[key] = entry
      }
      else
      {
        this.elements[key] = document.querySelectorAll(entry)

        if(this.elements[key].length === 0)
        {
          this.elements[key] = null
        }
        else if(this.elements[key].length === 1)
        {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
  }

  /*
    Page animation.
  */

  show()
  {
    return new Promise(resolve =>
    {
      this.animateIn = gsap.timeline()

      this.animateIn.fromTo(this.element,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        onComplete: resolve
      })

      this.animateIn.call(_ =>
      {
        resolve()
      })
    })
  }

  hide()
  {
    return new Promise(resolve =>
    {
      this.animateOut = gsap.timeline()

      this.animateOut.to(this.element,
      {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
