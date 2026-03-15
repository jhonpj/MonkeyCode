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
  DomainUserEvent,
  DomainUserHeatmapResp,
  DomainUserStat,
  GetUserDashboardEventsParams,
  GetUserDashboardStatParams,
  WebResp,
} from "./types";

/**
 * @description 获取用户事件
 *
 * @tags User Dashboard
 * @name GetUserDashboardEvents
 * @summary 获取用户事件
 * @request GET:/api/v1/user/dashboard/events
 * @response `200` `(WebResp & {
    data?: (DomainUserEvent)[],

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserDashboardEvents = (
  query: GetUserDashboardEventsParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainUserEvent[];
    }
  >({
    path: `/api/v1/user/dashboard/events`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 用户热力图
 *
 * @tags User Dashboard
 * @name GetUserDashboardHeatmap
 * @summary 用户热力图
 * @request GET:/api/v1/user/dashboard/heatmap
 * @response `200` `(WebResp & {
    data?: DomainUserHeatmapResp,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserDashboardHeatmap = (params: RequestParams = {}) =>
  request<
    WebResp & {
      data?: DomainUserHeatmapResp;
    }
  >({
    path: `/api/v1/user/dashboard/heatmap`,
    method: "GET",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 获取用户统计信息
 *
 * @tags User Dashboard
 * @name GetUserDashboardStat
 * @summary 获取用户统计信息
 * @request GET:/api/v1/user/dashboard/stat
 * @response `200` `(WebResp & {
    data?: DomainUserStat,

})` OK
 * @response `401` `string` Unauthorized
 */

export const getUserDashboardStat = (
  query: GetUserDashboardStatParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainUserStat;
    }
  >({
    path: `/api/v1/user/dashboard/stat`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
