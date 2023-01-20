import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AnimalDetail {
  id: string,
  avatar: string,
  name: string,
  type: string
}

export interface AnimalInfo {
  items: Array<AnimalDetail>
}


@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  line1: string = "line1";

  private _itemNum: number = 0;
  get itemNum(): number {
    return this._itemNum;
  }
  set itemNum(value: number) {
    this._itemNum = value;
  }

  constructor(private http: HttpClient) { }

  getAnimalsList(): Observable<AnimalInfo> {
    return this.http.get<any>(environment.baseUrl())
      .pipe(map(data => {
        data.items.forEach((item: AnimalDetail) => {
          item.avatar = `${item.avatar}?lock=${item.id}`
        });
        return data;
      })
      );
  }

  getAnimalDetail(id: string): Observable<AnimalDetail> {
    return this.http.get<AnimalDetail>(`${environment.baseUrl()}/${id}`)
      .pipe(map(item => {
        item.avatar = `${item.avatar}?lock=${item.id}`;
        return item;
      }));
  }

  getBlobImage(url: string) {
    return this.http
      .get(url, {
        responseType: 'blob',
      })
  }
}
