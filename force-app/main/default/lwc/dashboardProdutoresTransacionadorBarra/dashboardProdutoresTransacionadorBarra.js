import { LightningElement, wire } from 'lwc';
import getProdutoresCount from '@salesforce/apex/dashboardController.getProdutoresCount';

export default class DashboardProdutoresCount extends LightningElement {
    produtorCount;

    @wire(getProdutoresCount)
    wiredProdutoresCount({ error, data }){
        if(data){
            this.produtorCount = data;
        }else if(error){
            console.error(error);
        }
    }
}
