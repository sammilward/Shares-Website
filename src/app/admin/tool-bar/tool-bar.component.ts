import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
