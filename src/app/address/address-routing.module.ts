import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PublicAddressesComponent} from "./components/public-addresses/public-addresses.component";

const routes: Routes = [
  {path: '', component: PublicAddressesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
