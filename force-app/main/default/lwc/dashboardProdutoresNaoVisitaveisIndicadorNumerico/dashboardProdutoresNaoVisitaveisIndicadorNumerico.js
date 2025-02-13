import getNaoVisitaveis from '@salesforce/apex/dashboardController.getNaoVisitaveis';
import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJs from '@salesforce/resourceUrl/ChartJs';
 
export default class DashboardProdutoresNaoVisitaveisIndicadorNumerico extends LightningElement {
    naoVisitCount = [];
    chartJsLib = 0;
    
    @wire(getNaoVisitaveis)
    wiredNaoVisitaveisCount({ error, data }){
        if(data){
            this.naoVisitCount = data;
            console.log(this.naoVisitCount);
        }else if(error){
            console.error(error);
        }
    }
}