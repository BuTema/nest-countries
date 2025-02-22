import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../shared/http.service";
import { Model } from "mongoose";
import { UserCalendar } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  private dateNagerBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel("UserCalendar")
    private readonly userModel: Model<UserCalendar>,
  ) {
    this.dateNagerBaseUrl = this.configService.get<string>(
      "DATE_NAGER_BASE_URL",
    );
  }

  async getUser(userId: string): Promise<UserCalendar> {
    return this.userModel.findOne({ userId }) as unknown as UserCalendar;
  }

  // Fetch holidays from Date Nager, filter, and save to database
  async addHolidays(
    userId: string,
    countryCode: string,
    year: number,
    selectedHolidays: string[],
  ) {
    const url = `${this.dateNagerBaseUrl}/PublicHolidays/${year}/${countryCode}`;
    const holidaysData = await this.httpService.get(url);

    if (Array.isArray(holidaysData)) {
      const filteredHolidays = holidaysData.filter(
        (holiday) =>
          selectedHolidays.some((selected) =>
            holiday.name.includes(selected),
          ) ||
          selectedHolidays.some((selected) =>
            holiday.localName.includes(selected),
          ),
      );

      await this.userModel.findOneAndUpdate(
        { userId },
        {
          $addToSet: { events: { $each: filteredHolidays } },
        },
        { upsert: true, new: true },
      );

      return {
        message: "Holidays added to calendar successfully",
        events: filteredHolidays,
      };
    }
  }
}
