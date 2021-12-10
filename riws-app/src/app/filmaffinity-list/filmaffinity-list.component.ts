import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FilmaffinityItem } from '../model/filmaffinityItem';
import { FilmaffinityService } from '../service/filmaffinity-service.service';
import { Filter } from '../model/filter';
import { ActivatedRoute } from '@angular/router';
import { FilterQuery } from '../model/filterQuery';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-filmaffinity-list',
    templateUrl: './filmaffinity-list.component.html',
    styleUrls: ['./filmaffinity-list.component.css'],
    providers: [FilmaffinityService, FilterQuery]
})
export class FilmaffinityListComponent implements OnInit {

    pageEvent: PageEvent;
    items: FilmaffinityItem[];
    totalItems: number;
    pageIndex: number = 0;

    start: number;
    numRows: number;
    directors: string[] = [''];
    cast: string[] = [''];

    query: string = "ranking:";
    sort: string = "position asc";
    filterQuery: FilterQuery;
    ranking: string;

    myControl = new FormControl();
    options: string[] = [];
    url: string;

    constructor(
        private filmaffinityService: FilmaffinityService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.filterQuery = new FilterQuery();
        this.pageIndex = 0;
        this.start = 0;
        this.numRows = 20;
        this.route.url.subscribe(url => {
            url[0].path === 'series' ? this.query += "serie" : this.query += "movie";
            this.url = url[0].path;
        })

        this.loadPage();
    }


    private findItems(query: string, filterQuery: FilterQuery, sort: string, start: number, numRows: number): void {
        this.filmaffinityService.getItems(query, filterQuery, sort, start, numRows).subscribe(result => {
            this.items = result.response.docs;
            this.totalItems = result.response.numFound;
        });
    }

    public loadPage(event?: PageEvent) {
        if (event) {
            if (event.pageSize != this.numRows) {
                this.numRows = event.pageSize;
                this.start = event.pageIndex * this.numRows;
            } else {
                this.pageIndex = event.pageIndex;
                this.start = event.pageIndex * event.pageSize;
            }
        }
        this.filmaffinityService.getItems(this.query, this.filterQuery, this.sort, this.start, this.numRows).subscribe(
            response => {
                this.items = response.response.docs;
                this.totalItems = response.response.numFound;
            }
        );
        return event;
    }

    itemsPerPage(event: any) {
        this.numRows = event.target.value;
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }


    /* Filters */
    filterTitle() {
        this.filterQuery.title = (<HTMLInputElement>document.getElementById("titleFilter")).value
        if (this.filterQuery.title != "") {
            this.options = [];
            this.filmaffinityService.getTitleSuggestions(this.filterQuery.title).subscribe(
                response => {
                    let json = Object.entries(response.suggest.filmaffinitySuggester)[0];
                    let entries = json[1] as JSON;
                    entries["suggestions"].map(suggestion => {
                        if (this.url.includes("serie")) {
                            if (suggestion.term.includes('TV')) {
                                this.options.push(suggestion.term);
                            }
                        } else {
                            if (!suggestion.term.includes('TV')) {
                                this.options.push(suggestion.term);
                            }
                        }
                    }
                    );
                }
            );
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    clearTitle() {
        this.filterQuery.title = "";
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    filterYearStart() {
        this.filterQuery.yearStart = (<HTMLInputElement>document.getElementById("yearStartFilter")).valueAsNumber
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    filterYearEnd() {
        this.filterQuery.yearEnd = (<HTMLInputElement>document.getElementById("yearEndFilter")).valueAsNumber
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    filterMinAvgRate() {
        this.filterQuery.minAvgRating = (<HTMLInputElement>document.getElementById("minAvgRateFilter")).valueAsNumber
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    filterMinRates() {
        this.filterQuery.minRateCount = (<HTMLInputElement>document.getElementById("minRatesFilter")).valueAsNumber
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    filterDirectors() {
        for (let i = 0; i < this.directors.length; i++) {
            this.filterQuery.directors[i] = (<HTMLInputElement>document.getElementById("directorFilter" + i)).value
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    filterCast() {
        for (let i = 0; i < this.cast.length; i++) {
            this.filterQuery.cast[i] = (<HTMLInputElement>document.getElementById("actorFilter" + i)).value
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    /* Other methods */
    addDirector() {
        this.directors.push("");
    }

    removeDirector(i: number) {
        if (this.directors.length > 1) {
            this.filterQuery.directors.splice(i - 1, 1);
            this.directors.splice(i, 1);
            this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
        }
    }

    addActor() {
        this.cast.push("");
    }

    removeActor(i: number) {
        if (this.cast.length > 1) {
            this.filterQuery.cast.splice(i - 1, 1);
            this.cast.splice(i, 1);
            this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
        }
    }

    /* Orders */
    positionOrder() {
        if (this.sort == 'position asc') {
            this.sort = 'position desc';
        } else {
            this.sort = 'position asc';
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    yearOrder() {
        if (this.sort == 'year asc') {
            this.sort = 'year desc';
        } else {
            this.sort = 'year asc';
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    avgOrder() {
        if (this.sort == 'avg_rating asc') {
            this.sort = 'avg_rating desc';
        } else {
            this.sort = 'avg_rating asc';
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }

    ratesOrder() {
        if (this.sort == 'rate_count asc') {
            this.sort = 'rate_count desc';
        } else {
            this.sort = 'rate_count asc';
        }
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }
}
