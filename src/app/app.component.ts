import { Component, OnInit} from '@angular/core';
import { Idata} from './interfaces/data';
import { CurrencyRequestService } from './services/currency-request.service';

@Component({
    selector: 'currency-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
    title = 'currencyexchange';
    dataAll: Idata[] = []; 
    uah: Idata = {r030: 980, txt: 'Українська гривня', rate: 1, cc: 'UAH', exchangedate: '24.08.1991'};
    date: string = this.setDate();
    loadingStatus: string = 'loading'; 
    eur: Idata;
    usd: Idata;
    error: string;

    constructor(private currencyRequestService: CurrencyRequestService ) {};

    //we can't take API Course for the current date because in current date API NBU after 16-00 set exchange rate next day 
	// we need API with exact DATE 
    setDate() {	
		const dataCurrency = new Date();
		const YYYY = dataCurrency.getFullYear();
		const MM = this.addZero(dataCurrency.getMonth() + 1);
		const DD = this.addZero(dataCurrency.getDate());
		const date = String(YYYY) + MM + DD;
		return date;
	};
    addZero(num: number) {
		if (num < 10) {
			return "0" + num;
		} else return num;
	};
    
    ngOnInit(): void {
        this.currencyRequestService.getAll(this.date)
        .subscribe({next: (data: any) => {
            this.dataAll = data;
            this.dataAll.unshift(this.uah);
            this.loadingStatus = 'loaded'; 
            this.eur = this.findCurrencyByCode(978);
            this.usd = this.findCurrencyByCode(840);
            },
        error: (e) => {
            this.error = e
            this.loadingStatus = 'error'
            }
        });
    };

    findCurrencyByCode = (id: number) : Idata => {
        return this.dataAll.filter((el) => el.r030 === id)[0];
    };
}