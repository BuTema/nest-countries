import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class HttpService {
  async get(url: string) {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.error(`Got error while fetching GET request to ${url}`, error);
      return null;
    }
  }

  async post(url: string, data: any) {
    try {
      const result = await axios.post(url, data);
      return result.data;
    } catch (error) {
      console.error(`Got error while fetching POST request to ${url}`, error);
      return null;
    }
  }
}
