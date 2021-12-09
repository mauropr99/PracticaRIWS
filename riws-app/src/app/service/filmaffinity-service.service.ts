import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterQuery } from '../model/filterQuery';
import { Page } from '../model/page';
/* import { Filter } from '../model/filter';
import { Page } from '../model/page'; */

@Injectable()
export class FilmaffinityService {

    private solrUrl: string;
    query: string;

    constructor(private http: HttpClient) {
        this.solrUrl = 'http://localhost:8983/solr/riws-filmaffinity/select';
    }

    public getItems(query: string, filterQuery: FilterQuery, sort: string, start: number, numRows: number): Observable<Page> {
        console.log(filterQuery.crearQuery());

        if (filterQuery != undefined) {
            this.query = filterQuery.crearQuery()
        } else {
            this.query = ''
        }

        const params = new HttpParams()
            .set('fq', this.query)
            .set('q', query)
            .set('sort', sort)
            .set('start', start.toString())
            .set('rows', numRows.toString());

        return this.http.get<Page>(this.solrUrl, { params: params });

    }
}
