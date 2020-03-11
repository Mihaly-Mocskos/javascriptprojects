const main = document.getElementById('main');
const addUserbtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showmillionaresBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];  // since its let we can reassign it

getRandomUser();
getRandomUser();
getRandomUser();
//fetch  random user and add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    // console.log(data);

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    // console.log(newUser);
    addData(newUser);
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDom();
}
// adding a new obj to data arr

function addData(obj) {
    data.push(obj);

    updateDom();
}

function sortMoney() {
    data.sort((a, b) => b.money - a.money);

    updateDom();
}

function filterWealthmillionaires() {
    data = data.filter(item => item.money > 1000000);
    updateDom();
}

function wealthCalculater() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth: <strong>
    ${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}
//update DOM

function updateDom(providedData = data) {
    //clearing the main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
        // csinalok egy elementet a create elementtel pl divet
        //a divhez adok classt pl person ,, classlist add -al
        // a mainbe lehivom az uj elementet az appenchild fukncioval


    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listeners 

addUserbtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showmillionaresBtn.addEventListener('click', filterWealthmillionaires);
calculateWealthBtn.addEventListener('click', wealthCalculater);