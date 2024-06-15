import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  name: string;

  constructor(private authService: AuthService, private router: Router) {
    const username = localStorage.getItem('username');
    this.name = username ? username : 'Gast';  // assign a default value if getUserName() returns null
  }

  ngOnInit(): void {
    const username = this.authService.getUserName();
    console.log('Username:', username);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(r => {});  // Weiterleitung zur Anmeldeseite
  }

  getInitials(name: string) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  }

}
