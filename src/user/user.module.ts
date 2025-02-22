import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCalendarSchema } from "./user.schema";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: "UserCalendar", schema: UserCalendarSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
