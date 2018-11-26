import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/classes/rubro';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-rubros',
  templateUrl: './lista-rubros.component.html',
  styleUrls: ['./lista-rubros.component.css']
})
export class ListaRubrosComponent implements OnInit {
  rubros: Rubro[];
  titulo = 'Rubros';

  constructor(private dataSrv: DataService) {
    this.dataSrv.getRubros().subscribe((r: Rubro[]) => {
      this.rubros = r;
    });
   }

  ngOnInit() {
  }

}
