import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customers.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware, UserValidationMiddleware } from './auth/middlewares';
import { RoleService } from './roles/role.service';

@Module({
  imports: [
    AuthModule,
    CustomerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ request, reply }) => ({ request, reply }),
      playground: true,
      introspection: true, // TODO update this so that it's off in production;
    }),
  ],
  controllers: [AppController, CustomerController, AuthController],
  providers: [
    JwtService,
    AppService,
    AuthService,
    PrismaService,
    CustomerService,
    RoleService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('customers');
    consumer.apply(UserValidationMiddleware).forRoutes('customers');
  }
}
