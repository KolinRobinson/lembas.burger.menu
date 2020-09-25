M.AutoInit();


let store = {};
let shop = document.querySelector('#cardShop')

    let client = contentful.createClient({
        space: 'ffbcm6lpk46x',
            environment: 'master', // defaults to 'master' if not set
            accessToken: 'XW8MZTmiDrHY1hwJ7WkZ8zuRCuhmdKNkYLBa1la7xiM'
        })
        client.getEntries()
        .then(function (entries) {
            let product = {};
        entries.items.forEach(function (entry) {
            if(entry.sys.contentType.sys.id == 'product') {
                product[entry.fields.articul] = entry.fields;
            }
        })
            store = product;
            console.log(store)
            shop.textContent = '';
            for(let id in store){
                let item = document.createElement('article');
                id = store[id];
                id.count = 0;
                let img = id.image.fields;
                item.className = 'item';
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
                            <p class="item-counter" data-count="${id.count}">${id.count}</p>
                            <button class="button-plus" data-articul="${id.articul}">+</button>
                        </div>
                    </div>
                `

                shop.append(item);

            }
            return store;

        });

        document.addEventListener('DOMContentLoaded', function(){
            let counter = document.querySelectorAll(".item-counter");
            console.log(store)
            for(let i in counter){
                console.log(store)
                console.log(counter[i])
                console.log(counter)
                counter[i].innerText = store[i].count;
                //  = this.store.count
            }

            document.onclick = e => {
                if(e.target.classList.contains('button-plus')){
                    plusFunction(e.target.dataset.articul);
                } else if(e.target.classList.contains('button-minus')){
                    minusFunction(e.target.dataset.articul);
                } else {
                    return false;
                }
            }

            const plusFunction = (id) => {
                console.log(store[id].count)
                if(store[id].count >= 0){
                     store[id].count += 1
                     console.log(store[id])
                } else{
                     store[id].count = 0
                }
            }

        })





// document.querySelector('#cardShop').innerHTML = out;