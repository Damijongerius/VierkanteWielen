import { UserManager } from "../DataBase/UserManager";

const userManager : UserManager = new UserManager();
export class SubscriptionManager{
    subscription1: Subscription = new Subscription(1,10,true,false,false,500); 
    subscription2: Subscription = new Subscription(1,20,true,true,false,800); 
    subscription3: Subscription = new Subscription(1,30,true,true,true,1000); 

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

     getSubscriptionPrice(number : number){
        switch(number){
            case 1: return this.subscription1.prijs;
            case 2: return this.subscription2.prijs;
            case 3: return this.subscription3.prijs;
        }
    }
}

class Subscription{
    subscriptieNummer: number;
    lessen: number;
    examen: boolean;
    theorieCursus: boolean;
    tussentijdseToets: boolean;
    prijs: number;
     
    constructor(
        subscriptieNummer: number,
        lessen: number,
        examen: boolean,
        theorieCursus: boolean,
        tussentijdseToets: boolean,
        prijs: number
    ){
        this.subscriptieNummer = subscriptieNummer;
        this.lessen = lessen;
        this.examen = examen; 
        this.theorieCursus = theorieCursus;
        this.tussentijdseToets = tussentijdseToets;
        this.prijs = prijs;
    }
}