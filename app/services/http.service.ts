import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HttpService {
    API_KEY: string = 'DV2WYeGZdDAesB26QF9d32qyc3V53ePm';

    constructor(private http: HttpClient) {
    }

    async searchGif(term: string) {
        let str = encodeURIComponent(term);
        return await this.http.get("http://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=" + this.API_KEY).toPromise();
    }

    async getById(id: string) {
    	return await this.http.get("http://api.giphy.com/v1/gifs/" + id + "?api_key=" + this.API_KEY).toPromise();
    }

    async pagination(term: string, page: number) {
        let str = encodeURIComponent(term);
        return await this.http.get("http://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=" + this.API_KEY + "&offset=" + page).toPromise();
    }
}