import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table, Button, Input, Form, DatePicker, Select, Modal, message } from 'antd';
import { getClassList, deleteClassSubject } from './service';
import { getSubjectByTypeId } from '../subject/service';
import WrapContent from '@/components/WrapContent';
import { history } from 'umi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditClassPage from './edit';
import AddClassPage from './add';
const { RangePicker } = DatePicker;
const { Search } = Input;
const ClassList: React.FC = () => {
  const [classList, setClassList] = useState<any>([]);
  const [keyWord, setKeyWord] = useState('');
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [classTime, setClassTime] = useState<any[] | null>(null);
  const [teacher, setTeacher] = useState<string>('');
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [deleteClassId, setDEleteClassId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
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
      title: '班级名称',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: '班级负责人',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',
    },
    {
      title: '所属课程',
      dataIndex: 'subject_name',
      key: 'subject_name',
    },
    {
      title: '开课时间',
      dataIndex: 'class_time',
      key: 'class_time',
      render: (text: any) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '学生数',
      dataIndex: 'student_num',
      key: 'student_num',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => {
        return (
          <>
            <Button
              type="dashed"
              onClick={() => {
                history.push({
                  pathname: '/system/classSubject',
                  state: {
                    classId: record.id,
                    subjectId: record.subject_id,
                  },
                });
              }}
            >
              班级详情
            </Button>
            &nbsp;
            <Button
              type="dashed"
              onClick={() => {
                history.push({
                  pathname: '/system/classStudent',
                  state: {
                    classId: record.id,
                  },
                });
              }}
            >
              学员详情
            </Button>
            &nbsp;
            <Button
              type="primary"
              ghost
              onClick={() => {
                setDEleteClassId(record.id);
                setIsOpen(true);
              }}
            >
              编辑
            </Button>
            &nbsp;
            <Button
              type="primary"
              ghost
              danger
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  title: '删除班级',
                  content: '是否确定删除该班级？',
                  onOk(close) {
                    console.log('Success:', record.id);
                    deleteClassSubject(record.id)
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
              删除班级
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getList();
  }, [keyWord, subjectId, classTime, teacher]);
  useEffect(() => {
    getSubjectList();
  }, []);
  async function getSubjectList() {
    const res = await getSubjectByTypeId(0);
    console.log('res', res);
    if (res.data && res.data.length > 0) {
      setSubjectList(res.data);
    }
  }
  async function getList() {
    const startTime = classTime ? classTime[0] : '';
    const endTime = classTime ? classTime[1] : '';
    const param = {
      keyWord: keyWord,
      id: subjectId,
      startTime: startTime,
      endTime: endTime,
      teacher: teacher,
    };
    const res = await getClassList(param);
    console.log('res', res);
    setClassList(res.rows);
  }

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <p>
          <Form layout="inline">
            <Form.Item label="班级名称" name="keyWork">
              <Search
                placeholder="请输入班级名称"
                allowClear
                onSearch={(value: string) => setKeyWord(value)}
                style={{ width: 200 }}
              />
            </Form.Item>
            <Form.Item label="所属课程">
              <Select
                style={{ width: 220 }}
                defaultValue={0}
                onChange={(value) => setSubjectId(value)}
              >
                <Select.Option value={0}>全部</Select.Option>
                {subjectList &&
                  subjectList.map((item: any) => {
                    return (
                      <Select.Option value={item.subject_id}>{item.subject_name}</Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item label="上课时间">
              <RangePicker
                showTime
                onChange={(dates, dateStrings) => {
                  console.log(dates, dateStrings);
                  setClassTime(dateStrings);
                }}
              />
            </Form.Item>
            <Form.Item label="班级负责人">
              <Search
                placeholder="请输入班级负责人"
                allowClear
                onSearch={(value: string) => setTeacher(value)}
                style={{ width: 200 }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  setIsAddOpen(true);
                }}
              >
                新增班级
              </Button>
            </Form.Item>
          </Form>
        </p>
        <Table columns={columns} dataSource={classList} />
      </div>
      {isOpen ? (
        <EditClassPage
          deleteClassId={deleteClassId}
          callBack={getList}
          isModalOpen={isOpen}
          handleCancel={() => setIsOpen(false)}
        />
      ) : null}
      {isAddOpen ? (
        <AddClassPage
          callBack={getList}
          isModalOpen={isAddOpen}
          handleCancel={() => setIsAddOpen(false)}
        />
      ) : null}
    </WrapContent>
  );
};

export default ClassList;
