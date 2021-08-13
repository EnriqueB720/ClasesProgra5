import { Component, OnInit } from '@angular/core';
import { Producto } from './catalogo.model';
import { CatalogoService } from './catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  productos: Producto[];
 //variable  //tipo de variable y es arreglo
  constructor(private catalogoServicio: CatalogoService) { }

  ngOnInit() {
    console.log("Entro al init");
   this.productos =  this.catalogoServicio.getAll();
  }
  ionViewWillEnter(){
    console.log("Entro al will enter");
    this.productos =  this.catalogoServicio.getAll();
  }
}
