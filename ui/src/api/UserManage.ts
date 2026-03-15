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
import { DomainProfileUpdateReq, DomainUser, WebResp } from "./types";

/**
 * @description 获取用户信息
 *
 * @tags User Manage
 * @name GetUserProfile
 * @summary 获取用户信息
 * @request GET:/api/v1/user/profile
 * @response `200` `(WebResp & {
    data?: DomainUser,

})` OK
 * @response `401` `WebResp` Unauthorized
 */

export const getUserProfile = (params: RequestParams = {}) =>
  request<
    WebResp & {
      data?: DomainUser;
    }
  >({
    path: `/api/v1/user/profile`,
    method: "GET",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 更新用户信息
 *
 * @tags User Manage
 * @name PutUserUpdateProfile
 * @summary 更新用户信息
 * @request PUT:/api/v1/user/profile
 * @response `200` `(WebResp & {
    data?: DomainUser,

})` OK
 * @response `401` `WebResp` Unauthorized
 */

export const putUserUpdateProfile = (
  req: DomainProfileUpdateReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainUser;
    }
  >({
    path: `/api/v1/user/profile`,
    method: "PUT",
    body: req,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
