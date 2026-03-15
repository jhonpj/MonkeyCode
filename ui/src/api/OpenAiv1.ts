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
  DomainAcceptCompletionReq,
  DomainCreateSecurityScanningReq,
  DomainListSecurityScanningBriefResp,
  DomainListSecurityScanningDetailResp,
  DomainListSecurityScanningReq,
  DomainReportReq,
  GetListSecurityScanningDetailParams,
  GithubComChaitinMonkeyCodeBackendDomainModelListResp,
  WebResp,
} from "./types";

/**
 * @description 处理聊天补全请求
 *
 * @tags OpenAIV1
 * @name PostChatCompletion
 * @summary 处理聊天补全请求
 * @request POST:/v1/chat/completions
 * @response `200` `WebResp` OK
 */

export const postChatCompletion = (params: RequestParams = {}) =>
  request<WebResp>({
    path: `/v1/chat/completions`,
    method: "POST",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 接受补全请求
 *
 * @tags OpenAIV1
 * @name PostAcceptCompletion
 * @summary 接受补全请求
 * @request POST:/v1/completion/accept
 * @response `200` `WebResp` OK
 */

export const postAcceptCompletion = (
  param: DomainAcceptCompletionReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/v1/completion/accept`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 处理文本补全请求
 *
 * @tags OpenAIV1
 * @name PostCompletions
 * @summary 处理文本补全请求
 * @request POST:/v1/completions
 * @response `200` `WebResp` OK
 */

export const postCompletions = (params: RequestParams = {}) =>
  request<WebResp>({
    path: `/v1/completions`,
    method: "POST",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 处理嵌入请求
 *
 * @tags OpenAIV1
 * @name PostEmbeddings
 * @summary 处理嵌入请求
 * @request POST:/v1/embeddings
 * @response `200` `WebResp` OK
 */

export const postEmbeddings = (params: RequestParams = {}) =>
  request<WebResp>({
    path: `/v1/embeddings`,
    method: "POST",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 固定回包 `{"code": 0, "data": "MonkeyCode"}`
 *
 * @tags OpenAIV1
 * @name GetHealth
 * @summary 健康检查
 * @request GET:/v1/health
 * @response `200` `WebResp` OK
 */

export const getHealth = (params: RequestParams = {}) =>
  request<WebResp>({
    path: `/v1/health`,
    method: "GET",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 模型列表
 *
 * @tags OpenAIV1
 * @name GetModelList
 * @summary 模型列表
 * @request GET:/v1/models
 * @response `200` `(WebResp & {
    data?: GithubComChaitinMonkeyCodeBackendDomainModelListResp,

})` OK
 */

export const getModelList = (params: RequestParams = {}) =>
  request<
    WebResp & {
      data?: GithubComChaitinMonkeyCodeBackendDomainModelListResp;
    }
  >({
    path: `/v1/models`,
    method: "GET",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 报告，支持多种操作：accept（接受补全）、suggest（建议）、reject（拒绝补全并记录用户输入）、file_written（文件写入）
 *
 * @tags OpenAIV1
 * @name PostReport
 * @summary 报告
 * @request POST:/v1/report
 * @response `200` `WebResp` OK
 */

export const postReport = (
  param: DomainReportReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/v1/report`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 扫描任务列表
 *
 * @tags OpenAIV1
 * @name GetListSecurityScanning
 * @summary 扫描任务列表
 * @request GET:/v1/security/scanning
 * @response `200` `(WebResp & {
    data?: DomainListSecurityScanningBriefResp,

})` OK
 */

export const getListSecurityScanning = (
  param: DomainListSecurityScanningReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListSecurityScanningBriefResp;
    }
  >({
    path: `/v1/security/scanning`,
    method: "GET",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 创建扫描任务
 *
 * @tags OpenAIV1
 * @name PostCreateSecurityScanning
 * @summary 创建扫描任务
 * @request POST:/v1/security/scanning
 * @response `200` `WebResp` OK
 */

export const postCreateSecurityScanning = (
  param: DomainCreateSecurityScanningReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/v1/security/scanning`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 分页只支持 next_token; 首页传空，后续判断has_next_page是否为true，传入回包给的next_token
 *
 * @tags OpenAIV1
 * @name GetListSecurityScanningDetail
 * @summary 获取扫描任务风险详情列表
 * @request GET:/v1/security/scanning/detail
 * @response `200` `(WebResp & {
    data?: DomainListSecurityScanningDetailResp,

})` OK
 */

export const getListSecurityScanningDetail = (
  query: GetListSecurityScanningDetailParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListSecurityScanningDetailResp;
    }
  >({
    path: `/v1/security/scanning/detail`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
