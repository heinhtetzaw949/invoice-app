import { initialRender } from "./initialRender.js";
import listeners from "./listener.js";
import observer from "./observer.js";


export class Invoice {
    init(){
        observer();
        initialRender();
        listeners();
    }
}





export default Invoice;





