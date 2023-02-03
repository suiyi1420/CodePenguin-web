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
//根据课程id查询课程详情
export async function getSubjectInfoById(subjectId: number, keyWord?: string) {
  return request(`/system/subject/info_list`, {
    method: 'POST',
    data: {
      id: subjectId,
      keyWord: keyWord ? keyWord : '',
    },
  });
}
//根据课程id查询课程详情
export async function getSubjectTypeList() {
  return request(`/system/subject/type_list`, {
    method: 'GET',
  });
}
