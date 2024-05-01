import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  selectedColor: any;
  selectedTextColor: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
 
  }

}
