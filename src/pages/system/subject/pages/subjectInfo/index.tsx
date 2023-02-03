import React, { useState, useEffect } from 'react';

import { Table, Button, Input } from 'antd';
import styles from '../../index.less';

import type { Subject } from '../../data';
import { getSubjectInfoById } from '../../service';
import WrapContent from '@/components/WrapContent';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */
const { Search } = Input;

const SubjectInfot: React.FC = ({ location }) => {
  const subjectId = location.state.subjectId;
  console.log('subjectId', subjectId);
  const [subjectInfoList, setSubjectInfoList] = useState<Subject[]>([]);
  const [keyWord, setKeyWord] = useState('');
  const [stratchWeb, setStratchWeb] = useState('');
  const access_token = localStorage.getItem('access_token');
  useEffect(() => {
    fetch('/config.json')
      .then((resp) => resp.json())
      .then((res) => {
        setStratchWeb(res['stratch-web']);
      });
  }, []);
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
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课时内容',
      dataIndex: 'context',
      key: 'context',
    },
    {
      title: '知识点',
      dataIndex: 'knowledge',
      key: 'knowledge',
    },
    {
      title: '更新说明',
      dataIndex: 'update_text',
      key: 'update_text',
    },
    {
      title: '小节数量',
      dataIndex: 'knowledge_num',
      key: 'knowledge_num',
    },
    {
      title: '计划用时',
      dataIndex: 'planned_time',
      key: 'planned_time',
    },
    {
      title: '操作',
      dataIndex: 'subject_info_id',
      key: 'subject_info_id',
      render: (text, record, index) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              window.open(stratchWeb + '?subject_info_id=' + text + '&access=' + access_token);
            }}
          >
            挑战课程
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    getList();
  }, [subjectId, keyWord]);

  async function getList() {
    const res = await getSubjectInfoById(subjectId, keyWord);
    console.log('res', res);
    setSubjectInfoList(res.data);
  }
  const onSearch = (value: string) => setKeyWord(value);

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <p>
          <Search
            placeholder="请输入课程名称"
            allowClear
            enterButton="搜索"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </p>
        <Table columns={columns} dataSource={subjectInfoList} />
      </div>
    </WrapContent>
  );
};

export default SubjectInfot;
