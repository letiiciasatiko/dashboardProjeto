import getNaoVisitaveis from '@salesforce/apex/dashboardController.getNaoVisitaveis';
import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJs from '@salesforce/resourceUrl/chartjs';
 
export default class DashboardProdutoresNaoVisitaveisIndicadorNumerico extends LightningElement {
    naoVisitCount = 0;
    chartJsLib = 0;



    // @wire(getNaoVisitaveis)
    // wiredNaoVisitaveisCount({ error, data }){
    //     if(data){
    //         this.naoVisitCount = data;
    //     }else if(error){
    //         console.error(error);
    //     }
    // }
}