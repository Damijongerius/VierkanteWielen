import { UserManager } from "../DataBase/UserManager";

const userManager : UserManager = new UserManager();
export class SubscriptionManager{
    subscription1: Subscription = new Subscription(1,10,true,false,false); 
    subscription2: Subscription = new Subscription(1,20,true,true,false); 
    subscription3: Subscription = new Subscription(1,30,true,true,true); 

    async subscribe(subscriber: number, pakket: string){
        let result: boolean = false;
        switch(pakket){
            case 'pakket-1': {
                result = await this.setSubscription(subscriber, this.subscription1);
                break;
            }
            case 'pakket-2': {
                result = await this.setSubscription(subscriber, this.subscription2);
                break;
            }
            case 'pakket-3': {
                result = await this.setSubscription(subscriber, this.subscription3);
                break;
            }
            default: {
                console.log('pakket not found');
                break;
            }
          }
          return result;
    }

    async setSubscription(subscriber: number,subscription: Subscription): Promise<boolean>{
        
        const result = await userManager.addSubscription(subscriber,subscription.subscriptieNummer);
        if(result instanceof Boolean){
            return false;
        }else{
            true;
        }
    }
}

class Subscription{
    subscriptieNummer: number;
    lessen: number;
    examen: boolean;
    theorieCursus: boolean;
    tussentijdseToets: boolean;
     
    constructor(
        subscriptieNummer: number,
        lessen: number,
        examen: boolean,
        theorieCursus: boolean,
        tussentijdseToets: boolean
    ){
        this.subscriptieNummer = subscriptieNummer;
        this.lessen = lessen;
        this.examen = examen; 
        this.theorieCursus = theorieCursus;
        this.tussentijdseToets = tussentijdseToets;
    }
}