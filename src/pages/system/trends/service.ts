import request from '@/utils/request';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

interface ITrendsParams {
  subjectTypeId: number;
  subjectId: number;
  subjectInfoId: number;
  time: string;
  fileUrl: string;
  fileType: number;
  createUserId: number;
  userIds: number;
}

//获取朋友圈列表
export async function getTrendsList(userId: number, isTeacher: boolean,page: number, pageSize: number) {
  return request('/trends/list', {
    method: 'POST',
    data: {
      userId,
      isTeacher,
      page,
      pageSize
    },
  });
}


//获取朋友圈列表
export async function addTrendsList(params: ITrendsParams) {
  return request('/trends/add', {
    method: 'POST',
    data: params,
  });
}


export async function uploadFile(data: any, options = {}) {
  return request('/system/user/profile/common_upload', {
    method: 'post',
    data: data,
    ...options,
  });
}

export async function deleteTrends(id: number) {
  return request('/trends/delete/' + id, {
    method: 'POST',
  });
}