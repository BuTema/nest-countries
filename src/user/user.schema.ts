import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ strict: true })
export class UserCalendar {
  @Prop()
  userId: string;

  @Prop({ required: true })
  events: string[];
}

export const UserCalendarSchema = SchemaFactory.createForClass(UserCalendar);
