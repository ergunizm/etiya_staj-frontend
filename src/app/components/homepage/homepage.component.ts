import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ItemService} from '../../services/item.service';
import { Item } from 'src/app/model/item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  items : Item[] = []
  nsArr : string[] =  ["Select Namespace"]  //array that contains namespaces
  curNs : string = "" //current namespace for query to backend
  saveActive : boolean = false  //only active when get button is clicked
  username : string = ""

  constructor(private service : ItemService,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.getItemsAndNamespaces("")
  }

  getItemsAndNamespaces(ns : string){
    this.service.getItems(ns).subscribe(res =>{
      this.items = res
      console.log(res)
      this.nsArr = [...new Set(this.nsArr.concat([...new Set(this.items.map(item => item.namespace))]))]
      console.log(this.nsArr)
    })
  }

  getWhenClicked(){
    this.saveActive = true
    this.getItemsAndNamespaces(this.curNs)
  }

  saveToDb(){
    this.service.saveItems(this.items, this.curNs, this.username)
  }

  getNoMatches(){
    console.log(this.authService.getEmail())
    this.service.getNoMatchingItems(this.authService.getEmail()).subscribe(res =>{
      if(res != null && res.length){
        this.items = res
        this.toastr.error("No maching items are sent by e-mail!","Email is sent")
        console.log(res)
      }else{
        this.toastr.success("All items are correct pair!","No mismaching items")
      }
      
    })
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername()
  }
}
