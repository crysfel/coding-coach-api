import { Injectable, Inject } from '@graphql-modules/di';
import { User } from './User';
import { TableService } from 'azure-storage';

export interface IUserRepository {
    save(user: User): Promise<void>;
    tableName: string;
}

@Injectable()
class UserRepository implements IUserRepository {
    public tableName: string = 'userentity';

    constructor(@Inject('TableService') private tableService: TableService) {
        this.tableService.doesTableExist(this.tableName, (error, result) => {
            if (!result.exists) {
                this.tableService.createTable(this.tableName, (error, result) => {
                    console.log(error);
                    console.log(result);
                });
            }
        });
    }

    public async save(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            this.tableService.insertEntity<User>(
                this.tableName,
                user,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}

export { UserRepository };
