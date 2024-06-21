import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { Page1Component } from './page1/page1.component';
import { Page5allvideosComponent } from './page5allvideos/page5allvideos.component';
import { Page6Component } from './page6/page6.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UsersDataComponent } from './users-data/users-data.component';
import { VideosDataComponent } from './videos-data/videos-data.component';
import { CommentsDataComponent } from './comments-data/comments-data.component';
import { LikesDataComponent } from './likes-data/likes-data.component';
import { AddUserAdminComponent } from './add-user-admin/add-user-admin.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { DashboardchatsComponent } from './dashboardchats/dashboardchats.component';

const routes: Routes = [
  {path: '', component: Page1Component},
  {path :'page5', component: Page5allvideosComponent},
  {path :'page6', component: Page6Component},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path : 'varify-email', component: VarifyEmailComponent},
  {path : 'forgot-password', component: ForgotPasswordComponent},
  {path : 'adminPage', component: AdminPageComponent},
  {path : 'usersData', component : UsersDataComponent},
  {path : 'videosData', component: VideosDataComponent},
  {path : 'commentsData', component : CommentsDataComponent},
  {path : 'likesData', component : LikesDataComponent},
  {path : 'addUser', component : AddUserAdminComponent},
  {path : 'adminLogin', component: AdminLoginComponent},
  {path: 'charts', component : DashboardchatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
