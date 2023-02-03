import request from '@/utils/request';
import type { QueryParamsType, ClassSubjectType } from '../../../utils/queryParams';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

// 查询角色信息列表
export async function getClassList(params?: QueryParamsType) {
  return request(`/system/class/list`, {
    data: params,
    method: 'POST',
  });
}

export async function getClassSubjectList(params?: QueryParamsType) {
  return request(`/system/class/list/subject`, {
    data: params,
    method: 'POST',
  });
}

export async function editClassSubject(params?: ClassSubjectType) {
  return request(`/system/class/subject/edit`, {
    data: params,
    method: 'POST',
  });
}

export async function editClass(params?: any) {
  return request(`/system/class/edit`, {
    data: params,
    method: 'POST',
  });
}
export async function addClassSubject(params?: ClassSubjectType) {
  return request(`/system/class/subject/add`, {
    data: params,
    method: 'POST',
  });
}

export async function deleteClassSubject(id?: number) {
  return request(`/system/class/delete/${id}`, {
    method: 'POST',
  });
}

export async function deleteClassStudent(id?: number, params: any) {
  return request(`/system/class/student/delete/${id}`, {
    method: 'POST',
    data: params,
  });
}
export async function getClassStudent(id?: number) {
  return request(`/system/class/list/student/${id}`, {
    method: 'POST',
  });
}

export async function getAllStudent(params?: QueryParamsType) {
  return request(`/system/class/list/student/all`, {
    method: 'POST',
    data: params,
  });
}

export async function addClassStudent(params?: QueryParamsType) {
  return request(`/system/class/student/add`, {
    method: 'POST',
    data: params,
  });
}

export async function addClass(params?: any) {
  return request(`/system/class/add`, {
    method: 'POST',
    data: params,
  });
}
