M.AutoInit();
const TOKEN = '1272364794:AAFiiNKTnubqFnMZKsgjAgYjVH3cHVi8uaY'; // токен от BotFather
const CHAT_ID = '-369991492';


if(document.body.clientWidth > 1024){
    document.body.textContent = `сайт доступний тільки на мобільних телефонах та планшетах. Дякуємо за розуміння.`
} else{

let store = {};
let shop = document.querySelector('#cardShop');
let cart = document.querySelector('#siteCart');
let form = document.querySelector('#formCart');
let allPrice = document.querySelector('#allPrice');
let cartPrice;
let mainContainer = [];



let client = contentful.createClient({
    space: 'n4lihpuy3y0a',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'Q-B6HxCCjpFC_SBefFgkdsRamhRw2xFhH2orGfUTvcQ'
})

let waitStore = new Promise((resolve, reject) => {
    client.getEntries()
        .then(function(entries) {
            entries.items.forEach(function(entry) {
                if (entry.sys.contentType.sys.id == 'Product') {
                    store[entry.fields.articul] = entry.fields
                    store[entry.fields.articul]['count'] = 0;
                }
            })
            resolve(store);
        });
})

waitStore.then(function() {
    function renderShop() {
        shop.textContent = '';


function startCategory (){
    const checkList = Object.keys(store).map((item) => {
        return store[item].category
    })
    const uniqueSet = new Set(checkList)
    const backToArray = [...uniqueSet]
    mainContainer.push(backToArray)
    // console.log(backToArray)
}
        startCategory()

        let disclaimer = document.createElement('div');
        disclaimer.className = 'disclaimer';
        disclaimer.innerHTML = `
            <p>Сьогодні працюємо з 9:00 до 20:00</p>
            <p>На приготування замовлення нам потрібно до 20 хвилин.</p>
            <p>Всі ціни вказані у гривнях.</p>
        `

        shop.append(disclaimer)






        let headerMenuList = document.createElement("nav")
        headerMenuList.classList.add("header__menu")
    for (let id in store ){
        headerMenuList.innerHTML = `
                <ul class="header__list">
                <li><button class="header__btn" data-category="${id.category}">Все меню</button></li>
                <li><button class="header__btn" data-category="${id.category}">Бургери</button></li>
                <li><button class="header__btn" data-category="${id.category}">Закуски</button></li>
                <li><button class="header__btn" data-category="${id.category}">Напої</button></li>
                </ul>`
        console.log(store)
        console.log(id)
        console.log(id.category)
    }


        disclaimer.append(headerMenuList)

        for (let id in store) {
            let item = document.createElement('article');
            id = store[id];
            let countNumb = id.count;
            if (countNumb) {
                countNumb = id.count;
            } else {
                countNumb = 0;
            }
            let img = id.photo.fields;
            item.className = 'item';
            item.dataset.articul = id.articul;
            item.dataset.category = id.category
            item.innerHTML = `
                         <img src="${img.file.url}" class="img_product" alt="${img.title}">
                        <div class="item-header">
                            <h2>${id.title}</h2>
                            <p>Склад: ${id.desc}</p>
                        </div>
                        <div class="price">
                            <h3 class="item-price number">${id.price_grn}</h3>
                            <div class="price__counter">
                                <button class="button-minus" data-articul="${id.articul}">-</button>
                                <p class="item-counter number" data-count="${countNumb}">${countNumb}</p>
                                <button class="button-plus" data-articul="${id.articul}">+</button>
                            </div>
                        </div>
                    `
            shop.append(item);
        }

        createButton = document.createElement('div');
        createButton.className = 'button-go-cart'
        createButton.innerHTML = `
                                    <a href='#' class="go-to-cart">Замовити</a>

                                    `
        shop.append(createButton);
        document.querySelector(".go-to-cart").addEventListener('click', e => {
            e.preventDefault();
            var instance = M.Tabs.getInstance(document.querySelector(".tabs"));
            instance.select("mainCart");
          });
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
        cartPrice = 0;
        let allCount = 0;


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
                let img = id.photo.fields;
                id.totalPrice = countNumb * id.price_grn;


                itemCart.innerHTML = `
                <div class="info">
                    <h3 class="item-title">${id.title}</h3>
                </div>
                <div class="info__counter">
                        <button class="button-minus" data-articul="${id.articul}">-</button>
                        <p class="item-counter number" data-count="${countNumb}">${countNumb}</p>
                        <button class="button-plus" data-articul="${id.articul}">+</button>
                    </div>
                <div class="cart-right">
                    <div class="total-price number" data-articul="${id.articul}">${id.totalPrice} <span>Грн.</span></div>
                    <button class="delete-item" data-articul="${id.articul}">Видалити</button>
                </div>
                    `
                cart.append(itemCart);
                cartPrice += id.totalPrice;
                allCount += countNumb;
            }
            document.querySelector('.counter-cart').setAttribute('data-count', allCount)
            // allPrice.dataset.price = cartPrice;
            allPrice.innerHTML = `<p>Сумма замовлення: <span class="number">${cartPrice}</span> Грн</p>`;
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

    const headerBtnParent = document.querySelector('.header__list'),
        headerBtn = document.querySelectorAll('.header__btn'),
        headerItems = document.querySelectorAll('.item');
    function hiddenContent(){
        headerItems.forEach(item => {
            item.style.display = "none"
        })
    }
    function showContent(i = 0){
        headerItems.forEach(item => {
            item.style.display = "flex"
        })
    }
    // hiddenContent();
    showContent();
    headerBtnParent.addEventListener('click', function (event){
        let target = event.target
            if (target && target.classList.contains('header__btn')){
                headerBtn.forEach((item,i) => {
                if (target === item){
                    headerItems.forEach((item,i) => {
                        // for (let i = 0; i < headerItems.length; i++){
                        console.log(headerItems)
                        console.log(item)
                            if (headerBtn.dataset.category === item[i].dataset.category){
                                // showContent(i)
                                item.style.display="flex"
                            }else{
                                // hiddenContent()
                                item.style.display="none"
                            }

                        // }
                    })
                    }

                })

    }
    })


    function renderForm() {
        form.textContent = '';
        let CurrentTime = new Date();
        CurrentTime.setTime(CurrentTime.getTime() + 20*60*1000);
        let timeNow;
        if(CurrentTime.getHours()+":"+CurrentTime.getMinutes() < "08:00" || CurrentTime.getHours()+":"+CurrentTime.getMinutes() > "19:40" ){
            timeNow = "08:20";
        } else {
            timeNow = CurrentTime.getHours()+":"+CurrentTime.getMinutes();
        }
        let cartForm = document.createElement('form');
        cartForm.className = 'col s12 form-cart';
        cartForm.innerHTML = `
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">account_circle</i>
                <input placeholder="Ваше ім'я" id="first_name" autocomplete="on" required type="text" class="validate form-cart-input">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">phone</i>
                <input placeholder="Ваш номер телефону" autocomplete="true" pattern="[0-9]{6,11}" id="telephone" required type="tel" data-error="Введіть корректний номер телефону" class="validate form-cart-input">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">timer</i>
                <input placeholder="О котрій на вас чекати?"  id="time" value="${timeNow}" required type="text" min="${timeNow}" max="19:30" step="1200" class="timepicker form-cart-input">
                </div>
            </div>
            <div className="row">
                <p>
                    Якщо у вас є якісь побажання або ви маєте алергію на якийсь із інгредієнтів - вкажіть це в коментарях!
                </p>
                <div class="input-field col s12">
                <textarea id="textarea1" placeholder="Коментар" class="materialize-textarea"></textarea>
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
                        return submitCart.disabled = true;
                    } else if(document.querySelector('#time').value < timeNow || document.querySelector('#time').value > document.querySelector('#time').max ){
                        return submitCart.disabled = true;
                    }
                    else {
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
                    \n\n Товар: ${store[id].title}
                    \n Количество: ${store[id].count} шт.
                    \n Цена: ${store[id].price_grn} грн.
                    `
                }
            }
            objCart["product"] = product;
            objCart["fullPrice"] = cartPrice;
            objCart["comment"] = document.querySelector('#textarea1').value;


            sendMsg(objCart)

        })

        function sendMsg(data) {
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
                \n*Коментар:*   ${data.comment}.
                \n*Заказ:*  ${data.product}
                `
            });



            var xhr = new XMLHttpRequest(); // инициализируем AJAX запрос
            xhr.open('POST', url, true); // отправляем наше сообщение методом POST на сервак телеги
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // на всякий случай, оповестим телеграм, что отправили JSON
            xhr.send(body);

            clearCart()
            renderCart()
        }

        function clearCart() {
            for (let id in store) {
                store[id].count = 0;
            }
            alert('Дякуємо за замовлення! Ми зателефонуємо вам протягом 10 хв для підтвердженя.');
            location.href = '/';
        }

    }


})

}
// document.querySelector('#cardShop').innerHTML = out;