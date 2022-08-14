import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field(() => String, { description: 'Account name' })
  name: string;
}
