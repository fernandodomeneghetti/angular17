import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CrudComponent } from './pages/crud/crud.component';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Angular
import { AngularFireModule } from '@angular/fire/compat';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore())

    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//{"projectId":"crud-materias-c0dc3","appId":"1:927437434348:web:6e7981cf6e6988f68924c9","storageBucket":"crud-materias-c0dc3.appspot.com","apiKey":"AIzaSyBEnYyMdP4GgHbecATmSQtWN-fL-OoKck4","authDomain":"crud-materias-c0dc3.firebaseapp.com","messagingSenderId":"927437434348","measurementId":"G-94HF3LEQ7S"}