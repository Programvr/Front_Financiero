import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Asegúrate de importar RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,  // standalone: true si no tienes AppModule
  imports: [RouterOutlet],  // Añadir RouterOutlet en imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front_Financiero';
}
