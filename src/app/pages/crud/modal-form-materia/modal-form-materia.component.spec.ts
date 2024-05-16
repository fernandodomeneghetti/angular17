import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormMateriaComponent } from './modal-form-materia.component';

describe('ModalFormMateriaComponent', () => {
  let component: ModalFormMateriaComponent;
  let fixture: ComponentFixture<ModalFormMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
