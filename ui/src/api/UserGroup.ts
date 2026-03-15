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
  DeleteDeleteGroupParams,
  DomainCreateUserGroupReq,
  DomainGrantGroupReq,
  DomainGroupAddUserReq,
  DomainGroupRemoveAdminReq,
  DomainGroupRemoveUserReq,
  DomainListUserGroupResp,
  DomainUpdateUserGroupReq,
  DomainUserGroup,
  GetListUserGroupParams,
  WebResp,
} from "./types";

/**
 * @description 列出用户分组
 *
 * @tags UserGroup
 * @name GetListUserGroup
 * @summary 列出用户分组
 * @request GET:/api/v1/admin/user-group
 * @response `200` `(WebResp & {
    data?: DomainListUserGroupResp,

})` OK
 */

export const getListUserGroup = (
  query: GetListUserGroupParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListUserGroupResp;
    }
  >({
    path: `/api/v1/admin/user-group`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 更新用户分组
 *
 * @tags UserGroup
 * @name PutUpdateUserGroup
 * @summary 更新用户分组
 * @request PUT:/api/v1/admin/user-group
 * @response `200` `(WebResp & {
    data?: DomainUserGroup,

})` OK
 */

export const putUpdateUserGroup = (
  param: DomainUpdateUserGroupReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainUserGroup;
    }
  >({
    path: `/api/v1/admin/user-group`,
    method: "PUT",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 创建用户分组
 *
 * @tags UserGroup
 * @name PostCreateGroup
 * @summary 创建用户分组
 * @request POST:/api/v1/admin/user-group
 * @response `200` `(WebResp & {
    data?: DomainUserGroup,

})` OK
 */

export const postCreateGroup = (
  param: DomainCreateUserGroupReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainUserGroup;
    }
  >({
    path: `/api/v1/admin/user-group`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 删除用户分组
 *
 * @tags UserGroup
 * @name DeleteDeleteGroup
 * @summary 删除用户分组
 * @request DELETE:/api/v1/admin/user-group
 * @response `200` `WebResp` OK
 */

export const deleteDeleteGroup = (
  query: DeleteDeleteGroupParams,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/admin/user-group`,
    method: "DELETE",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 从分组中移除管理员
 *
 * @tags UserGroup
 * @name DeleteRemoveAdminFromGroup
 * @summary 从分组中移除管理员
 * @request DELETE:/api/v1/admin/user-group/admin
 * @response `200` `WebResp` OK
 */

export const deleteRemoveAdminFromGroup = (
  param: DomainGroupRemoveAdminReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/admin/user-group/admin`,
    method: "DELETE",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 授权分组给管理员
 *
 * @tags UserGroup
 * @name PostGrantGroup
 * @summary 授权分组给管理员
 * @request POST:/api/v1/admin/user-group/grant
 * @response `200` `WebResp` OK
 */

export const postGrantGroup = (
  param: DomainGrantGroupReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/admin/user-group/grant`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 添加用户到分组
 *
 * @tags UserGroup
 * @name PostAddUserToGroup
 * @summary 添加用户到分组
 * @request POST:/api/v1/admin/user-group/user
 * @response `200` `WebResp` OK
 */

export const postAddUserToGroup = (
  param: DomainGroupAddUserReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/admin/user-group/user`,
    method: "POST",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 从分组中移除用户
 *
 * @tags UserGroup
 * @name DeleteRemoveUserFromGroup
 * @summary 从分组中移除用户
 * @request DELETE:/api/v1/admin/user-group/user
 * @response `200` `WebResp` OK
 */

export const deleteRemoveUserFromGroup = (
  param: DomainGroupRemoveUserReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/admin/user-group/user`,
    method: "DELETE",
    body: param,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
