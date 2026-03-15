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
  DomainListSecurityScanningResp,
  DomainSecurityScanningRiskDetail,
  GetSecurityScanningDetailParams,
  GetSecurityScanningListParams,
  WebResp,
} from "./types";

/**
 * @description 获取扫描结果
 *
 * @tags Security Scanning
 * @name GetSecurityScanningList
 * @summary 获取扫描结果
 * @request GET:/api/v1/security/scanning
 * @response `200` `(WebResp & {
    data?: DomainListSecurityScanningResp,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getSecurityScanningList = (
  query: GetSecurityScanningListParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListSecurityScanningResp;
    }
  >({
    path: `/api/v1/security/scanning`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取扫描风险详情
 *
 * @tags Security Scanning
 * @name GetSecurityScanningDetail
 * @summary 获取扫描风险详情
 * @request GET:/api/v1/security/scanning/detail
 * @response `200` `(WebResp & {
    data?: (DomainSecurityScanningRiskDetail)[],

})` OK
 * @response `401` `string` Unauthorized
 */

export const getSecurityScanningDetail = (
  query: GetSecurityScanningDetailParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainSecurityScanningRiskDetail[];
    }
  >({
    path: `/api/v1/security/scanning/detail`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
