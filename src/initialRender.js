import { productRender } from "./Inventory.js";
import { products } from "./states.js";


export let initialRender = ()=>{
     // sideBar.classList.remove("translate-x-full");
     productRender(products);
}



