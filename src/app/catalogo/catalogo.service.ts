import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Producto } from './catalogo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//Nombre de la variable: Tipo de dato a guardar[viene del model]
export class CatalogoService {
  private productos: Producto[] = [];
  constructor(private httpClient: HttpClient) {
    this.productos = this.getAll();
   }
  getAll(){
    this.httpClient.get<{ [key: string]: Producto }>("https://prueba-clase-5417d-default-rtdb.firebaseio.com/productos.json")
    // .subscribe(
    //   restData => {
    //     console.log(restData);
    //   }
    // )
    .subscribe(
        restData => {
          const productos = [];
          for (const key in restData){
            if(restData.hasOwnProperty(key)){
              productos.push(new Producto(
                restData[key].title,
                restData[key].description,
                key
                ));
            }
          }
          this.productos = productos;
        }
    );
    return [...this.productos] //De esta forma se genera una copia o referencia de ese elemento
  }
  getProducto(catalogoId: string){
    return {...this.productos.find( //realiza el foreach
      producto =>{ //asigna dentro de producto, esto es como un if
        return catalogoId === producto.id; // y se retorna cuando se cumpla esa condicion
      }
    )};
  }
  delete(catalogoId: string){
    this.productos = this.productos.filter(
      producto =>  producto.id !== catalogoId
    );
  }
  addProduct(title: string, id: string, img: string, description: string){
    id = Math.random().toString();
    const newProduct = new Producto(title,description,id);
    this.httpClient.post<{name: string}>("https://prueba-clase-5417d-default-rtdb.firebaseio.com/productos.json", {
      ...newProduct,
      id: null,
      img: "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800"
    }).subscribe(
      (restData) =>{
        newProduct.id = restData.name;
      }
    );
    this.productos.push(newProduct);
   }

   editProduct(title: string, id: string, img: string, description: string) {
    const newProduct = new Producto(title,description,id);
    this.httpClient.put<{name: string}>(`https://prueba-clase-5417d-default-rtdb.firebaseio.com/productos/${id}.json`, {
      ...newProduct,
      id: null
    }).subscribe(
      (restData) =>{
        console.log(restData);
      }
    );
  }
}
