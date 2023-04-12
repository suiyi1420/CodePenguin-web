import request from '@/utils/request';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

//根据课程分类查询课程
export async function getSubjectByTypeId(subjectTypeId: number) {
  return request('/system/subject/list', {
    method: 'POST',

    data: {
      id: subjectTypeId,
    },
  });
}
//根据课程id查询课程详情列表
export async function getSubjectInfoListById(subjectId: number, keyWord?: string) {
  return request(`/system/subject/info_list`, {
    method: 'POST',
    data: {
      id: subjectId,
      keyWord: keyWord ? keyWord : '',
    },
  });
}
//根据课程id查询课程详情
export async function getSubjectInfoById(subjectInfoId: number) {
  return request('/system/subject/info/' + subjectInfoId, {
    method: 'POST',
  });
}
//根据课程id查询课程详情
export async function getSubjectTypeList() {
  return request(`/system/subject/type_list`, {
    method: 'GET',
  });
}

export async function uploadSubjectFile(data: any, options = {}) {
  return request('/system/user/profile/subject_upload', {
    method: 'post',
    data: data,
    ...options,
  });
}

export async function addSubject(data) {
  return request('/system/subject/add', {
    method: 'post',
    data: data,
  });
}
export async function editSubject(data) {
  return request('/system/subject/edit', {
    method: 'post',
    data: data,
  });
}
export async function deleteSubject(id) {
  return request('/system/subject/delete/' + id, {
    method: 'post',
  });
}

export async function addSubjectInfo(data) {
  return request('/system/subject/subject_info/add', {
    method: 'post',
    data: data,
  });
}

export async function editSubjectInfo(data) {
  return request('/system/subject/subject_info/edit', {
    method: 'post',
    data: data,
  });
}

//根据课程id查询课程详情
export async function getSubsectionList(subject_info_id: number, keyWord?: string) {
  return request(`/system/subject/subsection/list`, {
    method: 'POST',
    data: {
      id: subject_info_id,
      keyWord: keyWord ? keyWord : '',
    },
  });
}

export async function addSubjectSubsection(data) {
  return request('/system/subject/subsection/add', {
    method: 'post',
    data: data,
  });
}

export async function editSubjectSubsection(data) {
  return request('/system/subject/subsection/edit', {
    method: 'post',
    data: data,
  });
}

export async function deleteSubjectSubsection(id) {
  return request('/system/subject/subsection/delete/' + id, {
    method: 'post',
  });
}

export async function deleteSubjectInfo(id) {
  return request('/system/subject/subject_info/delete/' + id, {
    method: 'post',
  });
}
