import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../shared/http.service";
import { getModelToken } from "@nestjs/mongoose";

const mockUserModel = {
  findOne: jest.fn().mockResolvedValue([]),
  findOneAndUpdate: jest.fn().mockResolvedValue(null),
};

describe("UserService", () => {
  let userService: UserService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue("http://date-nager") },
        },
        {
          provide: getModelToken("UserCalendar"),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should fetch user data", async () => {
    expect(await userService.getUser("123")).toEqual([]);
    expect(mockUserModel.findOne).toHaveBeenCalledWith({ userId: "123" });
  });

  it("should add holidays to user calendar", async () => {
    httpService.get = jest
      .fn()
      .mockResolvedValue([{ name: "Christmas", localName: "Christmas" }]);
    expect(
      await userService.addHolidays("123", "US", 2023, ["Christmas"]),
    ).toEqual({
      message: "Holidays added to calendar successfully",
      events: [{ name: "Christmas", localName: "Christmas" }],
    });
  });
});
