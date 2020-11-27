import vars from '../_vars';

function filterFunc(e) {
  if (e.target.classList.contains('portfolio__filter-button')) {
    let catFilter = e.target.getAttribute('data-filter');
    if (catFilter == 'all') {
      if (!e.target.classList.contains('portfolio__active-btn')) {
        this.querySelector('.portfolio__active-btn').classList.remove('portfolio__active-btn');
        e.target.classList.add('portfolio__active-btn');
        vars.$dataCat.forEach((item) => {
          item.classList.add('portfolio__hide-work');
          setTimeout(() => {
            item.classList.remove('portfolio__hide-work');
            item.classList.add('portfolio__fade-in');
          }, 20);
        });
      }
    } else {
      if (!e.target.classList.contains('portfolio__active-btn')) {
        this.querySelector('.portfolio__active-btn').classList.remove('portfolio__active-btn');
        e.target.classList.add('portfolio__active-btn');
        vars.$dataCat.forEach((item) => {
          if (item.dataset.cat != catFilter) {
            item.classList.add('portfolio__hide-work');
            item.classList.remove('portfolio__active-btn');
          } else {
            item.classList.add('portfolio__hide-work');
            if (item.classList.contains('portfolio__fade-in')) {
              item.classList.remove('portfolio__fade-in');
            }
            setTimeout(() => {
              item.classList.remove('portfolio__hide-work');
              item.classList.add('portfolio__fade-in');
            }, 20);
          }
        });
      }
    }
  }
}

vars.$filterList.addEventListener('click', filterFunc, false);
