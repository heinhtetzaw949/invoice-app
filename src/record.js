import Swal from "sweetalert2";
import { addItemForm, recordGroup, recordNetTotal, recordRowTemplate, recordTax, recordTotal } from "./selector.js";
import { products } from "./states.js";
import { v4 as uuidv4 } from 'uuid';


// add item ကို click ရင် ဖစ်မယ့် function 
export let addItemFormHandler = (event)=>{
        event.preventDefault();
        let formData = new FormData(addItemForm); 
        // console.log(formData.get("product-name"));  //form ကနေ name attributeကို ခေါ်တာ
        // console.log(formData.get("quantity"));      //form ကနေ name attributeကို ခေါ်တာ
        const currentProduct = products.find(({id}) =>
     
            id == formData.get("product-name")
        );

        console.log(currentProduct.id,currentProduct.name,currentProduct.price);


        let isExistedRecord = document.querySelector(`[product-id="${currentProduct.id}"]`); // id ပါမပါ စစ်တာ

       if(isExistedRecord === null){
        recordGroup.append(createRecordRow(currentProduct,formData.get("quantity")));
       }else{
        Swal.fire({
          title: `Are you sure to add to ${currentProduct.name}? `,
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Add it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            //formData ကနေ quantity ကိုယူရင် string အနေနဲ့မို့ Number ပြောင်းရတာ
            
             updateRecordQuantity(isExistedRecord.getAttribute("id"),parseInt(formData.get("quantity")))
          }
        });
       }

        addItemForm.reset();

      
    }



    export let createRecordRow = ({id,name,price},quantity)=>{
        let recordRow = recordRowTemplate.content.cloneNode(true);
        let recordProductName = recordRow.querySelector(".record-product-name");
        let recordProductPrice = recordRow.querySelector(".record-product-price");
        let recordQuantity = recordRow.querySelector(".record-quantity");
        let recordCost = recordRow.querySelector(".record-cost");
        let currentRecordRow = recordRow.querySelector(".record-row");


        
        currentRecordRow.setAttribute("product-id",id);
        currentRecordRow.setAttribute("id",uuidv4());
        recordProductName.innerText = name;
        recordProductPrice.innerText = price;
        recordQuantity.innerText = quantity;
        recordCost.innerText = price * quantity;

        return recordRow;

    }



    export let calculateRecordCostTotal = ()=>{
        let total = 0;
        recordGroup.querySelectorAll(".record-cost").forEach(el=>{
            total += parseInt(el.innerText);
        })
        console.log(total)

        return total;
    }


  export let calculateTax = (amount,percentage = 5)=> {
        let total = (amount/100) * percentage;
        return total;
  } 


  export let removeRecordDel = (rowId)=>{
    Swal.fire({
        title: 'Are you sure to Delete?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
            let currentRecordRow = document.querySelector(`[id="${rowId}"]`);
            console.log(currentRecordRow)
                currentRecordRow.remove();
          Swal.fire('Deleted!', 'Your Record has been deleted.', 'success');
        }
      });
      
  
  }


  export let quantityAdd = (rowId)=>{
    let currentRecordRow = document.querySelector(`[id="${rowId}"]`);

    let recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    let recordQuantity = currentRecordRow.querySelector(".record-quantity");
    let recordCost = currentRecordRow.querySelector(".record-cost");

    recordQuantity.innerText = parseFloat(recordQuantity.innerText) + 1;
    
    recordCost.innerText = recordQuantity.innerText * recordProductPrice.innerText;


  }

  export let quantityMinus = (rowId)=>{
    let currentRecordRow = document.querySelector(`[id="${rowId}"]`);

    let recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    let recordQuantity = currentRecordRow.querySelector(".record-quantity");
    let recordCost = currentRecordRow.querySelector(".record-cost");

   if(recordQuantity.innerText>1){
    recordQuantity.innerText = parseInt(recordQuantity.innerText) - 1;
    
    recordCost.innerText = recordQuantity.innerText * recordProductPrice.innerText;
   }


  }


  export let updateRecordQuantity = (rowId,newQuantity)=>{
    let currentRecordRow = document.querySelector(`[id="${rowId}"]`); //ဒါက id attribute ကို ဖမ်းတာ


    //အပေါ်က ဖမ်းထားတဲ့ id attribute ထဲက class name တွေကိုလှမ်းခေါ်တာ
    let recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    let recordQuantity = currentRecordRow.querySelector(".record-quantity");
    let recordCost = currentRecordRow.querySelector(".record-cost");

    if(recordQuantity.innerText>1 || newQuantity > 0 ){
      recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
      
      recordCost.innerText = recordQuantity.innerText * recordProductPrice.innerText;
     }
  }
  
  

  export let recordGroupHandler = (event)=>{
    console.log(event.target.classList.contains("record-remove"))
    if(event.target.classList.contains("record-remove")){
        let currentRow = event.target.closest(".record-row");
        console.log(currentRow.getAttribute("id"));
        console.log(currentRow.id);
            removeRecordDel(currentRow.getAttribute("id"));
    }else if(event.target.classList.contains("quantity-add")){
      let currentRow = event.target.closest(".record-row");
      // quantityAdd(currentRow.getAttribute("id"));
      updateRecordQuantity(currentRow.getAttribute("id"),1)
    }else if(event.target.classList.contains("quantity-minus")){
      let currentRow = event.target.closest(".record-row");
      updateRecordQuantity(currentRow.getAttribute("id"),-1)

    }
  }


  export let recordGroupObserver = ()=>{
    const observerOptions = {
        childList: true,
        subtree: true,
      };

      let updateTotal = ()=>{
           let total = calculateRecordCostTotal();
                 let tax = calculateTax(total);
               
         
                recordTotal.innerText =  total;
                 recordTax.innerText = tax;
                recordNetTotal.innerText = total + tax;
         
      }
      
      const observer = new MutationObserver(updateTotal);
      observer.observe(recordGroup, observerOptions);
  }


  export let printBtnHandler = ()=>{
    console.log("this is print")
    print();
  }



    