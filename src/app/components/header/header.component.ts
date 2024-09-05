import { AuthService } from 'src/app/services/auth.service';
import { AfterContentChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  projectname : string
  username : string

  constructor(private authService : AuthService) { 
    this.projectname = "Etiya Staj"
    this.username = ""
  }

  ngOnInit(): void {
    
  }

  ngAfterContentChecked() {
    this.username = this.authService.getUsername()
  }
}