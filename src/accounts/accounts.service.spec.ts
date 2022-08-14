import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import ormConfig from '../mikro-orm.config';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

describe('AccountsService', () => {
  let service: AccountsService;
  let orm: MikroORM;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(ormConfig),
        MikroOrmModule.forFeature([Account]),
      ],
      providers: [AccountsService],
    }).compile();

    orm = module.get(MikroORM);
    service = module.get<AccountsService>(AccountsService);
    await orm.getSchemaGenerator().clearDatabase();
  });

  afterAll(async () => {
    await orm.close(true);
  });

  it('should be create an account', async () => {
    const name = 'test name';
    const account = await service.create({ name });
    expect(account.name).toEqual(name);
  });

  it('should be find account by ID', async () => {
    const name = 'test name';
    const account = await service.create({ name });
    const retrievedAccount = await service.findOne(account.id);
    expect(retrievedAccount.name).toEqual(account.name);
    expect(retrievedAccount.token).toEqual(account.token);
  });

  it('should be find all account', async () => {
    const name = 'test name';
    await service.create({ name });
    await service.create({ name });
    const accounts = await service.findAll();
    expect(accounts.length).toEqual(2);
  });

  it('should be update an account', async () => {
    const name = 'test name';
    const updatedName = 'updated name';
    const account = await service.create({ name });
    const updatedAccount = await service.update(account.id, {
      id: account.id,
      name: updatedName,
    });
    expect(updatedAccount.name).toEqual(updatedName);
    expect(updatedAccount.id).toEqual(account.id);
    expect(updatedAccount.updatedAt).toBeTruthy();
  });

  it('should be delete an account', async () => {
    const name = 'test name';
    const account = await service.create({ name });
    const altAccount = await service.create({ name });
    expect(await (await service.findAll()).length).toEqual(2);
    await service.remove(account.id);
    expect(await (await service.findAll()).length).toEqual(1);
    expect(await (await service.findAll())[0].name).toEqual(altAccount.name);
    expect(await (await service.findAll())[0].token).toEqual(altAccount.token);
  });
});
