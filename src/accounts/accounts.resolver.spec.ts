import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import ormConfig from '../mikro-orm.config';
import { AccountsResolver } from './accounts.resolver';

describe('AccountsResolver', () => {
  let resolver: AccountsResolver;
  let orm: MikroORM;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(ormConfig), AppModule],
    }).compile();

    orm = module.get(MikroORM);
    resolver = module.get<AccountsResolver>(AccountsResolver);
    await orm.getSchemaGenerator().clearDatabase();
  });

  afterAll(async () => await orm.close(true));

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
