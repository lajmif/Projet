

/* login */ 
var btnLogin = document.getElementById('do-login');
var idLogin = document.getElementById('login');
var username = document.getElementById('username');
btnLogin.onclick = function(){
  idLogin.innerHTML = '<p>We\'re happy to see you again, </p><h1>' +username.value+ '</h1>';
}


/* slideshow */

// let slideIndex = [1,1];
// let slideId = ["mySlides1"]
// showSlides(1, 0);
// showSlides(1, 1);

// function plusSlides(n, no) {
//   showSlides(slideIndex[no] += n, no);
// }

// function showSlides(n, no) {
//   let i;
//   let x = document.getElementsByClassName(slideId[no]);
//   if (n > x.length) {slideIndex[no] = 1}    
//   if (n < 1) {slideIndex[no] = x.length}
//   for (i = 0; i < x.length; i++) {
//      x[i].style.display = "none";  
//   }
//   x[slideIndex[no]-1].style.display = "block";  
// }

// DUMMY PRODUCTS (PRODUCT ID : DATA)
var products = {
  123: {
    name : "MokBook Thicc",
    desc : "Greatest properly off ham exercise all.",
    img : "dummy-pdt-b.jpg",
    price : 2034
  },
  124: {
    name : "MokBook Rookie",
    desc : "Unsatiable its possession nor off.",
    img : "dummy-pdt-b.jpg",
    price : 1247
  },
  125: {
    name : "iPong Max",
    desc : "All difficulty unreserved the solicitude.",
    img : "dummy-pdt-a.jpg",
    price : 675
  },
  126: {
    name : "iTab Pok",
    desc : "Had judgment out property the supplied. ",
    img : "dummy-pdt-a.jpg",
    price : 842
  }
};

var cart = {
  // (A) PROPERTIES
  hPdt : null,      // html products list
  hItems : null,    // html current cart
  items : {},       // current items in cart
  iURL : "images/", // product image url folder
};

// (B) LOCALSTORAGE CART
// (B1) SAVE CURRENT CART INTO LOCALSTORAGE
save : () => {
  localStorage.setItem("cart", JSON.stringify(cart.items));
},

// (B2) LOAD CART FROM LOCALSTORAGE
load : () => {
  cart.items = localStorage.getItem("cart");
  if (cart.items == null) { cart.items = {}; }
  else { cart.items = JSON.parse(cart.items); }
},
  
// (B3) NUKE CART!
nuke : () => { if (confirm("Empty cart?")) {
  cart.items = {};
  localStorage.removeItem("cart");
  cart.list();
}}


// (D) LIST CURRENT CART ITEMS (IN HTML)
list : () => {
  // (D1) RESET
  cart.hItems.innerHTML = "";
  let item, part, pdt, empty = true;
  for (let key in cart.items) {
    if (cart.items.hasOwnProperty(key)) { empty = false; break; }
  }

  // (D2) CART IS EMPTY
  if (empty) {
    item = document.createElement("div");
    item.innerHTML = "Cart is empty";
    cart.hItems.appendChild(item);
  }
    
  // (D3) CART IS NOT EMPTY - LIST ITEMS
  else {
    let template = document.getElementById("template-cart").content,
        p, total = 0, subtotal = 0;
    for (let id in cart.items) {
      // (D3-1) PRODUCT ITEM
      p = cart.products[id];
      item = template.cloneNode(true);
      item.querySelector(".c-del").onclick = () => { cart.remove(id); };
      item.querySelector(".c-name").textContent = p.name;
      item.querySelector(".c-qty").value = cart.items[id];
      item.querySelector(".c-qty").onchange = function () { cart.change(id, this.value); };
      cart.hItems.appendChild(item);
      // (D3-2) SUBTOTAL
      subtotal = cart.items[id] * p.price;
      total += subtotal;
    }

    // (D3-3) TOTAL AMOUNT
    item = document.createElement("div");
    item.className = "c-total";
    item.id = "c-total";
    item.innerHTML ="TOTAL: $" + total;
    cart.hItems.appendChild(item);
    // (D3-4) EMPTY & CHECKOUT
    item = document.getElementById("template-cart-checkout").content.cloneNode(true);
    cart.hItems.appendChild(item);
  }
}// (D) LIST CURRENT CART ITEMS (IN HTML)
list : () => {
  // (D1) RESET
  cart.hItems.innerHTML = "";
  let item, part, pdt, empty = true;
  for (let key in cart.items) {
    if (cart.items.hasOwnProperty(key)) { empty = false; break; }
  }

  // (D2) CART IS EMPTY
  if (empty) {
    item = document.createElement("div");
    item.innerHTML = "Cart is empty";
    cart.hItems.appendChild(item);
  }
    
  // (D3) CART IS NOT EMPTY - LIST ITEMS
  else {
    let template = document.getElementById("template-cart").content,
        p, total = 0, subtotal = 0;
    for (let id in cart.items) {
      // (D3-1) PRODUCT ITEM
      p = cart.products[id];
      item = template.cloneNode(true);
      item.querySelector(".c-del").onclick = () => { cart.remove(id); };
      item.querySelector(".c-name").textContent = p.name;
      item.querySelector(".c-qty").value = cart.items[id];
      item.querySelector(".c-qty").onchange = function () { cart.change(id, this.value); };
      cart.hItems.appendChild(item);

      // (D3-2) SUBTOTAL
      subtotal = cart.items[id] * p.price;
      total += subtotal;
    }

    // (D3-3) TOTAL AMOUNT
    item = document.createElement("div");
    item.className = "c-total";
    item.id = "c-total";
    item.innerHTML ="TOTAL: $" + total;
    cart.hItems.appendChild(item);
    // (D3-4) EMPTY & CHECKOUT
    item = document.getElementById("template-cart-checkout").content.cloneNode(true);
    cart.hItems.appendChild(item);
  }
}

// (E) ADD ITEM INTO CART
add : (id) => {
  if (cart.items[id] == undefined) { cart.items[id] = 1; }
  else { cart.items[id]++; }
  cart.save(); cart.list();
},

// (F) CHANGE QUANTITY
change : (pid, qty) => {
  // (F1) REMOVE ITEM
  if (qty <= 0) {
    delete cart.items[pid];
    cart.save(); cart.list();
  }

  // (F2) UPDATE TOTAL ONLY
  else {
    cart.items[pid] = qty;
    var total = 0;
    for (let id in cart.items) {
      total += cart.items[id] * products[id].price;
      document.getElementById("c-total").innerHTML ="TOTAL: $" + total;
    }
  }
},
  
// (G) REMOVE ITEM FROM CART
remove : (id) => {
  delete cart.items[id];
  cart.save();
  cart.list();
},
  
// (H) CHECKOUT
checkout : () => {
  // SEND DATA TO SERVER
  // CHECKS
  // SEND AN EMAIL
  // RECORD TO DATABASE
  // PAYMENT
  // WHATEVER IS REQUIRED
  alert("TO DO");

  /*
  var data = new FormData();
  data.append("cart", JSON.stringify(cart.items));
  data.append("products", JSON.stringify(products));
  fetch("SERVER-SCRIPT", { method:"POST", body:data })
  .then(res=>res.text()).then((res) => {
    console.log(res);
  })
  .catch((err) => { console.error(err); });
  */
}