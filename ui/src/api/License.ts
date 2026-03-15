/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import request, { ContentType, RequestParams } from "./httpClient";
import { DomainLicenseResp, V1LicenseCreatePayload, WebResp } from "./types";

/**
 * @description Get license
 *
 * @tags license
 * @name V1LicenseList
 * @summary Get license
 * @request GET:/api/v1/license
 * @response `200` `(WebResp & {
    data?: DomainLicenseResp,

})` OK
 */

export const v1LicenseList = (params: RequestParams = {}) =>
  request<
    WebResp & {
      data?: DomainLicenseResp;
    }
  >({
    path: `/api/v1/license`,
    method: "GET",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description Upload license
 *
 * @tags license
 * @name V1LicenseCreate
 * @summary Upload license
 * @request POST:/api/v1/license
 * @response `200` `(WebResp & {
    data?: DomainLicenseResp,

})` OK
 */

export const v1LicenseCreate = (
  data: V1LicenseCreatePayload,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainLicenseResp;
    }
  >({
    path: `/api/v1/license`,
    method: "POST",
    body: data,
    type: ContentType.FormData,
    format: "json",
    ...params,
  });
