import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Idata } from "../interfaces/data";

@Injectable({
    providedIn: 'root'
})

export class CurrencyRequestService {

    constructor(private http: HttpClient) {}

    //we can't take API Course for the current date because in current date API NBU after 16-00 set exchange rate next day 
	// we need API with exact DATE 
    getAll(date: string) : Observable<Idata[]> {
        return this.http.get<Idata[]>(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json?valcode=EUR&date=${date}`)
        .pipe(
            catchError((e) => {
                return throwError(() => new Error(`ups something happened, ${e.message}`))
            })
        )
    }
}