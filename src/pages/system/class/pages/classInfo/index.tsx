import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table, Button, Input, Form, DatePicker, Select, Modal, message } from 'antd';
import {
  getClassSubjectList,
  editClassSubject,
  addClassSubject,
  deleteClassSubject,
} from '../../service';
import { getSubjectInfoListById } from '../../../subject/service';
import WrapContent from '@/components/WrapContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAccess } from 'umi';
const { RangePicker } = DatePicker;

const ClassInfo: React.FC = ({ location }) => {
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const classId = location.state.classId;
  const subjectId = location.state.subjectId;
  console.log('subjectId', subjectId);
  const [classList, setClassList] = useState<any>([]);
  const [classTime, setClassTime] = useState<any[] | null>(null);
  const [subjectInfoList, setSubjectInfoList] = useState<any[]>([]);
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
    // {
    //   title: '课时名称',
    //   dataIndex: 'rel_name',
    //   key: 'rel_name',
    // },
    {
      title: '课时名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上课时间',
      dataIndex: 'open_time',
      key: 'open_time',
      render: (text) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },

    {
      title: '操作',
      dataIndex: 'subject_info_id',
      key: 'subject_info_id',
      render: (text, record, index) => {
        return (
          <>
            <Button
              type="primary"
              ghost
              hidden={!access.hasPerms('system:class_subject:edit')}
              onClick={() => {
                //console.log('record', { ...record });
                const initValue = { ...record, open_time: moment(record.open_time) };
                editForm.setFieldsValue(initValue);

                console.log('initValue', initValue);
                Modal.confirm({
                  icon: <></>,
                  title: '编辑课程小节',
                  content: (
                    <>
                      <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        form={editForm}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="课程小节名称"
                          name="rel_name"
                          rules={[{ required: true, message: '请输入课程小节名称!' }]}
                        >
                          <Input placeholder="请输入课程小节名称" />
                        </Form.Item>
                        <Form.Item
                          label="选择上课时间"
                          name="open_time"
                          rules={[{ required: true, message: '上课时间不能为空!' }]}
                        >
                          <DatePicker showTime placeholder="请选择上课时间" />
                        </Form.Item>

                        <Form.Item
                          label="选择课程小节"
                          name="subject_info_id"
                          rules={[{ required: true, message: '选择课程小节!' }]}
                        >
                          <Select style={{ width: 220 }}>
                            {subjectInfoList &&
                              subjectInfoList.map((item: any) => {
                                return (
                                  <Select.Option value={item.subject_info_id}>
                                    {item.name}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                      </Form>
                    </>
                  ),
                  onOk(close) {
                    editForm.validateFields().then((values) => {
                      const param = {
                        id: record.id,
                        class_id: classId,
                        open_time: values.open_time.format('YYYY-MM-DD HH:mm:ss'),
                        rel_name: values.rel_name,
                        subject_info_id: values.subject_info_id,
                        status: 1,
                      };
                      console.log('Success:', param);
                      editClassSubject(param)
                        .then((res) => {
                          close();
                          getList();
                        })
                        .catch((e) => message.error(e.message));
                    });
                  },
                  onCancel() {},
                });
              }}
            >
              编辑
            </Button>
            &nbsp;
            <Button
              type="primary"
              ghost
              danger
              hidden={!access.hasPerms('system:class_subject:delete')}
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  title: '删除课程小节',
                  content: '是否确定删除该小节？',
                  onOk(close) {
                    editForm.validateFields().then((values) => {
                      const param = {
                        id: record.id,
                        class_id: classId,
                      };
                      console.log('Success:', param);
                      deleteClassSubject(param)
                        .then((res) => {
                          close();
                          getList();
                        })
                        .catch((e) => message.error(e.message));
                    });
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
  }, [classTime]);
  useEffect(() => {
    getSubjectInfoList();
  }, []);
  async function getSubjectInfoList() {
    const res = await getSubjectInfoListById(subjectId);
    console.log('res', res);
    if (res.data && res.data.length > 0) {
      setSubjectInfoList(res.data);
    }
  }
  async function getList() {
    const startTime = classTime ? classTime[0] : '';
    const endTime = classTime ? classTime[1] : '';
    const param = {
      id: classId,
      startTime: startTime,
      endTime: endTime,
    };
    const res = await getClassSubjectList(param);
    console.log('res', res);
    if (res.data && res.data.length > 0) {
      setClassList(res.data);
    }
  }

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <p>
          <Form layout="inline">
            <Form.Item label="上课时间">
              <RangePicker
                showTime
                onChange={(dates, dateStrings) => {
                  console.log(dates, dateStrings);
                  setClassTime(dateStrings);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                hidden={!access.hasPerms('system:class_subject:add')}
                onClick={() => {
                  Modal.confirm({
                    icon: <></>,
                    title: '添加课程小节',
                    content: (
                      <>
                        <Form
                          name="basic"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                          form={addForm}
                          autoComplete="off"
                        >
                          {/* <Form.Item
                            label="课程小节名称"
                            name="rel_name"
                            rules={[{ required: true, message: '请输入课程小节名称!' }]}
                          >
                            <Input placeholder="请输入课程小节名称" />
                          </Form.Item> */}
                          <Form.Item
                            label="选择上课时间"
                            name="open_time"
                            rules={[{ required: true, message: '上课时间不能为空!' }]}
                          >
                            <DatePicker showTime placeholder="请选择上课时间" />
                          </Form.Item>

                          <Form.Item
                            label="选择课程小节"
                            name="subject_info_id"
                            rules={[{ required: true, message: '选择课程小节!' }]}
                            initialValue={-1}
                          >
                            <Select style={{ width: 220 }}>
                              <Select.Option value={-1}>全部</Select.Option>
                              {subjectInfoList &&
                                subjectInfoList.map((item: any) => {
                                  return (
                                    <Select.Option value={item.subject_info_id}>
                                      {item.name}
                                    </Select.Option>
                                  );
                                })}
                            </Select>
                          </Form.Item>
                        </Form>
                      </>
                    ),
                    onOk(close) {
                      addForm.validateFields().then((values) => {
                        const postRequest = (values, subject_info_id) => {
                          const param = {
                            class_id: classId,
                            open_time: values.open_time.format('YYYY-MM-DD HH:mm:ss'),
                            rel_name: values.rel_name,
                            subject_info_id: subject_info_id,
                            status: 1,
                            subject_id: subjectId,
                          };
                          console.log('Success:', param);
                          addClassSubject(param)
                            .then((res) => {
                              close();
                              addForm.resetFields();
                              getList();
                            })
                            .catch((e) => message.error(e.message));
                        };
                        if (values.subject_info_id === -1) {
                          subjectInfoList &&
                            subjectInfoList.map((item) => {
                              postRequest(values, item.subject_info_id);
                            });
                        } else {
                          postRequest(values, values.subject_info_id);
                        }
                      });
                    },
                    onCancel() {
                      addForm.resetFields();
                    },
                  });
                }}
              >
                添加课时
              </Button>
            </Form.Item>
          </Form>
        </p>
        <Table columns={columns} dataSource={classList} pagination={false} />
      </div>
    </WrapContent>
  );
};

export default ClassInfo;
