import React, { useState, useEffect } from 'react';
import { Input, Form, Select, Modal, message, DatePicker } from 'antd';
import { getAllStudent, addClass } from './service';
import { getSubjectTypeList, getSubjectByTypeId } from '../subject/service';
import moment from 'moment';

const AddClassPage: React.FC = (props: any) => {
  const { callBack, isModalOpen, handleCancel } = props;
  const [addForm] = Form.useForm();
  const [teacherKeyWord, setTeacherKeyWord] = useState('');
  const [allTeacher, setAllTeacher] = useState<any[]>([]);
  const [subjectTypeList, setSubjectTypeList] = useState([]);
  const [subjectInfoList, setSubjectInfoList] = useState<any[]>([]);
  const getAllTeacherList = async () => {
    const param = { keyWord: teacherKeyWord, id: 2 };
    const res = await getAllStudent(param);
    console.log('res', res);
    setAllTeacher((data) => res.rows);
  };
  useEffect(() => {
    getAllTeacherList();
  }, [teacherKeyWord]);
  useEffect(() => {
    getTypeList();
  }, []);

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
        addClass(values)
          .then((res) => {
            close();
            callBack();
            handleCancel();
          })
          .catch((e) => message.error(e.message));
      })
      .catch((e) => console.log(e.message));
  };

  const onCancel = () => {
    handleCancel();
  };
  console.log('subjectInfoList', subjectInfoList);
  return (
    <>
      <Modal title="添加班级" open={isModalOpen} onOk={onOk} onCancel={onCancel}>
        <Form layout="inline" form={addForm}>
          <Form.Item
            label="班级名称"
            name="class_name"
            rules={[{ required: true, message: '请输入班级名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入班级名称" allowClear style={{ width: 220 }} />
          </Form.Item>
          <Form.Item label="课程分类" style={{ marginBottom: 24 }}>
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
            label="课程小节"
            name="subject_id"
            rules={[{ required: true, message: '请选择课程小节!' }]}
            style={{ marginBottom: 24 }}
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
