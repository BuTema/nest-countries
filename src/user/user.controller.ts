import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUserCalendarDto } from "./create-user-calendar.dto";
import { UserCalendar } from "./user.schema";

@Controller("users/")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId")
  async getUser(@Param("userId") userId: string): Promise<UserCalendar> {
    return await this.userService.getUser(userId);
  }

  @Post(":userId/calendar/holidays")
  async addUser(
    @Param("userId") userId: string,
    @Body() body: UserUserCalendarDto,
  ): Promise<{ message: string; events: unknown }> {
    const { countryCode, year, holidays } = body;
    return await this.userService.addHolidays(
      userId,
      countryCode,
      year,
      holidays,
    );
  }
}
