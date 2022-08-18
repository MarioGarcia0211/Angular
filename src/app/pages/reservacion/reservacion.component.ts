import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewReservaComponent } from 'src/app/components/reservas/new-reserva/new-reserva.component';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Reserva } from 'src/app/shared/models/reserva';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss']
})
export class ReservacionComponent implements OnInit {

  dataSource!: MatTableDataSource<Reserva>;
  displayedColumns: string[] = ['fecha', 'cantidad'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private lR : ReservaService) { }

  ngOnInit(): void {
    this.getAllReservas();
  }

  openDialog(){
    this.dialog.open(NewReservaComponent, {

    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllReservas();
      }
    })
  }

  getAllReservas(){
      this.lR.getReserva().subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          alert("Error al mostrar las reservas");
        },
      })
  }

  editReserva(element: Reserva){
    this.dialog.open(NewReservaComponent,{
      data:element
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllReservas();
      }
    })
  }

  borrarReserva(id: number){
    this.lR.eliminarReserva(id).subscribe({
      next:(value)=>{
        alert("Reserva eliminada correctamente");
      },
      error:(err)=>{
        alert("Error al eliminar la reserva");
      }
    })
  }

}
