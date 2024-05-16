import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from '../../../services/materias.service';
import { Materia } from '../../../interfaces/Materia';

@Component({
  selector: 'app-modal-form-materia',
  templateUrl: './modal-form-materia.component.html',
  styleUrl: './modal-form-materia.component.scss'
})
export class ModalFormMateriaComponent {
  formMateria: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormMateriaComponent>,   
    private formBuilder: FormBuilder,
    private materiaService: MateriasService, // adicionar somente quando fizer a função save()
    @Inject(MAT_DIALOG_DATA) public data: any, // adicionar somente quando for fazer o edit
  ) { 

  }

  ngOnInit() {  
    this.buildForm();
  }

  buildForm() {
    this.formMateria = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      semestre: [null, [Validators.required]],
      curso: [null, [Validators.required, Validators.minLength(5)]],
      professor: [null, [Validators.required, Validators.minLength(2)]],
      nota: [null],
    });

    // adicionar somente quando for fazer o edit
    if(this.data && this.data.name) {
      this.fillForm();
    }

  }

  // adicionar somente quando for fazer o edit
  fillForm() {
    this.formMateria.patchValue({
      name: this.data.name,
      semestre: this.data.semestre,
      curso: this.data.curso,
      professor: this.data.professor,
      nota: this.data.nota,
    });
  }

  closeModal() { this.dialogRef.close(); }

  save() {
    const model : Materia = this.formMateria.getRawValue();

    // adicionar somente quando for fazer o edit
    if(this.data && this.data.name) {
      this.materiaService.update(this.data.firebaseId, model)
      .then((response: any) => {
          window.alert('Materia atualizada com sucesso');
          this.closeModal();
      })
      .catch((error: any) => {
        window.alert('Erro ao atualizar materia');
        console.log('Erro ao atualizar materia:', error)
      });
    } else {
      this.materiaService.create(model)
      .then((response: any) => {
          window.alert('Materia salva com sucesso');
          this.closeModal();
      })
      .catch((error: any) => {
        window.alert('Erro ao salvar materia');
        console.log('Erro ao salvar materia:', error)
      });
    }
  }  
}


