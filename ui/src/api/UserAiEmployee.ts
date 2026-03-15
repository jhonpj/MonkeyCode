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
  GetUserAiemployeeInfoParams,
  GetUserAiemployeeListParams,
  WebResp,
} from "./types";

/**
 * @description 获取AI员工列表
 *
 * @tags User AIEmployee
 * @name GetUserAiemployeeList
 * @summary 获取AI员工列表
 * @request GET:/api/v1/user/aiemployee
 * @response `200` `(WebResp & {
    data?: DomainListAIEmployeeResp,

})` OK
 */

export const getUserAiemployeeList = (
  query: GetUserAiemployeeListParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListAIEmployeeResp;
    }
  >({
    path: `/api/v1/user/aiemployee`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 更新AI员工
 *
 * @tags User AIEmployee
 * @name PutUserAiemployeeUpdate
 * @summary 更新AI员工
 * @request PUT:/api/v1/user/aiemployee
 * @response `200` `(WebResp & {
    data?: DomainAIEmployee,

})` OK
 */

export const putUserAiemployeeUpdate = (
  param: DomainUpdateAIEmployeeReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainAIEmployee;
    }
  >({
    path: `/api/v1/user/aiemployee`,
    method: "PUT",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 创建AI员工
 *
 * @tags User AIEmployee
 * @name PostUserAiemployeeCreate
 * @summary 创建AI员工
 * @request POST:/api/v1/user/aiemployee
 * @response `200` `(WebResp & {
    data?: DomainAIEmployee,

})` OK
 */

export const postUserAiemployeeCreate = (
  param: DomainCreateAIEmployeeReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainAIEmployee;
    }
  >({
    path: `/api/v1/user/aiemployee`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 删除AI员工
 *
 * @tags User AIEmployee
 * @name DeleteUserAiemployeeDelete
 * @summary 删除AI员工
 * @request DELETE:/api/v1/user/aiemployee
 * @response `200` `WebResp` OK
 */

export const deleteUserAiemployeeDelete = (
  param: DomainUUIDReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/user/aiemployee`,
    method: "DELETE",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取AI员工详情
 *
 * @tags User AIEmployee
 * @name GetUserAiemployeeInfo
 * @summary 获取AI员工详情
 * @request GET:/api/v1/user/aiemployee/info
 * @response `200` `(WebResp & {
    data?: DomainAIEmployee,

})` OK
 */

export const getUserAiemployeeInfo = (
  query: GetUserAiemployeeInfoParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainAIEmployee;
    }
  >({
    path: `/api/v1/user/aiemployee/info`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
