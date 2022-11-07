import { Component, Input, OnInit } from '@angular/core';
import { Idata } from '../interfaces/data';

@Component({
    selector: 'currency-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() eur: Idata ;
    @Input() usd: Idata ;

    constructor() {}

    ngOnInit(): void {}
}
