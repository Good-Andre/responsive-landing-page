let anchorLinks = document.querySelectorAll('.nav__link');

for (let item of anchorLinks) {
  item.addEventListener('click', (e) => {
    let hashVal = item.getAttribute('href')
    let topOfElement = document.querySelector(hashVal).offsetTop - 63

    window.scroll({ 
      top: topOfElement, 
     })
    history.pushState(null, null, hashVal)
    e.preventDefault()
  })
}