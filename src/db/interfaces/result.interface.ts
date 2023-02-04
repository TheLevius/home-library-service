import { Statuses } from './statuses.interface';

export interface Result<T> {
    status: Statuses;
    index?: number;
    row?: T;
}
