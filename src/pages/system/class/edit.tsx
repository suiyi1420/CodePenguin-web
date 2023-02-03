import React, { useState, useEffect } from 'react';
import { Input, Form, Select, Modal, message } from 'antd';
import { getAllStudent, editClass } from './service';

const { Search } = Input;
const EditClassPage: React.FC = (props: any) => {
  const { deleteClassId, callBack, isModalOpen, handleCancel } = props;

  const [teacherKeyWord, setTeacherKeyWord] = useState('');
  const [allTeacher, setAllTeacher] = useState<any[]>([]);
  const [selectTeacher, setSelectTeacher] = useState<number>(0);
  const getAllTeacherList = async () => {
    const param = { keyWord: teacherKeyWord, id: 2 };
    const res = await getAllStudent(param);
    console.log('res', res);
    setAllTeacher(res.rows);
  };
  useEffect(() => {
    getAllTeacherList();
  }, [teacherKeyWord]);

  const onOk = () => {
    const params = { id: deleteClassId, teacher_id: selectTeacher };
    editClass(params)
      .then((res) => {
        close();
        callBack();
        handleCancel();
      })
      .catch((e) => message.error(e.message));
  };

  const onCancel = () => {
    handleCancel();
  };
  return (
    <>
      <Modal title="添加学生" open={isModalOpen} onOk={onOk} onCancel={onCancel}>
        <Form layout="inline">
          <Form.Item>
            <p>
              <Search
                placeholder="请输入教师名称"
                allowClear
                onSearch={(value: string) => setTeacherKeyWord(value)}
                style={{ width: 300 }}
              />
            </p>
          </Form.Item>
          <Form.Item label="选取教师">
            <Select style={{ width: 220 }} onChange={(value) => setSelectTeacher(value)}>
              {allTeacher &&
                allTeacher.map((item: any) => {
                  return <Select.Option value={item.user_id}>{item.nick_name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditClassPage;
