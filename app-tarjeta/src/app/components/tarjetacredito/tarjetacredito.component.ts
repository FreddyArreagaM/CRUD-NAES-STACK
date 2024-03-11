import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from 'src/app/interface/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjetacredito',
  templateUrl: './tarjetacredito.component.html',
  styleUrls: ['./tarjetacredito.component.css']
})
export class TarjetacreditoComponent implements OnInit{
  //variable para manejar lista de Tarjetas
  listaTarjetas: any[] = []
  titulo = "agregar";
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaService){
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['',[ Validators.required, Validators.maxLength(16), Validators.minLength(16) ]],
      fechaExpiracion: ['', [ Validators.required, Validators.maxLength(4), Validators.minLength(4) ]],
      cvv:['', [ Validators.required, Validators.maxLength(3), Validators.minLength(3) ]]
    })
  }
  ngOnInit(): void {
    this.getlistaTarjetas();
  }

  //Metodo para agregar nueva tarjeta
  guardarTarjeta(){
    console.log(this.form);
    const fechaFormateada = `${this.form.get('fechaExpiracion')?.value.substring(0, 2)}/${this.form.get('fechaExpiracion')?.value.substring(2)}`;

    const tarjeta: any ={
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: fechaFormateada,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined){
      //agregamos una nueva tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        console.log(data);
        this.toastr.success('La tarjeta fue registrada con exitoo!', 'Tarjeta Registrada!');
        this.getlistaTarjetas();
        this.form.reset();
      }, error =>{
        this.toastr.error('Opss... ocurrió un error', 'Error');
        console.log(error);
      })

    }else{
      tarjeta.id = this.id;
      //editamos tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data=>{
        this.form.reset();
        this.titulo = 'Agregar';
        this.id=undefined;
        this.toastr.info('La tarjeta fue actualizada con exito!','Tarjeta Actualizada');
        this.obtenerDatos();
      }, error =>{
        console.log(error);
      })

    }



  }
  
  //Metodo para ajustar la fecha al formato
  validarFecha(event: Event){
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    input.value = input.value.substring(0, 4);
    input.value = input.value.replace(/(\d{2})(\d{2})/, '$1/$2');    
  }

  //Metodo para eliminar un elemento por id
  eliminarTarjeta(id: number){
    console.log(id);
    this._tarjetaService.deleteCard(id).subscribe(data =>{
      this.toastr.error('La tarjeta fue eliminada con exitoo!', 'Tarjeta Eliminada!');
      this.getlistaTarjetas();
    }, error =>{
      console.log(error);
    })

  }

  //Metodo para obtener la lista de las Tarjetas
  getlistaTarjetas(){
    this._tarjetaService.getListCards().subscribe(data =>{
      this.listaTarjetas = data;
    })
  }

  editarTarjeta(tarjeta: any){
    console.log(tarjeta);
    this.titulo = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })
    /*
    this._tarjetaService.updateTarjeta(id, tarjeta).subscribe(data =>{
      console.log(data);
      this.titulo = "AGREGAR TARJETA";
    },error =>{
      console.log(error);
    })*/
  }

  obtenerDatos(){

  }

}
