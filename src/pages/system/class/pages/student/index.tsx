import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Form, Select, Modal, message } from 'antd';
import { getClassStudent, deleteClassStudent } from '../../service';
import WrapContent from '@/components/WrapContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddStudent from './add';
import { useAccess } from 'umi';

const Student: React.FC = ({ location }) => {
  const classId = location.state.classId;
  const [studentList, setStudentList] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const access = useAccess();
  const columns = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num',
      render: (text, record, index) => {
        return parseInt(index + 1);
      },
    },
    {
      title: '学生姓名',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: '联系方式',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: '线上课程进度',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: '操作',
      render: (text, record, index) => {
        return (
          <>
            <Button
              type="primary"
              ghost
              danger
              hidden={!access.hasPerms('system:student:delete')}
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  title: '删除学生',
                  content: '是否确定删除学生：' + record.nick_name + '？',
                  onOk(close) {
                    deleteClassStudent(record.id, { class_id: classId, user_id: record.user_id })
                      .then((res) => {
                        close();
                        getList();
                      })
                      .catch((e) => message.error(e.message));
                  },
                  onCancel() {},
                });
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const res = await getClassStudent(classId);
    console.log('res', res);
    setStudentList(res.data);
  }

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <p>
          <Button
            type="primary"
            hidden={!access.hasPerms('system:student:add')}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            添加学生
          </Button>
        </p>
        <Table columns={columns} dataSource={studentList} />
        {isOpen ? (
          <AddStudent
            classId={classId}
            callBack={getList}
            isModalOpen={isOpen}
            handleCancel={() => setIsOpen(false)}
          />
        ) : null}
      </div>
    </WrapContent>
  );
};

export default Student;
