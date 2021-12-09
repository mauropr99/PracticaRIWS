import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    mobileQuery: MediaQueryList;

    fillerNav = [
        { name: "Movies", route: "movies", icon: "movie" },
        { name: "Series", route: "series", icon: "tv" }
    ]

    constructor(media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    }

    shouldRun = true;

    ngOnInit(): void {
    }
}

