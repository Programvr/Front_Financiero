import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSource = new BehaviorSubject<any[]>([]);
  menuItems$ = this.menuItemsSource.asObservable();
  menuItems: any[] = [];
  itemsFiltrados: any[] = [];

  setMenuItems(items: any[]) {
    this.itemsFiltrados = items.filter(item => item.nombre_modulo !== 'Login');
    this.menuItems = this.itemsFiltrados.map((modulo) => ({
      nombre_modulo: modulo.nombre_modulo,
      ruta: '/' + modulo.nombre_modulo // Asegúrate de que este campo existe en el objeto
    }));
    console.log(this.menuItems);
    this.menuItemsSource.next(this.menuItems); // Cambia menuItems por this.menuItems
  }
}
