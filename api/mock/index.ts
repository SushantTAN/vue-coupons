/* eslint-disable @typescript-eslint/no-explicit-any, max-len */
import MockAdapter from "axios-mock-adapter";

import { Api } from "../api";
// import { Session } from "../../../redux/services/models";

// import { TokenUtils } from "@utils";
// import { Constants } from "@assets/constants";

interface MockAdapterOptions {
  delayResponse?: number;
  onNoMatch?: "passthrough" | "throwException";
}

// to mock access/refresh token mechanism
// let customerDetailStatusFlag = true;

export default function mockApi(options: MockAdapterOptions = { delayResponse: 1000 }) {
  const mock = new MockAdapter(Api, options);

  // mock.onPost(Constants.ApiEndpoint.login).reply(() => [
  //   200,
  //   {
  //     statusCode: 200,
  //     message: "Success",
  //     errorMessage: null,
  //     data: {
  //       id: 112,
  //       fullName: "MAADI JALJALA CONST P L",
  //       citizenshipNumber: "123-456",
  //       accessToken:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxMTIiLCJSb2xlSWQiOiIyIiwiTW9iaWxlTnVtYmVyIjoiOTg0OTQ1MTgxMiIsIkN1c3RvbWVySWQiOiIwMDAwNDMxNiIsIm5iZiI6MTY3Njk0NTkxNCwiZXhwIjoxNjc2OTYwMzE0LCJpYXQiOjE2NzY5NDU5MTQsImlzcyI6Imlzc3VlciIsImF1ZCI6ImF1ZGllbmNlIn0.fSEYXpKmpPfV28kcjtGZ-SmDwosa-HqjnUuM4v3LroQ",
  //       refreshToken: "ZNEOUPUqk7GejFItavBsAgN+brGmyHE7R30THDrngBEWMaAGqlTnJu9NA3iO5u18Cnx81vX0nuScIfbIRleHRQ==",
  //       customerId: "00004316",
  //       mobileNumber: "9849451812",
  //     },
  //   },
  // ]);
  // mock.onPost(Constants.ApiEndpoint.registration).reply(() => [200, { message: "Registration completed!" }]);
  // mock.onPost(Constants.ApiEndpoint.logout).reply(() => [200, { message: "Logout completed!" }]);
  // mock.onGet(Constants.ApiEndpoint.getCustomerDetail).reply(() => {
  //   const data = [customerDetailStatusFlag ? 401 : 200, {
  //       statusCode: customerDetailStatusFlag ? 401 : 200,
  //       message: "Success",
  //       errorMessage: null,
  //       data: {
  //         fullName: "MAADI JALJALA CONST P L",
  //         customerId: "00004316",
  //         loanDetailsList: [
  //           {
  //             vehicleName: "JCB JS205 LC Tracked Excavator",
  //             vehicleType: "",
  //             vehicleRegistrationNumber: "Ba 2 Ka 6083",
  //             purchaseDate: "2020-05-19",
  //             mainId: "00142700004316000005",
  //             emiAmount: 33884.18,
  //             nextEmiDate: "2020-05-20",
  //             remainingDayToPayEMi: 0,
  //             overDueAmount: 0,
  //             overDueDay: 0,
  //             remainingEMICount: 0,
  //             totalEMICount: 0,
  //             totalLoanOutstanding: 33884.18,
  //             interestRate: 0,
  //             loanAccountBalance: 33884.18,
  //             closeAmount: 28790.63,
  //             loanMaturityDate: "2020-05-20",
  //           }],
  //       }},
  //   ];

  //   customerDetailStatusFlag = false;

  //   return data;
  // });
  // mock.onGet("apiV1/users").reply(() => [400, { message: "No user found" }]);
  // mock.onPost(Constants.ApiEndpoint.accountStatementDetail).reply(() => [
  //   200,
  //   {
  //     statusCode: 200,
  //     message: "Success",
  //     errorMessage: null,
  //     data: {
  //       clientCode: "00000043",
  //       mainCode: "00103200000043000005",
  //       branchName: "Head Office",
  //       accountName: "BOUDHA NATH NIRMAN SEWA",
  //       accountStatus: "Active",
  //       accountType: "HP - HEAVY EQUIPMENT",
  //       interestRate: 16,
  //       currency: "NPR",
  //       accountBalance: 2198641.12,
  //       statments: [
  //         {
  //           tranType: "DR",
  //           tranDate: "14/02/2076 | 2019-05-28",
  //           desc: "Loan Disburse BOUDHA NATH NIRMAN S LOAN AMOUNT",
  //           totalAmount: 2460000,
  //         },
  //         {
  //           tranType: "CR",
  //           tranDate: "23/02/2076 | 2019-06-06",
  //           desc: "BalnXfr:00103200000043000005 for : 001032000000 ",
  //           totalAmount: 62168.57,
  //         },
  //       ],
  //     },
  //   },
  // ]);
  // mock.onPost(Constants.ApiEndpoint.biometrics).reply(() => [200, { data: {} }]);
  // mock.onPost(Constants.ApiEndpoint.revokeBiometrics).reply(() => [200, { data: {} }]);
  // mock.onGet(Constants.ApiEndpoint.getAllInbox).reply(() => [
  //   200,
  //   {
  //     data: [
  //       {
  //         id: 1263,
  //         userId: 112,
  //         loanId: 300,
  //         sender: "MAW Investment Pvt. Ltd",
  //         title: "EMI Reminder",
  //         body: "Dear customer, Your next EMI date is 2023-02-16. Please pay your EMI on time. MAW Investment Pvt. Ltd.",
  //         createdAt: "2023-03-17T11:15:47",
  //         isSeen: false,
  //       },
  //       {
  //         id: 1266,
  //         userId: 112,
  //         loanId: 305,
  //         sender: "MAW Investment Pvt. Ltd",
  //         title: "EMI Reminder",
  //         body: "Dear customer, Your next EMI date is 2023-02-16. Please pay your EMI on time. MAW Investment Pvt. Ltd.",
  //         createdAt: "2023-03-17T11:15:47",
  //         isSeen: false,
  //       },
  //       {
  //         id: 1265,
  //         userId: 112,
  //         loanId: 304,
  //         sender: "MAW Investment Pvt. Ltd",
  //         title: "EMI Reminder",
  //         body: "Dear customer, Your next EMI date is 2023-02-16. Please pay your EMI on time. MAW Investment Pvt. Ltd.",
  //         createdAt: "2023-03-17T11:15:47",
  //         isSeen: true,
  //       },
  //       {
  //         id: 1243,
  //         userId: 112,
  //         loanId: 302,
  //         sender: "MAW Investment Pvt. Ltd",
  //         title: "EMI Reminder",
  //         body: "Dear customer, Your next EMI date is 2023-02-16. Please pay your EMI on time. MAW Investment Pvt. Ltd.",
  //         createdAt: "2023-03-17T11:15:39",
  //         isSeen: true,
  //       },
  //     ],
  //   },
  // ]);
  // mock.onGet(Constants.ApiEndpoint.getAllLoanCloseRequest).reply(() => [
  //   200,
  //   {
  //     data: [
  //       {
  //         id: 1,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Pending",
  //       },
  //       {
  //         id: 2,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 3,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Pending",
  //       },
  //       {
  //         id: 4,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 5,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Pending",
  //       },
  //       {
  //         id: 6,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 7,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Pending",
  //       },
  //       {
  //         id: 8,
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Acknowledge",
  //       },
  //     ],
  //   },
  // ]);
  // mock.onGet(Constants.ApiEndpoint.getAllApplyForLoanList).reply(() => [
  //   200,
  //   {
  //     data: [
  //       {
  //         id: 1,
  //         applicant_name: "Regan Timsina",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 30,
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 2,
  //         applicant_name: "Ravi Teja",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 10,
  //         status: "Pending",
  //       },
  //       {
  //         id: 3,
  //         applicant_name: "Ramesh Parajuli",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 40,
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 4,
  //         applicant_name: "Roshan Shrestha",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 90,
  //         status: "Pending",
  //       },
  //       {
  //         id: 5,
  //         applicant_name: "Sujana Magar",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 75,
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 6,
  //         applicant_name: "Mahesh Thapa",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 22,
  //         status: "Pending",
  //       },
  //       {
  //         id: 7,
  //         applicant_name: "Ronash Dhakal",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 11,
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 8,
  //         applicant_name: "Ram Yadav",
  //         request_on: "2023-03-17T11:15:47",
  //         financing_percentage: 12,
  //         status: "Pending",
  //       },
  //     ],
  //   },
  // ]);
  // mock.onGet(Constants.ApiEndpoint.getAllComplainFeedback).reply(() => [
  //   200,
  //   {
  //     data: [
  //       {
  //         id: 1263,
  //         title:
  //           "EMI Reminder App crashed when I tried to apply for a loan. EMI Reminder App crashed when I tried to apply for a loan. EMI Reminder App crashed when I tried to apply for a loan. EMI Reminder App crashed when I tried to apply for a loan",
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Pending",
  //       },
  //       {
  //         id: 1266,
  //         title: "EMI Reminder App crashed when I tried to apply",
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Acknowledge",
  //       },
  //       {
  //         id: 1265,
  //         title: "EMI Reminder App crashed when I tried to apply for a loan",
  //         requested_on: "2023-03-17T11:15:47",
  //         status: "Pending",
  //       },
  //       {
  //         id: 1243,
  //         title: "EMI Reminder App crashed when I tried to apply for a loan",
  //         requested_on: "2023-03-17T11:15:39",
  //         status: "Acknowledge",
  //       },
  //     ],
  //   },
  // ]);

  return mock;
}
