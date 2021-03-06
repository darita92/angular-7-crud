import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '',
    component: ListProductsComponent,
    pathMatch: 'full',
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
