import { ItemDb } from '../model/itemdb.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from '../model/item.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getItems(namespace : string) : Observable<Item[]>{
    console.log(namespace)
    if(namespace == "Select Namespace" || !namespace){
      return this.http.get<Item[]>("http://localhost:8080/items")
    }
    let params = new HttpParams().append("namespace", namespace)

    return this.http.get<Item[]>("http://localhost:8080/items", {params:params})
  }

  saveItems(items : Item[], namespace : string, username : string){
    let itemdb : ItemDb = {
      date : this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm', 'en-US'),
      namespace : namespace,
      username : username,
      data : JSON.stringify(items.map((item: Item) => ({
        name: item.name,
        version: item.version
    })))
    }
    
    this.http.post<ItemDb[]>("http://localhost:8080/items", itemdb).subscribe(
      response => {
          console.log('Items saved successfully:', response);
      },
      error => {
          console.error('Error saving items:', error);
      }
  );
  }

  getSavedItems(namespace : string, date : string) : Observable<ItemDb[]>{
    const tmpDate = this.datePipe.transform(date, 'dd/MM/yyyy', 'en-US' )|| ""
    console.log(tmpDate)
    let params = new HttpParams()
    .append("namespace", namespace)
    .append("date", tmpDate)

    return this.http.get<ItemDb[]>("http://localhost:8080/items/getSaved", {params:params})
  }

  getNoMatchingItems(email : string,) : Observable<Item[]>{
    let params = new HttpParams().append("email", email)
    return this.http.get<Item[]>("http://localhost:8080/items/nomatch", {params:params})
  }
}
