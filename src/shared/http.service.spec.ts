import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "../shared/http.service";
import axios from "axios";

describe("HttpService", () => {
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
  });

  it("should make a GET request and return data", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: "response" });
    expect(await httpService.get("http://example.com")).toEqual("response");
  });

  it("should handle GET request errors and return null", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));
    expect(await httpService.get("http://example.com")).toBeNull();
  });

  it("should make a POST request and return data", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: "response" });
    expect(
      await httpService.post("http://example.com", { key: "value" }),
    ).toEqual("response");
  });

  it("should handle POST request errors and return null", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error("Network Error"));
    expect(
      await httpService.post("http://example.com", { key: "value" }),
    ).toBeNull();
  });
});
