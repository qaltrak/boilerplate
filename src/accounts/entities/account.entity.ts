import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
@ObjectType()
export class Account {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @PrimaryKey({ columnType: 'uuid' })
  id: string = v4();

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Property({ length: 255, nullable: true })
  name?: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Property({ length: 255, nullable: true, unique: true })
  token?: string = v4();

  @Field(() => GraphQLISODateTime, {
    description: 'Example field (placeholder)',
  })
  @Property({})
  insertedAt: Date = new Date();

  @Field(() => GraphQLISODateTime, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt!: Date;
}
