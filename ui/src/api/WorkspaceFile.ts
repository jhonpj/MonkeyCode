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
  DomainBatchCreateWorkspaceFileReq,
  DomainBatchUpdateWorkspaceFileReq,
  DomainCreateWorkspaceFileReq,
  DomainGetAndSaveReq,
  DomainListWorkspaceFileResp,
  DomainSyncWorkspaceFileReq,
  DomainSyncWorkspaceFileResp,
  DomainUpdateWorkspaceFileReq,
  DomainWorkspaceFile,
  GetGetWorkspaceFileByPathParams,
  GetListWorkspaceFilesParams,
  WebResp,
} from "./types";

/**
 * @description 分页获取工作区文件列表
 *
 * @tags WorkspaceFile
 * @name GetListWorkspaceFiles
 * @summary 获取工作区文件列表
 * @request GET:/api/v1/workspace/files
 * @response `200` `(WebResp & {
    data?: DomainListWorkspaceFileResp,

})` OK
 */

export const getListWorkspaceFiles = (
  query: GetListWorkspaceFilesParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainListWorkspaceFileResp;
    }
  >({
    path: `/api/v1/workspace/files`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 创建一个新的工作区文件
 *
 * @tags WorkspaceFile
 * @name PostCreateWorkspaceFile
 * @summary 创建工作区文件
 * @request POST:/api/v1/workspace/files
 * @response `200` `(WebResp & {
    data?: DomainWorkspaceFile,

})` OK
 */

export const postCreateWorkspaceFile = (
  file: DomainCreateWorkspaceFileReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainWorkspaceFile;
    }
  >({
    path: `/api/v1/workspace/files`,
    method: "POST",
    body: file,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 批量更新多个工作区文件
 *
 * @tags WorkspaceFile
 * @name PutBatchUpdateWorkspaceFiles
 * @summary 批量更新工作区文件
 * @request PUT:/api/v1/workspace/files/batch
 * @response `200` `(WebResp & {
    data?: (DomainWorkspaceFile)[],

})` OK
 */

export const putBatchUpdateWorkspaceFiles = (
  files: DomainBatchUpdateWorkspaceFileReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainWorkspaceFile[];
    }
  >({
    path: `/api/v1/workspace/files/batch`,
    method: "PUT",
    body: files,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 批量创建多个工作区文件
 *
 * @tags WorkspaceFile
 * @name PostBatchCreateWorkspaceFiles
 * @summary 批量创建工作区文件
 * @request POST:/api/v1/workspace/files/batch
 * @response `200` `(WebResp & {
    data?: (DomainWorkspaceFile)[],

})` OK
 */

export const postBatchCreateWorkspaceFiles = (
  files: DomainBatchCreateWorkspaceFileReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainWorkspaceFile[];
    }
  >({
    path: `/api/v1/workspace/files/batch`,
    method: "POST",
    body: files,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 根据用户ID、项目ID和文件路径获取工作区文件
 *
 * @tags WorkspaceFile
 * @name GetGetWorkspaceFileByPath
 * @summary 根据路径获取工作区文件
 * @request GET:/api/v1/workspace/files/by-path
 * @response `200` `(WebResp & {
    data?: DomainWorkspaceFile,

})` OK
 */

export const getGetWorkspaceFileByPath = (
  query: GetGetWorkspaceFileByPathParams,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainWorkspaceFile;
    }
  >({
    path: `/api/v1/workspace/files/by-path`,
    method: "GET",
    query: query,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * No description
 *
 * @tags WorkspaceFile
 * @name V1WorkspaceFilesGetAndSaveCreate
 * @summary 获取并保存工作区文件
 * @request POST:/api/v1/workspace/files/get-and-save
 * @response `200` `WebResp` OK
 */

export const v1WorkspaceFilesGetAndSaveCreate = (
  req: DomainGetAndSaveReq,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/workspace/files/get-and-save`,
    method: "POST",
    body: req,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 同步本地文件到工作区，智能检测新增、修改和删除
 *
 * @tags WorkspaceFile
 * @name PostSyncWorkspaceFiles
 * @summary 同步工作区文件
 * @request POST:/api/v1/workspace/files/sync
 * @response `200` `(WebResp & {
    data?: DomainSyncWorkspaceFileResp,

})` OK
 */

export const postSyncWorkspaceFiles = (
  sync: DomainSyncWorkspaceFileReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainSyncWorkspaceFileResp;
    }
  >({
    path: `/api/v1/workspace/files/sync`,
    method: "POST",
    body: sync,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 根据文件ID获取工作区文件详情
 *
 * @tags WorkspaceFile
 * @name GetGetWorkspaceFileById
 * @summary 根据ID获取工作区文件
 * @request GET:/api/v1/workspace/files/{id}
 * @response `200` `(WebResp & {
    data?: DomainWorkspaceFile,

})` OK
 */

export const getGetWorkspaceFileById = (
  id: string,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainWorkspaceFile;
    }
  >({
    path: `/api/v1/workspace/files/${id}`,
    method: "GET",
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 更新指定的工作区文件
 *
 * @tags WorkspaceFile
 * @name PutUpdateWorkspaceFile
 * @summary 更新工作区文件
 * @request PUT:/api/v1/workspace/files/{id}
 * @response `200` `(WebResp & {
    data?: DomainWorkspaceFile,

})` OK
 */

export const putUpdateWorkspaceFile = (
  id: string,
  file: DomainUpdateWorkspaceFileReq,
  params: RequestParams = {},
) =>
  request<
    WebResp & {
      data?: DomainWorkspaceFile;
    }
  >({
    path: `/api/v1/workspace/files/${id}`,
    method: "PUT",
    body: file,
    type: ContentType.Json,
    format: "json",
    ...params,
  });

/**
 * @description 删除指定的工作区文件
 *
 * @tags WorkspaceFile
 * @name DeleteDeleteWorkspaceFile
 * @summary 删除工作区文件
 * @request DELETE:/api/v1/workspace/files/{id}
 * @response `200` `WebResp` OK
 */

export const deleteDeleteWorkspaceFile = (
  id: string,
  params: RequestParams = {},
) =>
  request<WebResp>({
    path: `/api/v1/workspace/files/${id}`,
    method: "DELETE",
    type: ContentType.Json,
    format: "json",
    ...params,
  });
