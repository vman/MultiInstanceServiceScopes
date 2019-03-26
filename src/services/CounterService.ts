import { ServiceKey } from '@microsoft/sp-core-library';

export interface ICounterService {
    increaseAndReturnCount(): number;
}

export class CounterService implements ICounterService {

    public static readonly serviceKey: ServiceKey<ICounterService> =
        ServiceKey.create<CounterService>('my-custom-app:ICounterService', CounterService);

    private count: number = 0;

    public increaseAndReturnCount(): number {
        return this.count++;
    }
}