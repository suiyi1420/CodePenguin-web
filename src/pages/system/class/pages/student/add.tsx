import React, { useState, useEffect } from 'react';
import { Input, Form, Select, Modal, message } from 'antd';
import { getAllStudent, addClassStudent } from '../../service';

const { Search } = Input;
const AddStudent: React.FC = (props: any) => {
  const [addForm] = Form.useForm();
  const { classId, callBack, isModalOpen, handleCancel } = props;
  const [allStudent, setAllStudent] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState('');
  const [selectStudent, setSelectStudent] = useState<number>(0);

  useEffect(() => {
    getAllStudentList(keyWord);
  }, [keyWord]);
  async function getAllStudentList(name: any) {
    const param = { keyWord: name, id: 3 };
    const res = await getAllStudent(param);
    console.log('res', res);
    setAllStudent(res.rows);
  }

  const onOk = () => {
    const param = { class_id: classId, user_id: selectStudent };
    addClassStudent(param)
      .then((res) => {
        close();
        addForm.resetFields();
        callBack();
        handleCancel();
      })
      .catch((e) => message.error(e.message));
  };

  const onCancel = () => {
    handleCancel();
    addForm.resetFields();
  };
  return (
    <>
      <Modal title="添加学生" open={isModalOpen} onOk={onOk} onCancel={onCancel}>
        <Form layout="inline" form={addForm}>
          <Form.Item>
            <p>
              <Search
                placeholder="请输入学生名称"
                allowClear
                onSearch={(value: string) => setKeyWord(value)}
                style={{ width: 300 }}
              />
            </p>
          </Form.Item>
          <Form.Item label="选取学生">
            <Select style={{ width: 220 }} onChange={(value) => setSelectStudent(value)}>
              {allStudent &&
                allStudent.map((item: any) => {
                  return <Select.Option value={item.user_id}>{item.nick_name}</Select.Option>;
                })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddStudent;
