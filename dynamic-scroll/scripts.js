"use strict"

class ContentLoader {

  // Current scroll position of data
  // Number
  current = 0

  // Number of entries to show at a time
  // Number
  numOfEntries = 20

  // JSON file
  dataFile = './data.json'

  // data from json file
  // Array of array of objects
  // Each inner area has numOfEntries amount of entries and represents a section
  data = []

  // Load more button
  loadMoreBtn = document.querySelector('#load-more')

  // DOM element to show content 
  dataEl = document.querySelector('main')

  // Dom element to display errors
  errorEl = document.querySelector('#errors')

  constructor() {
    this.clearErrors()
    this.getData()

    this.loadMoreBtnListener = new AbortController()
    this.loadMoreBtn.addEventListener('click', () => {
      this.loadNextSection()
      this.loadMoreBtn.blur()
    }, this.loadMoreBtnListener)

  }

  async getData() {
    try {
      const res = await fetch(this.dataFile)
      if (!res.ok) throw new Error('Failed to load content')
      const data = await res.json()
  
      // Split data into sections of entries
      for (let i = 0; i < data.length; i += this.numOfEntries) {
        const section = data.slice(i, i + this.numOfEntries)
        this.data.push(section)
      }

      this.loadNextSection()
      
    } catch (error) {
      this.setError(error.message)
    }
  }

  clearErrors() {
    this.errorEl.classList.add('hidden')
    this.errorEl.innerHTML = ''
  }
  
  setError(msg) {
    this.errorEl.classList.remove('hidden')
    this.errorEl.innerHTML = `Error: ${msg}`
  }

  itemTemplate(title, description) {
    return(`
    <div>
      <h2 class="font-bold text-lg text-slate-500">${title}</h2>
      <p>${description}</p>
    </div>    
    `)
  }

  isAtEnd() {
    return this.current === this.data.length
  }

  deactiveateLoadMoreBtn = () => {
    this.loadMoreBtnListener.abort()
    this.loadMoreBtn.innerHTML = 'No more entries to show'
    this.loadMoreBtn.classList.remove('border')
    this.loadMoreBtn.classList.add('cursor-text')
  }

  loadNextSection() {
    this.data[this.current].forEach( item => {
      const itemEl = this.itemTemplate(item.title, item.description)
      this.dataEl.insertAdjacentHTML('beforeend', itemEl)
    })
    this.current += 1
    if(this.isAtEnd()) this.deactiveateLoadMoreBtn()
  }

}