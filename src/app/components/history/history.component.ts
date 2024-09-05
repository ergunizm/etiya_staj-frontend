import { Component, OnInit } from '@angular/core';
import { ItemDb } from 'src/app/model/itemdb.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  dbitems : ItemDb[] = []

  constructor(private service : ItemService) { }

  ngOnInit(): void {
  }

  getSaved(namespace : string, date : string){
    console.log(namespace, date)
    this.service.getSavedItems(namespace.trim(), date.trim()).subscribe(res =>{
      this.dbitems = res
      console.log(res)
    })
  }

}
