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
  GetChatInfoParams,
  GetCompletionInfoParams,
  GetListChatRecordParams,
  GetListCompletionRecordParams,
  WebResp,
} from "./types";

/**
 * @description 获取对话内容
 *
 * @tags Billing
 * @name GetChatInfo
 * @summary 获取对话内容
 * @request GET:/api/v1/billing/chat/info
 * @response `200` `(WebResp & {
    data?: DomainChatInfo,

})` OK
 */

export const getChatInfo = (
  query: GetChatInfoParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainChatInfo;
    }
  >({
    path: `/api/v1/billing/chat/info`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取对话记录
 *
 * @tags Billing
 * @name GetListChatRecord
 * @summary 获取对话记录
 * @request GET:/api/v1/billing/chat/record
 * @response `200` `(WebResp & {
    data?: DomainListChatRecordResp,

})` OK
 */

export const getListChatRecord = (
  query: GetListChatRecordParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListChatRecordResp;
    }
  >({
    path: `/api/v1/billing/chat/record`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取补全内容
 *
 * @tags Billing
 * @name GetCompletionInfo
 * @summary 获取补全内容
 * @request GET:/api/v1/billing/completion/info
 * @response `200` `(WebResp & {
    data?: DomainCompletionInfo,

})` OK
 */

export const getCompletionInfo = (
  query: GetCompletionInfoParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainCompletionInfo;
    }
  >({
    path: `/api/v1/billing/completion/info`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取补全记录
 *
 * @tags Billing
 * @name GetListCompletionRecord
 * @summary 获取补全记录
 * @request GET:/api/v1/billing/completion/record
 * @response `200` `(WebResp & {
    data?: DomainListCompletionRecordResp,

})` OK
 */

export const getListCompletionRecord = (
  query: GetListCompletionRecordParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListCompletionRecordResp;
    }
  >({
    path: `/api/v1/billing/completion/record`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
