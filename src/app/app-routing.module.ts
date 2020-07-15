import { CheckoutComponent } from './checkout/checkout.component';
import { UserComponent } from './user/user.component';
import { CartComponent } from './cart/cart.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { ShopComponent } from './shop/shop.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'checkout', component: CheckoutComponent },{ path: 'signup', component: SignUpComponent },{ path: 'user', component: UserComponent }, { path: 'login', component: LogInComponent }, { path: '', component: ShopComponent }, { path: 'register', component: ProductRegistrationComponent }, { path: 'cart', component: CartComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
