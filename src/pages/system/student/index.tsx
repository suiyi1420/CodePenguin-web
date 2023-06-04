import React, { useState, useEffect, useMemo } from 'react';

import styles from './index.less';
import { Radio, Table, Button } from 'antd';
import type { Subject } from './data.d';
import { getSubjectByTypeId, getSubjectTypeList, getSubjectInfoListById } from './service';

import { subjectInfoType, videoPageType } from '@/utils/valueEnum';
import { history, useModel } from 'umi';
import VideoModal from '../video/VideoPdf';
import defaultSettings from '../../../../config/defaultSettings';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

const Student: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const access_token = localStorage.getItem('access_token');
  const [stratchWeb, setStratchWeb] = useState(initialState?.userConfig['stratch-web']);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [selectSubjectType, setSelectSubjectType] = useState(0);
  const [subjectTypeList, setSubjectTypeList] = useState([]);
  const [selectSubjectId, setSelectSubjectId] = useState(0);
  const [subjectInfoList, setSubjectInfoList] = useState([]);
  const [video_url, setVideo_url] = useState('');
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [file_type, setFileType] = useState(videoPageType.video);
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
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: '课时内容',
      dataIndex: 'context',
      key: 'context',
      width: '35%',
    },
    {
      title: '知识点',
      dataIndex: 'knowledge',
      key: 'knowledge',
      width: '35%',
    },
    {
      title: '操作',
      dataIndex: 'subject_info_id',
      key: 'subject_info_id',
      width: '10%',
      render: (text, record, index) => {
        return (
          <>
            {/* {record && record.pdf_url && record.pdf_url !== '' && (
              <Button
                type="primary"
                onClick={() => {
                  // setFileType(videoPageType.pdf);
                  // setVideo_url(record.url);
                  // setIsModalOpen2(true);
                  let uri = defaultSettings.base + '/video_pdf';
                  uri = uri.replaceAll('//', '/');
                  window.open(
                    window.location.origin +
                      uri +
                      '?subjectInfoId=' +
                      record.subject_info_id +
                      '&type=' +
                      videoPageType.pdf,
                  );
                }}
              >
                课程课件
              </Button>
            )} */}
            {record && record.type == subjectInfoType['课程视频'] && (
              <Button
                type="primary"
                onClick={() => {
                  // setFileType(videoPageType.video);
                  // setVideo_url(record.url);
                  // setIsModalOpen2(true);
                  let uri = defaultSettings.base + '/video_pdf';
                  uri = uri.replaceAll('//', '/');
                  window.open(
                    window.location.origin +
                      uri +
                      '?subjectInfoId=' +
                      record.subject_info_id +
                      '&type=' +
                      videoPageType.video,
                  );
                }}
              >
                挑战课程
              </Button>
            )}

            {record && record.type == subjectInfoType['视频小节'] && (
              <Button
                type="primary"
                onClick={() => {
                  let uri = defaultSettings.base + '/video';
                  uri = uri.replaceAll('//', '/');
                  window.open(
                    window.location.origin + uri + '?subjectInfoId=' + record.subject_info_id,
                  );
                }}
              >
                挑战课程
              </Button>
            )}
            {record && record.type == subjectInfoType['编程小节'] && (
              <Button
                type="primary"
                onClick={() => {
                  window.open(stratchWeb + '?subject_info_id=' + text + '&access=' + access_token);
                }}
              >
                挑战课程
              </Button>
            )}
            {record && record.type == subjectInfoType['课程课件'] && (
              <Button
                type="primary"
                onClick={() => {
                  setFileType(videoPageType.pdf);
                  setVideo_url(record.url);
                  setIsModalOpen2(true);
                }}
              >
                课程课件
              </Button>
            )}
          </>
        );
      },
    },
  ];
  // useEffect(() => {
  //   fetch(defaultSettings.base + 'config.json')
  //     .then((resp) => resp.json())
  //     .then((res) => {
  //       setStratchWeb(res['stratch-web']);
  //     });
  // }, []);
  const onChange = (e) => {
    console.log('选中分类：', e.target.value);
    setSelectSubjectType(e.target.value);
  };
  useMemo(() => {
    getSubjectList();
  }, [selectSubjectType]);
  useMemo(() => {
    getTypeList();
  }, []);
  useMemo(() => {
    getSubjectInfoList();
  }, [selectSubjectId]);

  //根据人员id获取课程分类
  async function getTypeList() {
    console.log('initialState.currentUser.userId', initialState.currentUser.userId);
    const res = await getSubjectTypeList(initialState.currentUser.userId);
    console.log('res', res);
    if (res.data && res.data.length > 0) {
      setSubjectTypeList(res.data);
      setSelectSubjectType(res.data[0].subject_type_id);
    }
  }

  //根据分类获取课程
  async function getSubjectList() {
    const res = await getSubjectByTypeId(initialState.currentUser.userId, selectSubjectType);
    console.log('res', res);
    setSubjectList(res.data);
    if (res.data && res.data.length) {
      setSelectSubjectId(res.data[0].subject_id);
    }
  }

  //根据课程id获取课程内容
  async function getSubjectInfoList() {
    const res = await getSubjectInfoListById(selectSubjectId, initialState.currentUser.userId);
    console.log('res', res);
    setSubjectInfoList(res.data);
  }

  const selectSubject = (subject_id) => {
    setSelectSubjectId(subject_id);
  };

  return (
    <div className={styles['page']} style={{ width: '100%', float: 'right' }}>
      <p>
        课程分类：
        <Radio.Group onChange={onChange} value={selectSubjectType}>
          {subjectTypeList &&
            subjectTypeList.map((item: any) => {
              return (
                <Radio.Button value={item.subject_type_id}>{item.subject_type_name}</Radio.Button>
              );
            })}
        </Radio.Group>
      </p>
      <div className={styles['context']}>
        <div className={styles['list']}>
          {subjectList &&
            subjectList.map((item: Subject) => {
              return (
                <div
                  className={`
                      ${styles['list_box']} ${
                    selectSubjectId == item.subject_id ? styles['list_box_active'] : ''
                  }
                    `}
                  key={item.subject_id}
                  onClick={() => {
                    selectSubject(item.subject_id);
                  }}
                  style={{
                    background: 'url(' + item.image + ') no-repeat center center',
                    backgroundSize: '100% 100%',
                  }}
                >
                  {/* <div className={styles['list_box_context_box']}>
                    <div className={styles['list_box_title']}>{item.subject_name}</div>
                    <div className={styles['list_box_context']}>{item.subject_context}</div>
                    <div className={styles['list_box_time']}>共{item.class_time}课时</div>
                  </div> */}
                </div>
              );
            })}
        </div>
        <div className={styles['subject_list']}>
          <Table columns={columns} dataSource={subjectInfoList} pagination={false} />
        </div>
      </div>
      {isModalOpen2 && (
        <VideoModal
          type={file_type}
          video_url={video_url}
          isModalOpen={isModalOpen2}
          setIsModalOpen={() => setIsModalOpen2(false)}
        />
      )}
    </div>
  );
};

export default Student;
