import { Module } from "@nestjs/common";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
