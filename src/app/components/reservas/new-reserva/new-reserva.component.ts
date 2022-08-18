import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Reserva } from 'src/app/shared/models/reserva';

@Component({
  selector: 'app-new-reserva',
  templateUrl: './new-reserva.component.html',
  styleUrls: ['./new-reserva.component.scss']
})
export class NewReservaComponent implements OnInit {

  reseForm!: FormGroup;
  actionBton : string = "Guardar";
  title: string = "Crear Reservación";
  inputReadonly = true;

  public currentDate = new Date();

  public localDate: string = new Date().toLocaleString();


  disabledDates: DateFilterFn<any> = (date: Date): boolean =>{
    const time = date.getTime()
    return !this.holidayList.find(x=>x==time)
  }

  disabledDatesFin: DateFilterFn<any> = (date: Date): boolean =>{
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6;
  }


  // dateClass: MatCalendarCellClassFunction<Date> = (date: Date): boolean => {
  //   const time = date.getTime()
  //   return !this.holidayList.find(x=>x==time)
  // }


  holidayList = [
    new Date("8/1/2022").getTime(),
    new Date("8/2/2022").getTime()
  ];

  public myFilter = (date: Date): boolean => {
    const time = date.getTime()
    return !this.holidayList.find(x=>x==time)
  }


  // myFilter = (d: Date): boolean => {
  //   const time=d.getTime();
  //   return !this.myHolidayDates.find(x=>x.getTime()==time);
  // }

  constructor(@Inject(MAT_DIALOG_DATA)
  public editData: Reserva, private fmb : FormBuilder, private _reservaService: ReservaService, private dialogRef: MatDialogRef<NewReservaComponent>) { }



  ngOnInit(): void {
    this.reseForm = this.fmb.group({
      fecha : ['', Validators.required],
      cantidad : ['', Validators.required]
    });

    if(this.editData){
      this.title = "Actualizar Reservación";
      this.actionBton = "Actualizar";
      this.reseForm.controls['fecha'].setValue(this.editData.fecha);
      this.reseForm.controls['cantidad'].setValue(this.editData.cantidad);
    }
    this.pastDate();
  }

  pastDate(){
    const tdate = new Date();
    const date = tdate.getDate();
    console.log(date)
  }


  reservar(){
    if(!this.editData){
      if(this.reseForm.valid){
        this._reservaService.agregarReserva(this.reseForm.value)
        .subscribe({
          next:(res)=>{
            alert("Reserva creada correctamente");
            this.reseForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error al crear la reserva")
          }
        })
      }
    }else{
      this.updateReserva()
    }
    // const rese: Reserva = {
    //   fecha: this.reseForm.value.fecha,
    //   cantidad: this.reseForm.value.cantidad
    // }

    // this._reservaService.agregarReserva(rese);
    // console.log(rese);
    // this.dialogRef.close();
  }
  updateReserva(){
    this._reservaService.editarReserva(this.reseForm.value,this.editData.id).subscribe(
      {next:(res)=>{
        alert("Reserva Actualizada correctamente");
        this.reseForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error al actualizar la reserva");
      },
    })
  }

}
