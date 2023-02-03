export type QueryParamsType = {
  id?: number | null;
  keyWord?: string | null;
  subjectId?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  teacher?: string | null;
  paramId?: number | null;
};

export type ClassSubjectType = {
  id: number | null;
  class_id: number | null;
  open_time: string | null;
  rel_name: string | null;
  subject_info_id: number | null;
  status: number | null;
};
