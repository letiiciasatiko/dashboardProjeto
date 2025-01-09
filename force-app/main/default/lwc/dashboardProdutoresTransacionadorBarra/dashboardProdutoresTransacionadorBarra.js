import { LightningElement, wire } from 'lwc';
import getProdutoresCount from '@salesforce/apex/dashboardController.getProdutoresCount';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/ChartJs';

export default class DashboardProdutoresCount extends LightningElement {
    produtorCount = 0;
}
