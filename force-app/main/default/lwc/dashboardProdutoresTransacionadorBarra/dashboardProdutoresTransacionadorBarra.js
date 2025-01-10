import { LightningElement, wire } from 'lwc';
import getProdutoresCount from '@salesforce/apex/dashboardController.getProdutoresCount';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/ChartJs';

export default class DashboardProdutoresCount extends LightningElement {
    produtorCount = [];

    @wire(getProdutoresCount)
        wiredProdutoresCount({ error, data }){
            if(data){
                this.produtorCount = data;
                console.log(this.produtorCount);
            }else if(error){
                console.error(error);
            }
    }
}
