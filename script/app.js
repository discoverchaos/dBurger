const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
}

let productBtns      = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn        = document.querySelector('.wrapper__navbar-btn'),
    basketModal      = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist  = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount   = document.querySelector('.warapper__navbar-count'),
    btnCard          = document.querySelector('.wrapper__navbar-bottom'),
    print_body       = document.querySelector('.print__body'),
    print_footer     = document.querySelector('.print__footer');

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(btn)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndicator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentIndicator.classList.add('active')
            parentIndicator.innerHTML = po.amount
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()

}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total.toLocaleString()
}
basketBtn.addEventListener('click', function () {
    basketModal.classList.toggle('active')
})
closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})

function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSumm
    }
    return total
}window.addEventListener('click', (e) => {
    const btn = e.target
    if(btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if(attr == '-') product[idProduct].amount--
            // if (product[idProduct].amount == 0) {
            //     let rabotay = document.querySelectorAll('.wrapper__list-count').style.opacity = '0'
            // }
            // for (let i = 0; i < rabotay.length; i++) {
            //     rabotay[i].style.opacity = '0'
            // }
            else if(attr == '+') product[idProduct].amount++
            basket()
        }
    }
})


function cardItemBurger(productData) {
    const {
        name,
        totalSumm: price,
        amount,
        img
    } = productData
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src="${img}" alt="" class="wrapper__navbar-productImage">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice">${price}</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
        </div>
    </div>
    `
}

btnCard.addEventListener('click', function () {
    print_body.innerHTML = ''
    for (const key in product) {
        const {
            name,
            totalSumm,
            amount
        } = product[key]
        if (amount) {
            print_body.innerHTML += `
            <div class="print__body-item">
            <p class="print__body-item_name">
            <span class="name">${name}</span>
            <span class="count">${amount}</span>
            </p>
            <p class="print__body-item__summ">${totalSumm}</p>
            </div>
            `
        }
    }
    print_footer.innerHTML = `Общая сумма заказа: ${totalSummProduct()}сум`
    window.print()
})
