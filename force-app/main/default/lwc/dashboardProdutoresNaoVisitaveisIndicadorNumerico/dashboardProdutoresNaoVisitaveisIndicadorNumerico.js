import getNaoVisitaveis from '@salesforce/apex/dashboardController.getNaoVisitaveis';
import { LightningElement, wire } from 'lwc';

export default class DashboardProdutoresNaoVisitaveisIndicadorNumerico extends LightningElement {
    naoVisitCount = 0;

    @wire(getNaoVisitaveis)
    wiredNaoVisitaveisCount({ error, data }){
        if(data){
            this.naoVisitCount = data;
        }else if(error){
            console.error(error);
        }
    }
}