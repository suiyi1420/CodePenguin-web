import React, { useState, useEffect } from 'react';

import { Table, Button, Input, Modal, message } from 'antd';
import styles from '../../index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { Subject } from '../../data';
import { getSubsectionList, deleteSubjectSubsection } from '../../service';
import WrapContent from '@/components/WrapContent';
import { history, useAccess } from 'umi';
import SubjectInfoFormPage from './form';
import { commonFormType } from '@/utils/valueEnum';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */
const { Search } = Input;

const Subsection: React.FC = ({ location }) => {
  const { subjectInfoId, subjectInfoType } = location.state;
  const access = useAccess();
  console.log('subjectInfoId', subjectInfoId);
  const [subjectInfoList, setSubjectInfoList] = useState<Subject[]>([]);
  const [keyWord, setKeyWord] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const [type, setType] = useState(commonFormType.添加);
  const [subject_subsection, setSubject_subsection] = useState({});

  const columns = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num',
      width: '5%',
      render: (text, record, index) => {
        return parseInt(index + 1);
      },
    },
    {
      title: '小节名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: '视频',
      dataIndex: 'video_url',
      key: 'video_url',
      width: '30%',
      render: (text, record, index) => {
        return (
          <Button
            type="dashed"
            onClick={() => {
              Modal.confirm({
                icon: <></>,
                width: '864px',
                title: '查看视频',
                content: (
                  <video
                    src={text}
                    style={{ width: 800, height: 600, margin: '0 auto' }}
                    autoPlay={true}
                    controls={true}
                  />
                ),
              });
            }}
          >
            查看视频
          </Button>
        );
      },
    },
    {
      title: 'sb3文件地址',
      dataIndex: 'file_url',
      key: 'file_url',
      width: '30%',
    },

    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      render: (text, record, index) => {
        return (
          <>
            <Button
              type="dashed"
              onClick={() => {
                setSubject_subsection(record);
                setType(commonFormType.编辑);
                setisModalOpen(true);
              }}
              hidden={!access.hasPerms('system:subject_subsection:edit')}
            >
              编辑小节
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              type="dashed"
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  title: '删除小节',
                  content: "是否确定删除小节：'" + record.name + "'?",
                  onOk(close) {
                    deleteSubjectSubsection(record.id)
                      .then((res) => {
                        if (res.code == 200) {
                          message.success('课时小节删除成功');
                          getList();
                          close();
                        } else {
                          message.error('课时小节删除失败');
                        }
                      })
                      .catch((e) => console.log(e.message));
                  },
                  onCancel() {},
                });
              }}
              hidden={!access.hasPerms('system:subject_subsection:delete')}
            >
              删除小节
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getList();
  }, [subjectInfoId, keyWord]);

  async function getList() {
    const res = await getSubsectionList(subjectInfoId, keyWord);
    console.log('res', res);
    setSubjectInfoList(res.data);
  }
  const onSearch = (value: string) => setKeyWord(value);

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <p>
          <Search
            placeholder="请输入小节名称"
            allowClear
            enterButton="搜索"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              setType(commonFormType.添加);
              setisModalOpen(true);
            }}
            hidden={!access.hasPerms('system:subject_subsection:add')}
          >
            添加小节
          </Button>
        </p>
        <Table columns={columns} dataSource={subjectInfoList} pagination={false} />
      </div>
      {isModalOpen && (
        <SubjectInfoFormPage
          subjectInfoId={subjectInfoId}
          isModalOpen
          type={type}
          subjectInfo_type={subjectInfoType}
          subject_subsection={subject_subsection}
          handleCancel={() => setisModalOpen(false)}
          callBack={getList}
        />
      )}
    </WrapContent>
  );
};

export default Subsection;
