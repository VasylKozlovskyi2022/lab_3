let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculator = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0)
}

calculator();

let generateCartItems = () =>{ 
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x;
            let search = shopIteamData.find((y)=> y.id === id) || []
            return `
            <div class="cart-item">
                <img width="120" height="120" src="${search.img}"/>
                <div clacc="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>                    
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$${(item * search.price).toFixed(2)}</h3>
                </div>
            </div> 
            `;
        }).join(""));
        
    }else{
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `
    }
};

generateCartItems();

let increment = (id) => {
    let selectefItem = id;
    let search = basket.find((x)=> x.id === selectefItem);

    if (search === undefined){
        basket.push({
            id: selectefItem,
            item: 1,
        });
    }else{
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    update(selectefItem);
};

let decrement = (id) => {
    let selectefItem = id;
    let search = basket.find((x) => x.id === selectefItem);

    if(search === undefined) return;
    if(search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectefItem);
    //Вибираєм обєкни які не рівні нулю
    basket = basket.filter((x)=>x.item !== 0)
    generateCartItems();
    //Зберігаєм дані з корзини у локальному сервері
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculator();
    TotalAmount();
};

let removeItem = (id) => {
    let selectefItem = id;
    basket = basket.filter((x)=> x.id !== selectefItem);
    //Зберігаємо в локальному сервері
    localStorage.setItem("data", JSON.stringify(basket));
    TotalAmount();
    calculator();
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () =>{
    basket = [];
    generateCartItems();
    calculator();
    localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopIteamData.find((y)=> y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) =>  x+y,0);
        label.innerHTML = `
        <h2>Total Bill: $${amount.toFixed(2)}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }else{
        return;
    }
};

TotalAmount();