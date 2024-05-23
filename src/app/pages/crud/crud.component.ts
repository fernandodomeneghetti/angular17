import { Component, ViewChild } from '@angular/core';
import { MateriasService } from '../../services/materias.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Materia } from '../../interfaces/Materia';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewMateriaComponent } from './modal-view-materia/modal-view-materia.component';
import { ModalFormMateriaComponent } from './modal-form-materia/modal-form-materia.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {
  // 2º ajustar variaveis
  displayedColumns: string[] = ['id', 'name', 'semestre', 'professor', 'nota', 'actions'];
  dataSource: any;
  listMaterias: Materia[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private materiaService: MateriasService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<Materia>(this.listMaterias);
  }

  ngOnInit() {
    // usando api
      // const livros = this.materiaService.getByFetch().subscribe({
      //   next: (response: any) => {
      //     console.log('Lista de livros no json-server', response);
      //   },
      //   error: (error: any) => {
      //     console.error('Erro ao buscar lista de livros', error);
      //   }
      
      // });
      // console.log('livros: ', livros);

      this.getListMateria();
  }


  // 3º fazer o bind da paginação e ordenação depois que a view foi carregada
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListMateria() {
    // subscribe faz a conexão do front com o back, podemos dizer que é similar ao fetch do JS, mas fica escutando as mudanças
    // subscribe é um método que recebe um objeto com 3 métodos: next, error e complete
    // next é o método que recebe o retorno da requisição com sucesso
    // error é o método que recebe o retorno da requisição com erro
    // complete é o método que recebe o retorno da requisição quando ela é finalizada
    this.materiaService.getAll().subscribe({
      next: (response: any) => {
        console.log('Lista de materias no firebase', response);
        this.listMaterias = response;

        this.dataSource = new MatTableDataSource<Materia>(this.listMaterias);

        //ajustar a paginação novamente após bind dos valores
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Erro ao buscar lista de materias', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalViewMateria(materia: Materia) {
    this.dialog.open(ModalViewMateriaComponent, {
      width: '700px',
      height: '350px',
      data: materia
    })
  }

  openModalAddMateria() {
    this.dialog.open(ModalFormMateriaComponent, {
      width: '700px',
      height: '410px',

    }).afterClosed().subscribe(() => this.getListMateria());
  }

  openModalEditMateria(materia: Materia) {
    this.dialog.open(ModalFormMateriaComponent, {
      width: '700px',
      height: '410px',
      data: materia
    }).afterClosed().subscribe(() => this.getListMateria());
  }

  deleteMateria(materiaId: string) {
    this.materiaService.delete(materiaId)
    .then((response: any) => {
      window.alert('Materia deletada com sucesso');
      this.getListMateria();
    })
    .catch((error: any) => {
      window.alert('Erro ao deletar materia');
      console.log('Erro ao deletar materia:', error)
    });
  }
}
