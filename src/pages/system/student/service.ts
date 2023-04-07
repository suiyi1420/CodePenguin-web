import request from '@/utils/request';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

//根据课程分类查询课程
export async function getSubjectByTypeId(userId: number, subjectTypeId: number) {
  return request(
    '/system/subject/user_subject_list?userId=' + userId + '&subjectTypeId=' + subjectTypeId,
    {
      method: 'GET',
    },
  );
}
//根据课程id查询课程详情
export async function getSubjectInfoListById(subjectId: number, userId: number) {
  return request(
    `/system/subject/user_subject_info_list?subjectId=` + subjectId + `&userId=` + userId,
    {
      method: 'GET',
    },
  );
}
//根据课程id查询课程详情
export async function getSubjectTypeList(userId: number) {
  return request(`/system/subject/user_subject?userId=` + userId, {
    method: 'GET',
  });
}
