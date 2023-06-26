import MockAdapter from "axios-mock-adapter";

import { Api } from "../api";

interface MockAdapterOptions {
  delayResponse?: number;
  onNoMatch?: "passthrough" | "throwException";
}

export default function mockApi(
  options: MockAdapterOptions = { delayResponse: 1000 }
) {
  const mock = new MockAdapter(Api, options);

  mock.onPost("/login").reply(() => [
    200,
    {
      id: 32,
      email: "regan.timsina@gmail.com",
      firstName: "Regan",
      lastName: "Timsina",
      city: "Kathmandu",
      state: "Bagmati",
      zip: "50005",
      sent: false,
    },
  ]);

  mock.onGet("/student/findAll").reply(() => [
    200,
    [
      {
        id: 32,
        firstName: "Regan",
        lastName: "Timsina",
        city: "Kathmandu",
        state: "Bagmati",
        zip: "50005",
        sent: false,
      },
      {
        id: 34,
        firstName: "Regan",
        lastName: "Timsina",
        city: "Kathmandu",
        state: "Bagmati",
        zip: "50005",
        sent: false,
      },
    ],
  ]);

  return mock;
}
