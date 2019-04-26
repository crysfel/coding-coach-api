import 'reflect-metadata';
import { Context, HttpRequest } from '@azure/functions';
import { Inject, Injectable } from '@graphql-modules/di';
import { IUserRepository, User } from '@repositories/user-repository';

@Injectable()
class GetUsers {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {
    // Nothing to do here
  }

  index = async (context: Context, req: HttpRequest): Promise<void> => {

    // @TODO: Add filters
    const users = await this.userRepository.find();

    context.res = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        success: true,
        users,
      },
    };
  };
}

export { GetUsers };
