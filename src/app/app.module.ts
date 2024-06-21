import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { Page1Component } from './page1/page1.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Page6Component } from './page6/page6.component';
import { Page5allvideosComponent } from './page5allvideos/page5allvideos.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UsersDataComponent } from './users-data/users-data.component';
import { VideosDataComponent } from './videos-data/videos-data.component';
import { CommentsDataComponent } from './comments-data/comments-data.component';
import { LikesDataComponent } from './likes-data/likes-data.component';
import { AddUserAdminComponent } from './add-user-admin/add-user-admin.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardchatsComponent } from './dashboardchats/dashboardchats.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    Page1Component,
    Page6Component,
    Page5allvideosComponent,
    AdminPageComponent,
    UsersDataComponent,
    VideosDataComponent,
    CommentsDataComponent,
    LikesDataComponent,
    AddUserAdminComponent,
    AdminLoginComponent,
    DashboardchatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    MatSnackBarModule
  ],
  
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp({"projectId":"myproject-dc366","appId":"1:526381701140:web:5a9581dba7892c483aaf01","storageBucket":"myproject-dc366.appspot.com","apiKey":"AIzaSyCZzatyv3WH-Zcd18tYSyB_k8SfEevk0DI","authDomain":"myproject-dc366.firebaseapp.com","messagingSenderId":"526381701140","measurementId":"G-6SS7BM16E7"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
