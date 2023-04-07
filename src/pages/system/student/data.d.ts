/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type Subject = {
  subject_id: number;
  subject_type_id: number;
  subject_name: string;
  subject_context: string;
  class_time: string;
  status: number;
  image: string;
};


export type RoleListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type RoleListData = {
  list: RoleType[];
  pagination: Partial<RoleListPagination>;
};

export type RoleListParams = {
  roleId?: string;
  roleName?: string;
  roleKey?: string;
  roleSort?: string;
  dataScope?: string;
  menuCheckStrictly?: string;
  deptCheckStrictly?: string;
  status?: string;
  delFlag?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
