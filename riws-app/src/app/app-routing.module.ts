import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmaffinityListComponent } from './filmaffinity-list/filmaffinity-list.component';

const routes: Routes = [
    { path: 'movies', component: FilmaffinityListComponent },
    { path: 'series', component: FilmaffinityListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
