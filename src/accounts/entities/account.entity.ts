import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
@ObjectType()
export class Account {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @PrimaryKey({ columnType: 'uuid' })
  id!: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Property({ length: 255, nullable: true })
  name?: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Property({ length: 255, nullable: true })
  token?: string;

  @Field(() => GraphQLISODateTime, {
    description: 'Example field (placeholder)',
  })
  @Property({ length: 6 })
  insertedAt!: Date;

  @Field(() => GraphQLISODateTime, {
    description: 'Example field (placeholder)',
  })
  @Property({ length: 6 })
  updatedAt!: Date;
}
