M.AutoInit();



let product = document.querySelectorAll('.item'),
    buttonPlus = document.querySelectorAll('.button-plus'),
    buttonMinus = document.querySelectorAll('.button-minus'),
    itemCounter = document.querySelectorAll('.item-counter');


for (let i = 0; i < product.length; i++) {
    itemCounter[i].textContent = itemCounter[i].dataset.count;
    if (itemCounter[i].dataset.count == 5) {
        buttonPlus[i].style.pointEvents = none;
    } else {
        buttonPlus[i].addEventListener('click', () => {
            itemCounter[i].dataset.count = Number(itemCounter[i].dataset.count) + 1;
            itemCounter[i].textContent = itemCounter[i].dataset.count;
            return itemCounter[i].dataset.count
        })
    }



}