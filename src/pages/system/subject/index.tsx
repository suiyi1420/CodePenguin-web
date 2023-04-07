import React, { useState, useEffect } from 'react';

import styles from './index.less';
import { Radio, Button, Modal } from 'antd';
import type { Subject } from './data.d';
import { getSubjectByTypeId, getSubjectTypeList, deleteSubject } from './service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import WrapContent from '@/components/WrapContent';
import { history, useAccess } from 'umi';
import AddSubjectPage from './pages/add';
import { commonFormType } from '@/utils/valueEnum';

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
  const [isModalOpen, setisModalOpen] = useState(false);
  const [formType, setFormType] = useState(commonFormType.添加);
  const [editRecord, setEditRecord] = useState({});

  const access = useAccess();
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
            {subjectTypeList &&
              subjectTypeList.map((item: any) => {
                return (
                  <Radio.Button value={item.subject_type_id}>{item.subject_type_name}</Radio.Button>
                );
              })}
          </Radio.Group>
          <Button
            type="primary"
            hidden={!access.hasPerms('system:subject:add')}
            onClick={() => {
              setFormType(commonFormType.添加);
              setisModalOpen(true);
            }}
          >
            添加课程
          </Button>
        </p>
        {subjectList.map((item: Subject) => {
          return (
            <div
              className={styles['list_box']}
              key={item.subject_id}
              onClick={(e) => {
                history.push({
                  pathname: '/system/subject/subjectInfo',
                  state: {
                    subjectId: item.subject_id,
                  },
                });
              }}
            >
              <>
                <div className={styles['list_box_img']}>
                  <img src={item.image} />
                </div>
                <div className={styles['list_box_context_box']}>
                  <div className={styles['list_box_title']}>{item.subject_name}</div>
                  <div className={styles['list_box_context']}>{item.subject_context}</div>
                  <div className={styles['list_box_time']}>共{item.class_time}课时</div>
                </div>
              </>
              <div className={styles['list_box_button']}>
                <Button
                  type="dashed"
                  hidden={!access.hasPerms('system:subject:edit')}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormType(commonFormType.编辑);
                    setEditRecord(item);
                    setisModalOpen(true);
                  }}
                >
                  编辑课程
                </Button>
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  hidden={!access.hasPerms('system:subject:delete')}
                  onClick={(e) => {
                    e.stopPropagation();
                    Modal.confirm({
                      icon: <ExclamationCircleOutlined />,
                      title: '删除课程',
                      content: '是否确定删除该课程？',
                      onOk(close) {
                        deleteSubject(item.subject_id)
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
                  删除课程
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <AddSubjectPage
          formType={formType}
          editRecord={editRecord}
          isModalOpen={isModalOpen}
          subjectTypeList={subjectTypeList}
          handleCancel={() => setisModalOpen(false)}
          callBack={getList}
        />
      )}
    </WrapContent>
  );
};

export default SubjectList;
