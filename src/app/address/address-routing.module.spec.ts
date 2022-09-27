import {PublicAddressesComponent} from "./components/public-addresses/public-addresses.component";
import {routes} from "./address-routing.module";

describe('Routes', () => {
    it('should contain a route for /address', () => {
        expect(routes).toEqual(expect.arrayContaining([{path: '', component: PublicAddressesComponent}]))
    })
})
