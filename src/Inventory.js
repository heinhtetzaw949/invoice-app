import { newProductName, newProductPrice, productCardTemplate, productGroup, productSelect } from "./selector.js";
import { v4 as uuidv4 } from 'uuid';
import { products } from "./states.js";
import Swal from "sweetalert2";

export let addNewBtnHandler = ()=>{
    let createID = uuidv4();
   if(newProductName.value == "" || newProductPrice.value == ""){
       Swal.fire({
              title: `Please add New Product Name & Price ! `,
              text: '',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Okay',
              cancelButtonText: 'No!',
            }).then((result) => {
              if (result.isConfirmed) {
                
              }
            });
   }else{
    productGroup.append(createProductCard(createID,newProductName.value,newProductPrice.valueAsNumber));
    productSelect.append(new Option(`${newProductName.value}-${newProductPrice.valueAsNumber}`,createID));
   }

    
    products.push({
        id:createID,
        name:newProductName.value,
        price:newProductPrice.valueAsNumber
    })

    console.log(products)

    newProductName.value = null;
    newProductPrice.value = null;


   
}




export let productRender = (products)=>{
    console.log(products)
    products.forEach(({id,name,price})=>{
        console.log({id,name,price})
        productGroup.append(createProductCard(id,name,price));
          productSelect.append(new Option(`${name}-${price}`,id));
    })
}





export let createProductCard = (id,name,price)=>{
    let productCard = productCardTemplate.content.cloneNode(true);
    let currentProductCard = productCard.querySelector(".product-card");
    let productName = productCard.querySelector(".product-name");
    let productPrice = productCard.querySelector(".product-prices");


        currentProductCard.id = id;
        productName.innerText = name;
        productPrice.innerText = price ;

       

    return productCard;
}





