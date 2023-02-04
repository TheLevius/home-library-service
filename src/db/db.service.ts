import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateDBUserDto } from './dto/user/create-user.dto';
import { DBAlbum, Album } from './interfaces/album.interface';
import { DBArtist, Artist } from './interfaces/artist.interface';
import { DBTrack, Track } from './interfaces/track.interface';
import { DBUser } from './interfaces/user.interface';
type User = DBUser;
@Injectable()
export class DbService {
    private users: DBUser[] = [];
    private artists: DBArtist[] = [];
    private tracks: DBTrack[] = [];
    private albums: DBAlbum[] = [];

    public findAll = (
        tableName: TableNames
    ): (User | Artist | Track | Album)[] =>
        this[tableName].map((elem: User | Artist | Track | Album) => {
            const { ...item } = elem;
            if (item.hasOwnProperty('favorite')) {
                delete item['favorite'];
            }
            return item;
        });
    public findOneById = (tableName: TableNames, id: string): any => {
        const currentTable = this[tableName];
        const index = currentTable.findIndex(
            (elem: DBUser | DBArtist | DBTrack | DBAlbum) => elem.id === id
        );
        const { ...user } = this[tableName][index];
        if (user.hasOwnProperty('favorite')) {
            delete user['favorite'];
        }
        const result = {
            user,
            index,
        };
        return result;
    };
    public findAllFavorites = (
        tableName: TableFavNames
    ): (Artist | Track | Album)[] => {
        const currentTable: (DBArtist | DBTrack | DBAlbum)[] = this[tableName];
        const result: (Artist | Track | Album)[] = [];
        return currentTable.reduce((acc, elem) => {
            if (elem.favorite) {
                const res: Artist | Track | Album = this.cloneElem(elem);
                acc.push(res);
            }
            return acc;
        }, result);
    };
    private createUser = ({ login, password }: CreateDBUserDto) => {
        const currentDate = Date.now();
        const newUser: User = {
            id: randomUUID(),
            login,
            password,
            createdAt: currentDate,
            updatedAt: currentDate,
            version: 1,
        };
        this.users.push(newUser);
        return newUser;
    };
    private updateUser = (id: string, password: string) => {
        const { user, index }: { user: User; index: number } = this.findOneById(
            TableNames.Users,
            id
        );
        if (user) {
            user.version++;
            user.updatedAt = Date.now();
            user.password = password;
        }
        this.users[index] = user;
        return user;
    };

    private cloneElem = (elem) => {
        const { ...item } = elem;
        if (item.hasOwnProperty('favorite')) {
            delete item['favorite'];
        }
        return item;
    };
}

export const enum TableNames {
    Users = 'users',
    Artists = 'artists',
    Tracks = 'tracks',
    Albums = 'albums',
}
export const enum TableFavNames {
    Artists = 'artists',
    Tracks = 'tracks',
    Albums = 'albums',
}
// interface Animal {
//     type: 'animal';
// }

// interface Vegetable {
//     type: 'vegetable';
// }

// type Thing = Animal | Vegetable;

// function isAnimal(value: Thing): value is Animal {
//     return value.type === 'animal';
// }

// function removeType(value: Thing) {
//     if (isAnimal(value)) {
//         // value is now of type Animal
//         console.log('This is an animal');
//     } else {
//         // value is of type Vegetable
//         console.log('This is a vegetable');
//     }
// }

// interface Animal {
//     type: 'animal';
// }

// interface Vegetable {
//     type: 'vegetable';
// }

// type Thing = Animal | Vegetable;

// function removeType(value: Thing) {
//     if (value.type === 'animal') {
//         // value is of type Animal
//         console.log('This is an animal');
//     } else {
//         // value is of type Vegetable
//         console.log('This is a vegetable');
//     }
// }
