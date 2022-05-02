import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

import Market from "~/store/market";

let market: Market;

function initializeStores(store: Store<any>): void {
  market = getModule(Market, store);
}

export { initializeStores, market };