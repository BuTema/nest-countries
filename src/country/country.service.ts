import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../shared/http.service";

@Injectable()
export class CountryService {
  private dateNagerBaseUrl: string;
  private countriesNowBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.dateNagerBaseUrl = this.configService.get<string>(
      "DATE_NAGER_BASE_URL",
    );
    this.countriesNowBaseUrl = this.configService.get<string>(
      "COUNTRIES_NOW_BASE_URL",
    );
  }

  async getAvailableCountries() {
    const availableCountries = await this.httpService.get(
      `${this.dateNagerBaseUrl}/AvailableCountries`,
    );

    return availableCountries;
  }

  async getCountryInfo(countryCode: string) {
    const countryInfo = await this.httpService.get(
      `${this.dateNagerBaseUrl}/CountryInfo/${countryCode}`,
    );

    const promises = [
      this.httpService.post(
        `${this.countriesNowBaseUrl}/countries/population`,
        {
          country: countryInfo.commonName,
        },
      ),
      this.httpService.post(
        `${this.countriesNowBaseUrl}/countries/flag/images`,
        {
          iso2: countryCode,
        },
      ),
    ];
    const [population, flag] = await Promise.all(promises);

    return {
      ...countryInfo,
      population: population.data.populationCounts,
      flag: flag.data.flag,
    };
  }
}
