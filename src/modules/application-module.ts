<<<<<<< HEAD
import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';
import { AddMentee } from '@handlers/add-mentee/add-mentee-handler';
import { AddUser } from '@handlers/add-user/add-user-handler';
import { GetMentees } from '@handlers/get-mentees/get-mentees-handler';
import { GetMentor } from '@handlers/get-mentor/get-mentor-handler';
import { BoundaryModule } from './boundary-module';

const ApplicationModule = new GraphQLModule({
    providers: [AddMentee, AddUser, GetMentees, GetMentor],
    imports: [BoundaryModule],
=======
import "reflect-metadata";
import { GraphQLModule } from "@graphql-modules/core";
import { AddMentee } from "@handlers/add-mentee/add-mentee-handler";
import { AddUser } from "@handlers/add-user/add-user-handler";
import { GetMentees } from "@handlers/get-mentees/get-mentees-handler";
import { GetMentor } from "@handlers/get-mentor/get-mentor-handler";
import { GetUsers } from "@handlers/get-users/get-users-handler";
import { BoundaryModule } from "./boundary-module";

const ApplicationModule = new GraphQLModule({
  providers: [AddMentee, AddUser, GetMentees, GetMentor, GetUsers],
  imports: [BoundaryModule]
>>>>>>> Setting up the get users serverless function
});

export { ApplicationModule };
