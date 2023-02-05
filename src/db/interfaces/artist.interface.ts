import { DBSign } from './index.interface';
export interface Artist extends DBSign {
    name: string;
    grammy: boolean;
}
