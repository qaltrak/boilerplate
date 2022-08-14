import {
  EntityRepository,
  MikroORM,
  QueryOrder,
  UseRequestContext,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
    private readonly orm: MikroORM,
  ) {}
  @UseRequestContext()
  async create(createAccountInput: CreateAccountInput) {
    const account = this.accountRepository.create({
      name: createAccountInput.name,
    });
    await this.accountRepository.persistAndFlush(account);
    return account;
  }

  @UseRequestContext()
  findAll() {
    return this.accountRepository.findAll({
      orderBy: { name: QueryOrder.DESC },
      limit: 20,
    });
  }

  @UseRequestContext()
  findOne(id: string) {
    return this.accountRepository.findOneOrFail({ id });
  }

  @UseRequestContext()
  async update(id: string, updateAccountInput: UpdateAccountInput) {
    const account = await this.accountRepository.findOne({ id });
    wrap(account).assign(updateAccountInput);
    await this.accountRepository.flush();
    return account;
  }

  @UseRequestContext()
  remove(id: string) {
    return this.accountRepository.nativeDelete({ id });
  }
}
