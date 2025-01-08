import { LightningElement, wire } from 'lwc';
import getProdutoresCount from '@salesforce/apex/dashboardController.getProdutoresCount';
export default class DashboardProdutoresCount extends LightningElement {
    produtorCount = 0;
    chartConfiguration = 0;

    @wire(getProdutoresCount)
    wiredProdutoresCount({ error, data }){
        if(data){
            this.produtorCount = data;
        }else if(error){
            console.error(error);
        }

        this.chartConfiguration = {
            type: 'doughnut',
            data: {

            }
        }
    }
}
