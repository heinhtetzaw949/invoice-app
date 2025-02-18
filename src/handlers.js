import { sideBar } from "./selector.js";


export let manageInventoryBtnHandler = ()=>{
    sideBar.classList.remove("translate-x-full");
    sideBar.classList.add("duration-300");
}

export let closeSideBarBtnHandler = ()=>{
    sideBar.classList.add("translate-x-full","duration-400");
}


