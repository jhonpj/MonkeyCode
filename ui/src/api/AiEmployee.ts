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
import {
  DomainAIEmployee,
  DomainCreateAIEmployeeReq,
  DomainListAIEmployeeResp,
  DomainUUIDReq,
  DomainUpdateAIEmployeeReq,
  GetAiemployeeInfoParams,
  GetAiemployeeListParams,
  WebResp,
} from "./types";

/**
 * @description 获取AI员工列表
 *
 * @tags AIEmployee
 * @name GetAiemployeeList
 * @summary 获取AI员工列表
 * @request GET:/api/v1/aiemployee
 * @response `200` `(WebResp & {
    data?: DomainListAIEmployeeResp,

})` OK
 */

export const getAiemployeeList = (
  query: GetAiemployeeListParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListAIEmployeeResp;
    }
  >({
    path: `/api/v1/aiemployee`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 更新AI员工
 *
 * @tags AIEmployee
 * @name PutAiemployeeUpdate
 * @summary 更新AI员工
 * @request PUT:/api/v1/aiemployee
 * @response `200` `(WebResp & {
    data?: DomainAIEmployee,

})` OK
 */

export const putAiemployeeUpdate = (
  param: DomainUpdateAIEmployeeReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainAIEmployee;
    }
  >({
    path: `/api/v1/aiemployee`,
    method: "PUT",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 创建AI员工
 *
 * @tags AIEmployee
 * @name PostAiemployeeCreate
 * @summary 创建AI员工
 * @request POST:/api/v1/aiemployee
 * @response `200` `(WebResp & {
    data?: DomainAIEmployee,

})` OK
 */

export const postAiemployeeCreate = (
  param: DomainCreateAIEmployeeReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainAIEmployee;
    }
  >({
    path: `/api/v1/aiemployee`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 删除AI员工
 *
 * @tags AIEmployee
 * @name DeleteAiemployeeDelete
 * @summary 删除AI员工
 * @request DELETE:/api/v1/aiemployee
 * @response `200` `WebResp` OK
 */

export const deleteAiemployeeDelete = (
  param: DomainUUIDReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/aiemployee`,
    method: "DELETE",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取AI员工详情
 *
 * @tags AIEmployee
 * @name GetAiemployeeInfo
 * @summary 获取AI员工详情
 * @request GET:/api/v1/aiemployee/info
 * @response `200` `(WebResp & {
    data?: DomainAIEmployee,

})` OK
 */

export const getAiemployeeInfo = (
  query: GetAiemployeeInfoParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainAIEmployee;
    }
  >({
    path: `/api/v1/aiemployee/info`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
