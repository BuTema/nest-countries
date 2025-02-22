import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn().mockResolvedValue({ userId: "123", events: [] }),
            addHolidays: jest
              .fn()
              .mockResolvedValue({ message: "Holidays added", events: [] }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it("should return user data", async () => {
    expect(await userController.getUser("123")).toEqual({
      userId: "123",
      events: [],
    });
    expect(userService.getUser).toHaveBeenCalledWith("123");
  });

  it("should add holidays to user calendar", async () => {
    const body = { countryCode: "US", year: 2023, holidays: ["Christmas"] };
    expect(await userController.addUser("123", body)).toEqual({
      message: "Holidays added",
      events: [],
    });
    expect(userService.addHolidays).toHaveBeenCalledWith("123", "US", 2023, [
      "Christmas",
    ]);
  });
});
