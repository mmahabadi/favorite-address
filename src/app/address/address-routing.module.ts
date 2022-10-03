import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddressesComponent} from "./components/addresses/addresses.component";
import {AuthGuard} from "../core/services/auth.guard";

export const routes: Routes = [
  {path: '', component: AddressesComponent},
  {path: 'favorites', component: AddressesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
