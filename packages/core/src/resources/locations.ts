import { HaravanClient } from "../client";
import { Location } from "../types";

export class LocationsResource {
  constructor(private client: HaravanClient) {}

  async list(): Promise<Location[]> {
    const response = await this.client.get<{ locations: Location[] }>("/locations.json");
    return response.locations;
  }

  async get(id: number): Promise<Location> {
    const response = await this.client.get<{ location: Location }>(`/locations/${id}.json`);
    return response.location;
  }
}
