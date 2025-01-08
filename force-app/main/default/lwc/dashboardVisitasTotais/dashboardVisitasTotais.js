import getVisitasTotais from '@salesforce/apex/dashboardController.getVisitasTotaisCount';
import { LightningElement, wire } from 'lwc';

export default class DashboardVisitasTotaisCount extends LightningElement {
    visitasTotaisCount = 0;

    @wire(getVisitasTotais)
    wiredVisitasTotaisCount({ error, data }){
        if(data){
            this.visitasTotaisCount = data;
        }else if(error){
            console.error(error);
        }
    }
}