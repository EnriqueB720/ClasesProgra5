import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../catalogo.model';
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  editFrom: FormGroup;
  producto: Producto;
  constructor(private activatedRoute: ActivatedRoute,
    private catalogoServicio: CatalogoService,
    private router: Router) { }

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

    this.editFrom = new FormGroup({
      title: new FormControl(this.producto.title,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.producto.description,{
        updateOn: 'blur',
        validators: [Validators.required,Validators.maxLength(20)]
      }),
      id: new FormControl(this.producto.id,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      img: new FormControl('https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  editFunction(){
    if(!this.editFrom.valid) return;
    this.catalogoServicio.editProduct(
      this.editFrom.value.title,
      this.editFrom.value.id,
      this.editFrom.value.img,
      this.editFrom.value.description);
      this.router.navigate(['/catalogo']);
  }
}
