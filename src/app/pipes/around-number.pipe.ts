import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'aroundNumber'})

export class AroundNumberPipe implements PipeTransform {

    transform(value: number): number {
        return Math.round(value*100)/100;
    };
}
