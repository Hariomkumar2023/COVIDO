'use strict';


/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar");
const navToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");


const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);

/**tracker */

const countries = document.querySelector('datalist');
const search = document.querySelector('#srch');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-country');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');
const chart = document.querySelector('.chart');

let dataChart = [];

const API_URL = "https://api.covid19api.com/summary";

async function covid(country){
    countries.innerHTML = `<option value="World">World</option>`
    resetValue(confirmed);
    resetValue(deaths);
    resetValue(recovered);

    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(country)

    if(res.status === 4 || res.status === 200){
        date.textContent = new Date(data.Date).toDateString();

        if(country === '' || country === 'World'){
            const {TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed,NewDeaths,NewRecovered} = data.Global;
            total(TotalConfirmed,TotalDeaths,TotalRecovered);
            newUpdate(NewConfirmed,NewDeaths,NewRecovered);

            nameCountry.textContent = 'The World';
            dataChart = [TotalConfirmed,TotalDeaths,TotalRecovered];
        };
          data.Countries.forEach(item =>{
            const option = document.createElement('option');
            option.value = item.Country;
            option.textContent = item.Country;
            countries.appendChild(option);

            if(country === item.Country){
                total(item.TotalConfirmed,item.TotalDeaths,item.TotalRecovered);
                newUpdate(item.NewConfirmed,item.NewDeaths,item.NewRecovered);

                nameCountry.textContent = item.Country;
                dataChart = [item.TotalConfirmed,item.TotalDeaths,item.TotalRecovered];
            }

        });
      

    }else{
        chart.innerHTML = `<h2>Loading.....</h2>`;
    }
}

const speed = 100;

function counting(target, element){
    const inc = target / speed;
    const count = +element.textContent;
    if(count < target){
        element.textContent = Math.ceil(count + inc);
        setTimeout(()=>{
            counting(target, element)
        },1)

    }else{
        element.textContent = target;
    }
};

function total(Confirmed,Deaths,Recovered){
    counting(Confirmed, confirmed.children[1]);
    // Total Deaths
    counting(Deaths, deaths.children[1]);
    // Total Recovered
    counting(Recovered, recovered.children[1]);
};

function newUpdate(Confirmed,Deaths,Recovered){
   // New Confirmed
   counting(Confirmed, confirmed.children[2]);
   // New Deaths
   counting(Deaths, deaths.children[2]);
   // New Recovered
   counting(Recovered, recovered.children[2]);
};

function resetValue(element){
    element.children[1].textContent = 0;
    element.children[2].textContent = 0;
};



covid(search.value);

const btnSearch = document.querySelector('.butt');
btnSearch.addEventListener('click', (e)=>{
    e.preventDefault();
    covid(search.value);
    search.value = '';
})


