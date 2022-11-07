import { Component, OnInit, Input } from '@angular/core';
import { Idata } from '../interfaces/data';

@Component({
    selector: 'currency-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    @Input() dataAll: Idata[];

    firstAmount: number;
    secondAmount: number;
    firstCurrency: Idata ;
    secondCurrency: Idata;

    constructor() { }

    ngOnInit(): void {
        this.firstAmount = 1;
        this.secondAmount = 1;
        this.firstCurrency = this.dataAll[0];
        this.secondCurrency = this.dataAll[0];
    };

    setFirstAmount = () => {
        this.firstAmount = Math.round((Math.round(this.secondAmount*100)/100 * this.secondCurrency.rate / this.firstCurrency.rate)*100)/100;
    };

    setSecondAmount = () => {
        this.secondAmount = Math.round((Math.round(this.firstAmount*100)/100 * this.firstCurrency.rate / this.secondCurrency.rate)*100)/100;
    };

    setFirstCurrency = (e : any) => {
        const id = e.target.value      
        this.firstCurrency = this.dataAll.filter(el => (el.r030 == id))[0]; 
        this.setSecondAmount();
    };

    setSecondCurrency = (e : any) => {
        const id = e.target.value      
        this.secondCurrency = this.dataAll.filter(el => (el.r030 == id))[0]; 
        this.setSecondAmount(); //when the currency-name is changing, the amount of currency is changing only in second input
                                //because it is more comfortable for user
    };
}
