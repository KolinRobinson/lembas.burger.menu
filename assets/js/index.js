M.AutoInit();
const TOKEN = '1074223510:AAEe-0iWEyHHKiTfqAM_mhrPOuObLuC9DRs'; // токен от BotFather
const CHAT_ID = '-333712879';


let store = {};
let shop = document.querySelector('#cardShop');
let cart = document.querySelector('#siteCart');
let form = document.querySelector('#formCart');
let allPrice = document.querySelector('#allPrice');


let client = contentful.createClient({
    space: 'ffbcm6lpk46x',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'XW8MZTmiDrHY1hwJ7WkZ8zuRCuhmdKNkYLBa1la7xiM'
})

let waitStore = new Promise((resolve, reject) => {
    client.getEntries()
        .then(function(entries) {
            entries.items.forEach(function(entry) {
                if (entry.sys.contentType.sys.id == 'product') {
                    store[entry.fields.articul] = entry.fields
                }
            })
            resolve(store);
        });
})


waitStore.then(function() {
    function renderShop() {
        shop.textContent = '';

        for (let id in store) {
            let item = document.createElement('article');
            id = store[id];
            let countNumb = id.count;
            if (countNumb) {
                countNumb = id.count;
            } else {
                countNumb = 0;
            }
            let img = id.image.fields;
            item.className = 'item';
            item.dataset.articul = id.articul;
            item.innerHTML = `
                        <div class="item-header">
                            <img src="${img.file.url}" alt="${img.title}">
                            <h2>${id.name}</h2>
                        </div>

                        <p>${id.description}</p>
                        <div class="price">
                            <h3 class="item-price">price: <span><b>${id.price} UAH</b></span></h3>
                            <div class="price__counter">
                                <button class="button-minus" data-articul="${id.articul}">-</button>
                                <p class="item-counter" data-count="${countNumb}">${countNumb}</p>
                                <button class="button-plus" data-articul="${id.articul}">+</button>
                            </div>
                        </div>
                    `
            shop.append(item);
        }
    }
    renderShop()




    document.onclick = e => {
        if (e.target.classList.contains('button-plus')) {
            plusFunction(e.target.dataset.articul);
        } else if (e.target.classList.contains('button-minus')) {
            minusFunction(e.target.dataset.articul);
        } else if (e.target.classList.contains('delete-item')) {
            deleteItemCart(e.target.dataset.articul);
        } else {
            return false;
        }
    }



    const plusFunction = (id) => {
        if (store[id].count >= 0) {
            store[id].count++
                renderShop()
            renderCart()
        } else {
            store[id].count = 0
        }
    }

    const minusFunction = (id) => {
        if (store[id].count >> 0) {
            store[id].count--
                renderShop()
            renderCart()
        } else {
            store[id].count = 0
        }
    }

    const deleteItemCart = id => {
        store[id].count = 0;
        renderCart()
    }


    function renderCart() {
        cart.textContent = '';
        let cartPrice = 0;

        for (let id in store) {
            if (store[id].count >> 0) {
                let itemCart = document.createElement('div');
                id = store[id];
                itemCart.className = 'item-cart';
                let countNumb = id.count;
                if (countNumb) {
                    countNumb = id.count;
                } else {
                    countNumb = 0;
                }
                let img = id.image.fields;
                id.totalPrice = countNumb * id.price;


                itemCart.innerHTML = `
                <div class="cart-left">
                <div class="cart-img">
                <img src="${img.file.url}" alt="${img.title}">
                </div>
                <div class="info">
                    <h3 class="item-title">${id.name}</h3>
                    <div class="info__counter">
                        <button class="button-minus" data-articul="${id.articul}">-</button>
                        <p class="item-counter" data-count="${countNumb}">${countNumb}</p>
                        <button class="button-plus" data-articul="${id.articul}">+</button>
                    </div>
                </div>
            </div>
            <div class="cart-right">
                <div class="total-price" data-articul="${id.articul}">${id.totalPrice} Грн.</div>
                <button class="delete-item" data-articul="${id.articul}">Видалити</button>
            </div>
                    `
                cart.append(itemCart);
                cartPrice += id.totalPrice;
            }

            allPrice.dataset.price = cartPrice;
            allPrice.textContent = `Сумма замовлення: ${cartPrice} Грн`;

        }
        if (cart.textContent == '') {
            cart.textContent = 'Нажаль в вашій корзині немає товарів'
            allPrice.textContent = '';
            form.textContent = '';
        } else {
            renderForm();
        }
    }
    renderCart()



    function renderForm() {
        form.textContent = '';

        let cartForm = document.createElement('form');
        cartForm.className = 'col s12 form-cart';
        cartForm.innerHTML = `
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">account_circle</i>
                <input placeholder="Ваше ім'я" id="first_name" required type="text" class="validate form-cart-input">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">phone</i>
                <input placeholder="Ваш номер телефону" id="telephone" required type="tel" class="validate form-cart-input">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">timer</i>
                <input placeholder="О котрій на вас чекати?" id="time" required type="text" class="timepicker form-cart-input">
                </div>
            </div>
            <button id="submitCart" class="btn waves-effect waves-light" type="submit">Замовити
                <i class="material-icons right">send</i>
            </button>
        `
        form.append(cartForm);
        var elems = document.querySelectorAll('.timepicker');
        var options = {
            twelveHour: false
        };
        M.Timepicker.init(elems, options);

        let submitCart = document.querySelector('#submitCart');
        let inputs = document.querySelectorAll('.form-cart-input');
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                submitCart.disabled = true;
            }
            inputs[i].addEventListener('change', () => {
                for (let i = 0; i < inputs.length; i++) {
                    if (!inputs[i].value) {
                        submitCart.disabled = true;
                    } else {
                        submitCart.disabled = false;
                    }
                }
            })

        }

        submitCart.addEventListener('click', e => {
            e.preventDefault();
            let objCart = {};
            let product = "";

            for (let i = 0; i < inputs.length; i++) {
                objCart[inputs[i].id] = inputs[i].value
            }
            for (let id in store) {
                if (store[id].count >> 0) {
                    product += `
                    \n\n Товар: ${store[id].name}
                    \n Количество: ${store[id].count} шт.
                    \n Цена: ${store[id].price} грн.
                    `
                }
            }
            objCart["product"] = product;
            objCart["fullPrice"] = allPrice.dataset.price;


            sendMsg(objCart)
        })

        function sendMsg(data) {
            console.log(data)
            let url = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage'; // токен бота


            let body = JSON.stringify({ // склеиваем объект в JSON строку
                chat_id: CHAT_ID,
                parse_mode: 'Markdown', // разметка сообщений вкл (чтобы использовать *жирный текст*)
                text: `
                *Новый заказ*\n
                \n*Имя:*   ${data.first_name}
                \n*Телефон:*   ${data.telephone}
                \n*Во сколько нужен заказ:*   ${data.time}
                \n*Стоимость заказа:*   ${data.fullPrice} грн
                \n*Заказ:*  ${data.product}
                `
            });

            clearCart()

            var xhr = new XMLHttpRequest(); // инициализируем AJAX запрос
            xhr.open('POST', url, true); // отправляем наше сообщение методом POST на сервак телеги
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // на всякий случай, оповестим телеграм, что отправили JSON
            xhr.send(body);
        }

        function clearCart() {
            for (let id in store) {
                store[id].count = 0;
            }
        }

    }


})





// document.querySelector('#cardShop').innerHTML = out;