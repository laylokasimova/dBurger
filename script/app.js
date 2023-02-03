const product = {
  crazy: {
    name: "Crazy",
    price: 31000,
    img: "images/products/burger-1.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  light: {
    name: "Light",
    price: 26000,
    img: "images/products/burger-2.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    name: "CheeseBurger",
    price: 29000,
    img: "images/products/burger-3.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  dburger: {
    name: "dBurger",
    price: 31000,
    img: "images/products/burger-4.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
};

const navbarBtn = document.querySelector(".wrapper__navbar-btn");
const navbarCount = document.querySelector(".warapper__navbar-count");
const navbarBasket = document.querySelector(".wrapper__navbar-basket");
const navbarPrice = document.querySelector(".wrapper__navbar-totalprice");
const navbarClose = document.querySelector(".wrapper__navbar-close");
const navbarMain = document.querySelector(".wrapper__navbar-checklist");
const wrapperBtn = document.querySelector(".wrapper-bottom_title");
const listBtn = document.querySelectorAll(".wrapper__list-btn");
const printBody = document.querySelector(".print__body");
const printFooter = document.querySelector(".print__footer");

navbarBtn.addEventListener("click", () => {
  if (navbarBasket.classList.contains("active")) {
    navbarBasket.classList.remove("active");
  } else {
    navbarBasket.classList.add("active");
  }
});
navbarClose.addEventListener("click", () => {
  navbarBasket.classList.remove("active");
});
listBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    wrapper__list(btn);
  });
});

function wrapper__list(btn) {
  let parrent = btn.closest(".wrapper__list-card");
  let parrentID = parrent.getAttribute("id");
  product[parrentID].amount++;
  basket();
}

function basket() {
  let productArr = [];
  for (const key in product) {
    let prKey = product[key];
    let prCard = document.querySelector(`#${key}`);
    let prIndecator = prCard.querySelector(".wrapper__list-count");
    if (prKey.amount) {
      productArr.push(prKey);
      prIndecator.classList.add("active");
      prIndecator.innerHTML = prKey.amount;
    } else {
      prIndecator.classList.remove("active");
      prIndecator.innerHTML = "";
    }
  }
  const allCount = totalCountProduct();
  if (allCount) {
    navbarCount.classList.add("active");
  } else {
    navbarCount.classList.remove("active");
  }
  navbarCount.innerHTML = allCount.toLocaleString();
  navbarPrice.innerHTML = countProductTotalPrice() + " сум";

  navbarMain.innerHTML = "";
  for (let i = 0; i < productArr.length; i++) {
    navbarMain.innerHTML += cardItemAdd(productArr[i]);
  }
}

function totalCountProduct() {
  let total = 0;
  for (const key in product) {
    total += product[key].amount > 0 ? 1 : 0;
  }
  return total;
}

function countProductTotalPrice() {
  let total = 0;
  for (const key in product) {
    total += product[key].totalSum;
  }
  return total.toLocaleString();
}

function cardItemAdd(productObj) {
  const { name, img, totalSum, amount } = productObj;

  return `
    <div class="wrapper-main__cart">
    <div class="wrapper-main__cart-info">
        <img src="${img}" alt="" class="wrapper-main__img">
        <div class="wrapper-main__text">
            <h3 class="wrapper-main__text-title">${name}</h3>
            <p class="wrapper-main__text-sub">
                ${totalSum.toLocaleString()} <span> сум</span>
            </p>
        </div>
    </div>
    <div class="plus-or-mines" id="${name.toLowerCase()}_card">
        <button class="plus-or-mines__symb" data-symbol="-">
            -
        </button>
        <span class="plus-or-mines__text">${amount}</span>
        <button class="plus-or-mines__symb" data-symbol="+">
            +
        </button>
    </div>
</div>
    `;
}

window.addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.classList.contains("plus-or-mines__symb")) {
    const attr = btn.getAttribute("data-symbol");
    const parrent = btn.closest(".plus-or-mines");
    if (parrent) {
      const idParrent = parrent.getAttribute("id").split("_")[0];
      if (attr == "-") product[idParrent].amount--;
      else if (attr == "+") product[idParrent].amount++;
      basket();
    }
  }
});

wrapperBtn.addEventListener("click", () => {
  printBody.innerHTML = "";
  for (const key in product) {
    const { name, totalSum, amount } = product[key];
    if (amount) {
      printBody.innerHTML += `
      <div class="print__body-item">
        <p class="print__body-item_name">
          <span class="name">${name}</span>
          <span class="count">${amount} шт: </span>
        </p>
        <p class="print__body-item_summ">${totalSum} сум</p>
      </div>    
      `;
    }
  }
  printFooter.innerHTML = `${countProductTotalPrice()}сум`;
  window.print()
});
