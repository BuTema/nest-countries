import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CountryModule } from "./country/country.module";
import { UserModule } from "./user/user.module";
import { SharedModule } from "./shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb${configService.get("DB_URL_MODIFIER") || ""}://${configService.getOrThrow("DB_USERNAME")}:${configService.getOrThrow("DB_PASSWORD")}@${configService.getOrThrow("DB_CLUSTER")}/?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),

    CountryModule,
    UserModule,
    SharedModule,
  ],
})
export class AppModule {}
