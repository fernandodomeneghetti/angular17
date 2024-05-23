import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Materia } from '../interfaces/Materia';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class MateriasService {

  apiURL = 'http://localhost:3000';

  constructor(private dataBaseStore: AngularFirestore, private http: HttpClient) { }

  getAll() {
    return this.http.get(`${ this.apiURL }/materias`, {responseType:'json'});
    // return this.dataBaseStore.collection('materias', materia => materia.orderBy('name')).valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  create(materia: Materia) {
    return this.dataBaseStore.collection('materias').add(materia);
  }

  update(materiaId: string, materia: Materia) {
    return this.dataBaseStore.collection('materias').doc(materiaId).update(materia);
  }

  delete(materiaId: string) {
    return this.dataBaseStore.collection('materias').doc(materiaId).delete();
  }

  getByFetch() {
    return this.http.get(`${ this.apiURL }/materias`, {responseType:'json'});
  }
}
