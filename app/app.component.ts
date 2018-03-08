declare let require: any;

import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/http.service";
import {Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'my-app',
    host: {
        '(document:scroll)': 'onScroll($event)'
    },
    template: require('./app.component.html'),
    styles: [`${require('./app.component.css')}`],
    providers: [HttpService]
})
export class AppComponent {
    show: boolean = false; // variable for open/close popup
    term: string = ''; // search string
    data: any = {};
    list: any[] = []; // gifs data list
    oneGif: any = {}; // one gifs info
    offset: number = 0;
   
    constructor(private httpService: HttpService, @Inject(DOCUMENT) private document: Document) {}

    async search(term: string) { // search gifs by string
        this.data = await this.httpService.searchGif(term);
        this.list = this.data.data.map((item: any) => {
            return item;
        });

        this.offset = 0;
    }

    async showInfo(id: string) { // short gif info
        this.oneGif = await this.httpService.getById(id);
        this.show = true;
    }

    close() {
        this.show = false;
    }

    async onScroll(event: any) { // infinity scroll
        if (this.document.body.offsetHeight - window.innerHeight <= window.scrollY) {
            this.offset += 25; // default number of gifs displayed

            this.data = await this.httpService.pagination(this.term, this.offset);
            this.list.push(...this.data.data.map((item: any) => { // add new data in array
                return item;
            }));
        }
    }    

}