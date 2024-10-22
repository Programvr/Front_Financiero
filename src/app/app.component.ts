import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';  // Importar RouterLink
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // Añadir RouterLink aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front_Financiero';
  menuItems: any[] = [];
  viewMenu: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.menuItems$.subscribe((items) => {
      this.menuItems = items;
      if(this.menuService.menuItems.length > 0){
        this.viewMenu = true;
      }
    });
  }
  
}
