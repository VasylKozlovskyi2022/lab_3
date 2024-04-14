let shop = document.getElementById('shop');

//отримання даних із локального сховища браузера 
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopIteamData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id="product-id-${id}" class="item">
            <img width="320" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    }).join(""));
}

generateShop()

let increment = (id) => {
    let selectefItem = id;
    let search = basket.find((x) => x.id === selectefItem);

    if (search === undefined) {
        basket.push({
            id: selectefItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selectefItem);
};

let decrement = (id) => {
    let selectefItem = id;
    let search = basket.find((x) => x.id === selectefItem);

    if (search === undefined) return;
    if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectefItem);
    //Вибираєм обєкни які не рівні нулю
    basket = basket.filter((x) => x.item !== 0)
    //Зберігаєм дані з корзини у локальному сервері
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;

    calculator();
};

let calculator = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculator();

//------------

let barCharts = () => {
    var xValues = shopIteamData.map(x => x.name);
    var yValues = [];
    for (let i = 1; i <= 12; i++) {
        let search = basket.find((x) => x.id === i);
        if (search !== undefined) {
            yValues.push(search.item);
        } else {
            yValues.push(0);
        }
    }
    var barColors = ["blue", "black", "green", "red", "gray", "orange", "purple", "yellow",];
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "World Wine Production 2018"
            }
        }
    });
}

function outputBarChart() {
    var button = document.getElementById("barChart");
    var output = document.getElementById("graphs");
    output.innerHTML = '';
    button.addEventListener("click", function() {
        output.innerHTML = '';
        var canvas = document.createElement("canvas");
        canvas.id = "myChart";
        canvas.style.width = "100%";
        canvas.style.maxWidth = "600px";
        output.appendChild(canvas);
        barCharts();
    });
}

let pieCharts = () => {
    var xValues = shopIteamData.map(x => x.name);
    var yValues = [];
    for (let i = 1; i <= 12; i++) {
        let search = basket.find((x) => x.id === i);
        if (search !== undefined) {
            yValues.push(search.item);
        } else {
            yValues.push(0);
        }
    }
    var barColors = ["blue", "black", "green", "red", "gray", "orange", "purple", "yellow",];


    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "World Wide Wine Production 2018"
            }
        }
    });
}

function outputPieCharts() {
    var button = document.getElementById("pieCharts");
    var output = document.getElementById("graphs");
    output.innerHTML = '';
    button.addEventListener("click", function() {
        output.innerHTML = '';
        var canvas = document.createElement("canvas");
        canvas.id = "myChart";
        canvas.style.width = "100%";
        canvas.style.maxWidth = "600px";
        output.appendChild(canvas);
        pieCharts();
    });
}

function lineGraphs() {
    var xValues = shopIteamData.map(x => x.name);
    var yValues = [];
    for (let i = 1; i <= 12; i++) {
        let search = basket.find((x) => x.id === i);
        if (search !== undefined) {
            yValues.push(search.item);
        } else {
            yValues.push(0);
        }
    }

    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 0, max: 20 } }],
            }
        }
    });
}

function outputLineGraphs() {
    var button = document.getElementById("lineGraphs");
    var output = document.getElementById("graphs");
    button.addEventListener("click", function() {
        output.innerHTML = '';
        var canvas = document.createElement("canvas");
        canvas.id = "myChart";
        canvas.style.width = "100%";
        canvas.style.maxWidth = "600px";
        output.appendChild(canvas);
        lineGraphs();
    });
}

window.addEventListener("scroll", function() {
    var scrollButton = document.querySelector(".scroll-to-top");
    if (window.pageYOffset > 100) { // Змініть 100 на кількість пікселів, за яку потрібно прокрутити, щоб показати стрілку
        scrollButton.classList.add("active");
    } else {
        scrollButton.classList.remove("active");
    }
});

document.querySelector(".scroll-to-top").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});