import React, { useState, useEffect, useMemo } from 'react';
import { Input, Form, Select, Modal, message, DatePicker } from 'antd';
import { getUserByRoleAndDept, addClass, editClass } from './service';
import { getSubjectTypeList, getSubjectByTypeId } from '../subject/service';
import moment from 'moment';

const AddClassPage: React.FC = (props: any) => {
  const { callBack, isModalOpen, handleCancel, editRecord, formType } = props;
  const [addForm] = Form.useForm();
  const [teacherKeyWord, setTeacherKeyWord] = useState('');
  const [allTeacher, setAllTeacher] = useState<any[]>([]);
  const [subjectTypeList, setSubjectTypeList] = useState([]);
  const [subjectInfoList, setSubjectInfoList] = useState<any[]>([]);
  const getAllTeacherList = async () => {
    const param = { keyWord: teacherKeyWord, role_id: 4 };
    const res = await getUserByRoleAndDept(param);
    console.log('res', res);
    setAllTeacher((data) => res.data);
  };
  useEffect(() => {
    getAllTeacherList();
  }, [teacherKeyWord]);
  useEffect(() => {
    getTypeList();
  }, []);
  useMemo(() => {
    if (formType == 1) {
      editRecord['class_time'] = moment(editRecord['class_time']);
      addForm.setFieldsValue(editRecord);
    }
    console.log('editRecord', editRecord);
  }, [formType, editRecord]);

  async function getTypeList() {
    const res = await getSubjectTypeList();
    console.log('res', res);
    setSubjectTypeList((data) => res.data);
  }

  async function getSubjectList(subjectId: any) {
    const res = await getSubjectByTypeId(subjectId);
    console.log('res', res);
    setSubjectInfoList((data) => [...res.data]);
  }

  const onOk = () => {
    addForm
      .validateFields()
      .then((values) => {
        values['class_time'] = moment(values['class_time']).format('YYYY-MM-DD HH:mm:ss');
        console.log(values);
        if (formType == 0) {
          addClass(values)
            .then((res) => {
              close();
              callBack();
              handleCancel();
            })
            .catch((e) => message.error(e.message));
        } else {
          values['id'] = editRecord['id'];
          editClass(values)
            .then((res) => {
              close();
              callBack();
              handleCancel();
            })
            .catch((e) => message.error(e.message));
        }
      })
      .catch((e) => console.log(e.message));
  };

  const onCancel = () => {
    handleCancel();
  };
  console.log('subjectInfoList', subjectInfoList);
  return (
    <>
      <Modal
        title={formType === 0 ? '添加班级' : '编辑班级'}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form layout="inline" form={addForm}>
          <Form.Item
            label="班级名称"
            name="class_name"
            rules={[{ required: true, message: '请输入班级名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入班级名称" allowClear style={{ width: 220 }} />
          </Form.Item>
          <Form.Item
            label="课程分类"
            style={{ marginBottom: 24, display: formType === 1 ? 'none' : '' }}
          >
            <Select style={{ width: 220 }} onChange={(value) => getSubjectList(value)}>
              {subjectTypeList &&
                subjectTypeList.map((item: any) => {
                  return (
                    <Select.Option value={item.subject_type_id}>
                      {item.subject_type_name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="课程"
            name="subject_id"
            rules={[{ required: formType == 0, message: '请选择课程!' }]}
            style={{ marginBottom: 24, display: formType === 1 ? 'none' : '' }}
          >
            <Select style={{ width: 220 }}>
              {subjectInfoList.map((item: any) => {
                return (
                  <Select.Option key={item.subject_id} value={item.subject_id}>
                    {item.subject_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="负责教师"
            name="teacher_id"
            rules={[{ required: true, message: '请选择负责教师!' }]}
            style={{ marginBottom: 24 }}
          >
            <Select
              showSearch
              style={{ width: 220 }}
              onSearch={(value) => setTeacherKeyWord(value)}
            >
              {allTeacher &&
                allTeacher.map((item: any) => {
                  return <Select.Option value={item.user_id}>{item.nick_name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="上课时间"
            name="class_time"
            rules={[{ required: true, message: '请选择上课时间!' }]}
            style={{ marginBottom: 24 }}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddClassPage;
