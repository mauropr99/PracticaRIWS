import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FilmaffinityItem } from '../model/filmaffinityItem';
import { FilmaffinityService } from '../service/filmaffinity-service.service';
import { Filter } from '../model/filter';
import { ActivatedRoute } from '@angular/router';
import { FilterQuery } from '../model/filterQuery';

@Component({
    selector: 'app-filmaffinity-list',
    templateUrl: './filmaffinity-list.component.html',
    styleUrls: ['./filmaffinity-list.component.css'],
    providers: [NgbPaginationConfig, FilmaffinityService, FilterQuery]
})
export class FilmaffinityListComponent implements OnInit {

    items: FilmaffinityItem[];
    totalItems: number;

    previousPage: number;
    showPagination: boolean = true;
    start: number;
    numRows: number;
    directors: string[] = [''];
    cast: string[] = [''];

    query: string = "ranking:";
    sort: string = "position asc";
    filterQuery: FilterQuery;
    ranking: string;

    minDate = new Date("2010-01-01");
    maxDate = new Date("2030-01-01");

    constructor(
        private filmaffinityService: FilmaffinityService,
        private config: NgbPaginationConfig,
        private route: ActivatedRoute) {
        config.size = 'sm';
        config.boundaryLinks = true;
        config.maxSize = 5;
        config.pageSize = 16;
        config.rotate = true;
    }

    ngOnInit() {
        this.filterQuery = new FilterQuery();
        this.start = 0;
        this.numRows = 16;
        this.previousPage = 1;
        this.route.url.subscribe(url => {
            url[0].path === 'series' ? this.query += "serie" : this.query += "movie";
        })
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }


    findItems(query: string, filterQuery: FilterQuery, sort: string, start: number, numRows: number): void {
        this.filmaffinityService.getItems(query, filterQuery, sort, start, numRows).subscribe(result => {
            this.items = result.response.docs;
        });
    }

    findAccessesFilter(query: string, filterQuery: FilterQuery, sort: string, start: number, numRows: number): void {
        this.filmaffinityService.getItems(query, filterQuery, sort, start, numRows).subscribe(result => {
            this.items = result.response.docs;
        });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
        }
    }

    itemsPerPage(event: any) {
        this.numRows = event.target.value;
        this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
    }


    /* Filters */
    filterTitle() {
        this.filterQuery.title = (<HTMLInputElement>document.getElementById("titleFilter")).value
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
            this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
        }
    }

    filterCast() {
        for (let i = 0; i < this.cast.length; i++) {
            this.filterQuery.cast[i] = (<HTMLInputElement>document.getElementById("actorFilter" + i)).value
            this.findItems(this.query, this.filterQuery, this.sort, this.start, this.numRows);
        }
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

    titleOrder() {
        if (this.sort == 'title asc') {
            this.sort = 'title desc';
        } else {
            this.sort = 'title asc';
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
