class Product {
    /* title = "DEFAULT";
    imageUrl;
    description;
    price; */

    constructor(title,price,img,descr){
        this.title = title
        this.price = price
        this.imageUrl = img
        this.description = descr
        
    }
}

class ProductItem {
    constructor(product){
        this.product = product
    }

    addToCart(){
        console.log("Adding product to card")
        console.log(this.product)
        ShoppingCart.addProduct(this.product)
    }

    render(){
        const prodLI = document.createElement("li")
        prodLI.classList.add("product-item")
        prodLI.innerHTML = 
            `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to cart</button>
                </div>
            </div>
            `
        console.log(this)
        prodLI.querySelector("button").addEventListener("click",this.addToCart.bind(this))
        return prodLI
    }
}

class ShoppingCart{
    items = []

    addProduct(product){
        this.items.push(product)
        this.totalOutput = `<h2>Total: \$${1}</h2>`
        
    }

    render(){
        const cartEl = document.createElement("section")
        cartEl.innerHTML = 
        `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `
        this.totalOutput = cartEl.querySelector("h2")
        cartEl.classList.add("cart")
        return cartEl
    }
}

class ProductList {
    products = [
        new Product("A Pillow", 9.99, "http://cdn.shopify.com/s/files/1/0187/4296/8371/products/eve-sleep-microfibre-shaper-pillow__white__2000x1500_d3bfc68d-033a-4440-b495-f89f7d2dfb9e_1200x630.jpg?v=1623165520","A really soft pillow"),
        new Product("A Carpet",89.99,"https://m.media-amazon.com/images/I/81F9KaYblyL._SY355_.jpg","A fancy carpet for the living room"),
    ];
    constructor(){}
    render(){
        
        const list = document.createElement("ul")
        list.classList.add("product-list")
        for(let prod of this.products){
            const prodLI = new ProductItem(prod).render()
            list.append(prodLI)
        }
        return list
    }
}

class Shop{
    render(){
        const renderHook = document.querySelector("#app")
        const prodList = new ProductList().render()
        const cart = new ShoppingCart().render()
        renderHook.append(cart)
        renderHook.append(prodList)
    }
}

class App {
    static init(){ 
        const shop = new Shop()
        shop.render()
    }
}


App.init()