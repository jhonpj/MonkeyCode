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
  GetUserSecurityScanningDetailParams,
  GetUserSecurityScanningListParams,
  WebResp,
} from "./types";

/**
 * @description 获取用户扫描结果
 *
 * @tags User Security Scanning
 * @name GetUserSecurityScanningList
 * @summary 获取用户扫描结果
 * @request GET:/api/v1/user/security/scanning
 * @response `200` `(WebResp & {
    data?: DomainListSecurityScanningResp,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserSecurityScanningList = (
  query: GetUserSecurityScanningListParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListSecurityScanningResp;
    }
  >({
    path: `/api/v1/user/security/scanning`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取用户扫描风险详情
 *
 * @tags User Security Scanning
 * @name GetUserSecurityScanningDetail
 * @summary 获取用户扫描风险详情
 * @request GET:/api/v1/user/security/scanning/detail
 * @response `200` `(WebResp & {
    data?: (DomainSecurityScanningRiskDetail)[],

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserSecurityScanningDetail = (
  query: GetUserSecurityScanningDetailParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainSecurityScanningRiskDetail[];
    }
  >({
    path: `/api/v1/user/security/scanning/detail`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
