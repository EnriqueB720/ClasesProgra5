import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Producto } from '../catalogo.model';
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  producto: Producto;
  constructor(private activatedRoute: ActivatedRoute,
    private catalogoServicio: CatalogoService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has("catalogoId")){
          //no existe el parametro redireccionado
          return;
        }
        const productoId = paramMap.get("catalogoId");//agarrar el catalogo de la URL
        this.producto = this.catalogoServicio.getProducto(productoId);//se busca el producto y se trae la info
      }
    );
  }
  delete(){
    this.alertCtrl.create({
      header: "Borrar",
      message: "Esta seguro que desea borrar este producto?",
      buttons:[
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Borrar",
          handler: () => {
            this.catalogoServicio.delete(this.producto.id);
            this.router.navigate(['/catalogo']);
          }
        }
      ]
    }).then(
      alertElement => {
        alertElement.present();
      }
    );
  }

}
