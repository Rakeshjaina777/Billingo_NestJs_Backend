import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}


// mutation {
//   createUser(input: {
//     name: "Rakesh Jain"
//     email: "rakeshjaina777@gmail.com"
//     password: "securepass"
//     role: USER
//   }) {
//     id
//     name
//   }
// }

// query {
//   users {
//     id
//     name
//     email
//     role
//   }
// }
