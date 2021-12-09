import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmaffinityListComponent } from './filmaffinity-list/filmaffinity-list.component';
import { FilmaffinityService } from './service/filmaffinity-service.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        FilmaffinityListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatInputModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [FilmaffinityService],
    bootstrap: [AppComponent]
})
export class AppModule { }

