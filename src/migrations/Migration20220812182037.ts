import { Migration } from '@mikro-orm/migrations';

export class Migration20220812182037 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "account" ("id" uuid not null, "name" varchar(255) null, "token" varchar(255) null, "inserted_at" timestamptz(6) not null, "updated_at" timestamptz(6) not null, constraint "account_pkey" primary key ("id"));',
    );
  }
}
