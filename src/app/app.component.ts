import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'ABM Stock';
  autor = 'AHF';
  angular = `Angular v${VERSION.full}`;
  anio = (new Date()).getFullYear();
}
