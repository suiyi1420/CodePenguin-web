import React, { useState, useEffect } from 'react';

import styles from './index.less';
import { Radio } from 'antd';
import type { Subject } from './data.d';
import { getSubjectByTypeId, getSubjectTypeList } from './service';

import WrapContent from '@/components/WrapContent';
import { history } from 'umi';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

const SubjectList: React.FC = () => {
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [subjectType, setSubjectType] = useState(0);
  const [subjectTypeList, setSubjectTypeList] = useState([]);

  const onChange = (e) => {
    setSubjectType(e.target.value);
  };
  useEffect(() => {
    getList();
  }, [subjectType]);
  useEffect(() => {
    getTypeList();
  }, []);

  async function getList() {
    const res = await getSubjectByTypeId(subjectType);
    console.log('res', res);
    setSubjectList(res.data);
  }
  async function getTypeList() {
    const res = await getSubjectTypeList();
    console.log('res', res);
    setSubjectTypeList(res.data);
  }

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <p>
          <Radio.Group onChange={onChange} defaultValue="0">
            <Radio.Button value="0">全部</Radio.Button>
            {subjectTypeList.map((item: any) => {
              return (
                <Radio.Button value={item.subject_type_id}>{item.subject_type_name}</Radio.Button>
              );
            })}
          </Radio.Group>
        </p>
        {subjectList.map((item: Subject) => {
          return (
            <div
              className={styles['list_box']}
              key={item.subject_id}
              onClick={() => {
                history.push({
                  pathname: '/system/subjectInfo',
                  state: {
                    subjectId: item.subject_id,
                  },
                });
              }}
            >
              <div className={styles['list_box_img']}>
                <img src={item.image} />
              </div>
              <div className={styles['list_box_context_box']}>
                <div className={styles['list_box_title']}>{item.subject_name}</div>
                <div className={styles['list_box_context']}>{item.subject_context}</div>
                <div className={styles['list_box_time']}>共{item.class_time}课时</div>
              </div>
            </div>
          );
        })}
      </div>
    </WrapContent>
  );
};

export default SubjectList;
