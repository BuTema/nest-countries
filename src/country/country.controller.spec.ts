import { Test, TestingModule } from "@nestjs/testing";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";

describe("CountryController", () => {
  let countryController: CountryController;
  let countryService: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: {
            getAvailableCountries: jest
              .fn()
              .mockResolvedValue(["USA", "Canada"]),
            getCountryInfo: jest.fn().mockResolvedValue({
              commonName: "USA",
              population: [],
              flag: "url-to-flag",
            }),
          },
        },
      ],
    }).compile();

    countryController = module.get<CountryController>(CountryController);
    countryService = module.get<CountryService>(CountryService);
  });

  it("should return available countries", async () => {
    expect(await countryController.getAvailableCountries()).toEqual([
      "USA",
      "Canada",
    ]);
    expect(countryService.getAvailableCountries).toHaveBeenCalled();
  });

  it("should return country info", async () => {
    expect(await countryController.getCountryInfo("US")).toEqual({
      commonName: "USA",
      population: [],
      flag: "url-to-flag",
    });
    expect(countryService.getCountryInfo).toHaveBeenCalledWith("US");
  });
});
