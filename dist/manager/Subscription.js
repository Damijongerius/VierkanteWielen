"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionManager = void 0;
const UserManager_1 = require("../DataBase/UserManager");
const userManager = new UserManager_1.UserManager();
class SubscriptionManager {
    constructor() {
        this.subscription1 = new Subscription(1, 10, true, false, false);
        this.subscription2 = new Subscription(1, 20, true, true, false);
        this.subscription3 = new Subscription(1, 30, true, true, true);
    }
    subscribe(subscriber, pakket) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            switch (pakket) {
                case 'pakket-1': {
                    result = yield this.setSubscription(subscriber, this.subscription1);
                    break;
                }
                case 'pakket-2': {
                    result = yield this.setSubscription(subscriber, this.subscription2);
                    break;
                }
                case 'pakket-3': {
                    result = yield this.setSubscription(subscriber, this.subscription3);
                    break;
                }
                default: {
                    console.log('pakket not found');
                    break;
                }
            }
            return result;
        });
    }
    setSubscription(subscriber, subscription) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userManager.addSubscription(subscriber, subscription.subscriptieNummer);
            if (result instanceof Boolean) {
                return false;
            }
            else {
                true;
            }
        });
    }
}
exports.SubscriptionManager = SubscriptionManager;
class Subscription {
    constructor(subscriptieNummer, lessen, examen, theorieCursus, tussentijdseToets) {
        this.subscriptieNummer = subscriptieNummer;
        this.lessen = lessen;
        this.examen = examen;
        this.theorieCursus = theorieCursus;
        this.tussentijdseToets = tussentijdseToets;
    }
}
//# sourceMappingURL=Subscription.js.map