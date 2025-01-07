import { LightningElement, wire } from 'lwc';
import getProdutoresCount from '@salesforce/apex/dashboardController.getProdutoresCount';

export default class DashboardProdutoresCount extends LightningElement {
    produtoresCount;

    @wire(getProdutoresCount)
    wiredCount({ error, data }) {
        if (data) {
            this.produtoresCount = data;  // Agora, data já é o valor numérico do contador
        } else if (error) {
            this.produtoresCount = undefined;
            console.error(error);
        }
    }
}
