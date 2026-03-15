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
  DomainChatInfo,
  DomainCompletionInfo,
  DomainListChatRecordResp,
  DomainListCompletionRecordResp,
  GetUserChatInfoParams,
  GetUserCompletionInfoParams,
  GetUserListChatRecordParams,
  GetUserListCompletionRecordParams,
  WebResp,
} from "./types";

/**
 * @description 获取对话内容
 *
 * @tags User Record
 * @name GetUserChatInfo
 * @summary 获取对话内容
 * @request GET:/api/v1/user/chat/info
 * @response `200` `(WebResp & {
    data?: DomainChatInfo,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserChatInfo = (
  query: GetUserChatInfoParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainChatInfo;
    }
  >({
    path: `/api/v1/user/chat/info`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取用户对话记录
 *
 * @tags User Record
 * @name GetUserListChatRecord
 * @summary 获取用户对话记录
 * @request GET:/api/v1/user/chat/record
 * @response `200` `(WebResp & {
    data?: DomainListChatRecordResp,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserListChatRecord = (
  query: GetUserListChatRecordParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListChatRecordResp;
    }
  >({
    path: `/api/v1/user/chat/record`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取补全内容
 *
 * @tags User Record
 * @name GetUserCompletionInfo
 * @summary 获取补全内容
 * @request GET:/api/v1/user/completion/info
 * @response `200` `(WebResp & {
    data?: DomainCompletionInfo,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserCompletionInfo = (
  query: GetUserCompletionInfoParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainCompletionInfo;
    }
  >({
    path: `/api/v1/user/completion/info`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取补全记录
 *
 * @tags User Record
 * @name GetUserListCompletionRecord
 * @summary 获取补全记录
 * @request GET:/api/v1/user/completion/record
 * @response `200` `(WebResp & {
    data?: DomainListCompletionRecordResp,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserListCompletionRecord = (
  query: GetUserListCompletionRecordParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListCompletionRecordResp;
    }
  >({
    path: `/api/v1/user/completion/record`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
