import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogoService } from '../catalogo.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  constructor(private catalogoService: CatalogoService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required,Validators.maxLength(20)]
      }),
      id: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      img: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  addFunction(){
    if(!this.form.valid) return;
    this.catalogoService.addProduct(
      this.form.value.title,
      this.form.value.id,
      this.form.value.img,
      this.form.value.description);
      this.router.navigate(['/catalogo']);
  }
}
