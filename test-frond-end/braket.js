"use strict";

var returnObj = JSON.parse(localStorage.getItem("myKey"))

let DeleteAllButton = document.getElementById("delete-all");
DeleteAllButton.addEventListener('click', event=> basket.DeleteAll(event));
let AllPriceText = document.querySelector('.all-price');


    const  basket = {
        settings: {
            countSelector: '#basket-count',

        },

    init (){
        this.create();

        let elems = document.querySelectorAll('.delete-btn');
        for(let i = 0; i < elems.length; i++) {
            elems[i].addEventListener('click', event=> this.ClickHandler(event));
        }

        this.render();
        if (returnObj.names.length > 0) {
            DeleteAllButton.className = 'show';

            let total = 0;
            for(var i in returnObj.prices) { total += parseInt(returnObj.prices[i]); }

            AllPriceText.textContent = `Общая цена ${total}`;
        }
        else {
            DeleteAllButton.className = 'hidden';
            AllPriceText.textContent = 'Корзина пуста';
        }

    },

        DeleteAll(event) {
        returnObj.names = [];
        returnObj.prices = [];
        returnObj.item = [];
        returnObj.img = [];
            window.location.reload();

            this.render();
        },

        ClickHandler(event) {

        let a = event.target.dataset.number;

            returnObj.names.splice(a, 1);
            returnObj.img.splice(a, 1);
            returnObj.item.splice(a, 1);
            returnObj.prices.splice(a, 1);

            this.render();

            window.location.reload();

        },

     create(){
        const items = document.querySelector('#items');
         for (let i = 0; i < returnObj.names.length; i++) {
             const Item = document.createElement('div');
             Item.classList.add('item');

             const ItemH2 = document.createElement('h2');
             ItemH2.textContent = returnObj.names[i];

             const ItemImg = document.createElement('a');
             ItemImg.setAttribute('href', '#');
             ItemImg.innerHTML = `<img src="${returnObj.img[i]}" alt="product-image">`;

             const ItemPrice = document.createElement('h3');
             ItemPrice.textContent = `Цена: ${returnObj.prices[i]}`;

             const ItemDeleteButton = document.createElement('button');
             ItemDeleteButton.classList.add('delete-btn');
             ItemDeleteButton.innerHTML = 'Удалить';
             ItemDeleteButton.setAttribute('data-number', `${i}`);


             Item.appendChild(ItemH2);
             Item.appendChild(ItemImg);
             Item.appendChild(ItemPrice);
             Item.appendChild(ItemDeleteButton);
             items.appendChild(Item);
         }
     },

    render()  {
    let counts = document.querySelector(this.settings.countSelector);
    counts.textContent = `(${returnObj.names.length})`;


        var serialObj = JSON.stringify(returnObj); //сериализуем его

        localStorage.setItem("myKey", serialObj);

    },

    };


basket.init();
