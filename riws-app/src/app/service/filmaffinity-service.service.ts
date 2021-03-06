import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterQuery } from '../model/filterQuery';
import { Page } from '../model/page';
import { SuggestRequest } from '../model/suggests/suggestRequest';
/* import { Filter } from '../model/filter';
import { Page } from '../model/page'; */

@Injectable()
export class FilmaffinityService {

    private solrUrl: string;
    private solrSuggestUrl: string;
    query: string;

    constructor(private http: HttpClient) {
        this.solrUrl = 'https://cors-everywhere.herokuapp.com/http://ec2-54-89-215-139.compute-1.amazonaws.com:8983/solr/riws-filmaffinity/select';
        this.solrSuggestUrl = 'https://cors-everywhere.herokuapp.com/http://ec2-54-89-215-139.compute-1.amazonaws.com:8983/solr/riws-filmaffinity/suggest';
    }

    public getItems(query: string, filterQuery: FilterQuery, sort: string, start: number, numRows: number): Observable<Page> {

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

    public getTitleSuggestions(title: string): Observable<SuggestRequest> {

        /* 'http://localhost:8983/solr/riws-filmaffinity/suggest?suggest.dictionary=filmaffinitySuggester&suggest.q=n' */

        const params = new HttpParams()
            .set('suggest.dictionary', 'filmaffinitySuggester')
            .set('suggest.q', title);

        return this.http.get<SuggestRequest>(this.solrSuggestUrl, { params: params });

    }
}
