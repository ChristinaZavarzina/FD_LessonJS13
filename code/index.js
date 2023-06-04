'use strict'

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(function() {
    const preloader = document.getElementById("page__preloader");
    if (!preloader.classList.contains("done")) {
      preloader.classList.add("done");
    }
  }, 1500)

  async function getResponse() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
    return data
  }

  async function main() {
    const commentData = await getResponse();
    let currPage = 1;
    let rows = 30;

    function comments(arrData, rowPage, page) {
      const elComm = document.querySelector('.comments');
      elComm.innerHTML = '';
      page--;

      const start = rowPage * page;
      const end = start + rowPage;
      const paginationData = arrData.slice(start, end);

      paginationData.forEach((elem) => {
        const commentEl = document.createElement('div');
        commentEl.classList.add('card');
        commentEl.innerText = 
        `${elem.id}
        ${elem.name}
        ${elem.email}
        ${elem.body}`;
        elComm.append(commentEl);
      })
    }
    function pagination(arrData, rowPage) {
      const paginations = document.querySelector('.paginations');
      const pagesCount = Math.ceil(arrData.length / rowPage);
      const ulElem = document.createElement('ul');
      ulElem.classList.add('paginations__list');

      for (let i = 0; i < pagesCount; i++) {
        const liElem = paginationBtn(i + 1);
        ulElem.append(liElem);
      }
      paginations.append(ulElem);
    }
    function paginationBtn(page) {
      const liElems = document.createElement('li');
      liElems.classList.add('paginations__item');
      liElems.innerText = page;

      if (currPage == page) liElems.classList.add('paginations__item--active');

      liElems.addEventListener('click', () => {
        currPage = page;
        comments(commentData, rows, currPage);

        let currPageLi = document.querySelector('li.paginations__item--active');
        currPageLi.classList.remove('paginations__item--active');
        liElems.classList.add('paginations__item--active');
      })
      return liElems;
    }
    comments(commentData, rows, currPage);
    pagination(commentData, rows);
  }
  main();
});


