import { Test, TestingModule } from "@nestjs/testing";
import { CountryService } from "./country.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../shared/http.service";

describe("CountryService", () => {
  let countryService: CountryService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) =>
              key === "DATE_NAGER_BASE_URL"
                ? "http://date-nager"
                : "http://countries-now",
            ),
          },
        },
      ],
    }).compile();

    countryService = module.get<CountryService>(CountryService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should fetch available countries", async () => {
    httpService.get = jest.fn().mockResolvedValue(["USA", "Canada"]);

    expect(await countryService.getAvailableCountries()).toEqual([
      "USA",
      "Canada",
    ]);
    expect(httpService.get).toHaveBeenCalledWith(
      "http://date-nager/AvailableCountries",
    );
  });

  it("should fetch country info", async () => {
    httpService.get = jest.fn().mockResolvedValue({ commonName: "USA" });
    httpService.post = jest.fn().mockImplementation((url) => {
      if (url.includes("population"))
        return Promise.resolve({ data: { populationCounts: [1000000] } });
      if (url.includes("flag"))
        return Promise.resolve({ data: { flag: "url-to-flag" } });
    });

    expect(await countryService.getCountryInfo("US")).toEqual({
      commonName: "USA",
      population: [1000000],
      flag: "url-to-flag",
    });
    expect(httpService.get).toHaveBeenCalledWith(
      "http://date-nager/CountryInfo/US",
    );
    expect(httpService.post).toHaveBeenCalledTimes(2);
  });
});
