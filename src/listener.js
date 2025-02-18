import { closeSideBarBtnHandler, manageInventoryBtnHandler } from "./handlers.js";
import { addNewBtnHandler } from "./Inventory.js";
import { addItemFormHandler, printBtnHandler, recordGroupHandler } from "./record.js";
import { addItemForm, addNewBtn, closeSideBarBtn, manageInventoryBtn, printBtn, recordGroup } from "./selector.js";


export let listeners = ()=>{
    manageInventoryBtn.addEventListener("click",manageInventoryBtnHandler);
    closeSideBarBtn.addEventListener("click",closeSideBarBtnHandler);
    addNewBtn.addEventListener("click",addNewBtnHandler);
    addItemForm.addEventListener('submit',addItemFormHandler);
    recordGroup.addEventListener("click",recordGroupHandler);
    printBtn.addEventListener("click",printBtnHandler);
}


export default listeners;