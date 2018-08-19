"use strict"




var returnObj = JSON.parse(localStorage.getItem("myKey"));






const basket = {
    settings: {
        countSelector: '#basket-count',

    },

    items: {
        names: (returnObj != null) ? returnObj.names : [],
        prices: (returnObj != null) ? returnObj.prices : [],
        img: (returnObj != null) ? returnObj.img : [],
        item: (returnObj != null) ? returnObj.item : [],
    },




    init(settings = {}) {
        let elems = document.querySelectorAll('.buy-btn');
        for(let i = 0; i < elems.length; i++) {
            elems[i].addEventListener('click', event=> this.ClickHandler(event));
        }

        this.render();
    },

    ClickHandler(event) {
      this.add(event);


    },


    render() {

        let counts = document.querySelector(this.settings.countSelector);

        if (returnObj != null && returnObj.names.length > this.items.names.length) {
            counts.textContent = `(${returnObj.names.length})`;
        }
      else {
            counts.textContent = `(${this.items.names.length})`;
        }

    },


    add(event) {
        let count = parseInt(this.items.names.length)
        this.items.item.push(count);
        this.items.names.push(event.target.dataset.name);
        this.items.prices.push(event.target.dataset.price);
        this.items.img.push(event.target.dataset.img);



        var serialObj = JSON.stringify(basket.items); //сериализуем его

        localStorage.setItem("myKey", serialObj);


        if (returnObj != null) {
            if (this.items.names.length > returnObj.names.length) {

                this.render();
            }
        }
        this.render();
    },
};

basket.init();




