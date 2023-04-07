import React, { useState, useEffect } from 'react';

import { Table, Button, Input } from 'antd';
import styles from '../../index.less';

import type { Subject } from '../../data';
import { getSubjectInfoListById } from '../../service';
import WrapContent from '@/components/WrapContent';
import { history, useAccess, useModel } from 'umi';
import SubjectInfoFormPage from './form';
import VideoModal from '@/pages/system/video/VideoPdf';
import { subjectInfoType, videoPageType } from '@/utils/valueEnum';
import defaultSettings from '../../../../../../config/defaultSettings';
import { commonFormType } from '@/utils/valueEnum';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */
const { Search } = Input;

const SubjectInfot: React.FC = ({ location }) => {
  const subjectId = location.state.subjectId;
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  console.log('subjectId', subjectId);
  const [subjectInfoList, setSubjectInfoList] = useState<Subject[]>([]);
  const [keyWord, setKeyWord] = useState('');
  const [stratchWeb, setStratchWeb] = useState(initialState?.userConfig['stratch-web']);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [type, setType] = useState(commonFormType.添加);
  const [subject_info, setSubject_info] = useState({});
  const access_token = localStorage.getItem('access_token');
  const [video_url, setVideo_url] = useState('');
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [file_type, setFileType] = useState(videoPageType.video);
  // useEffect(() => {
  //   fetch('/admin/config.json')
  //     .then((resp) => resp.json())
  //     .then((res) => {
  //       setStratchWeb(res['stratch-web']);
  //     });
  // }, []);
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
      width: '13%',
    },
    {
      title: '课时内容',
      dataIndex: 'context',
      key: 'context',
      width: '20%',
    },
    {
      title: '知识点',
      dataIndex: 'knowledge',
      key: 'knowledge',
      width: '20%',
      render: (text) => {
        return <Input.TextArea value={text} autoSize bordered={false} />;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (text) => {
        return text;
      },
    },
    {
      title: '操作',
      dataIndex: 'subject_info_id',
      key: 'subject_info_id',
      width: '32%',
      render: (text, record, index) => {
        return (
          <>
            <Button
              type="dashed"
              onClick={() => {
                setSubject_info(record);
                setType(commonFormType.编辑);
                setisModalOpen(true);
              }}
              hidden={!access.hasPerms('system:subject_info:edit')}
            >
              编辑课程
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {record && record.pdf_url && record.pdf_url !== '' && (
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
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {record &&
              (record.type == subjectInfoType['编程小节'] ||
                record.type == subjectInfoType['视频小节']) && (
                <Button
                  type="dashed"
                  onClick={() => {
                    history.push({
                      pathname: '/system/subject/subjectInfo/subsection',
                      state: {
                        subjectInfoId: record.subject_info_id,
                        subjectInfoType: record.type,
                      },
                    });
                  }}
                  hidden={!access.hasPerms('system:subject_subsection:list')}
                >
                  查看小节
                </Button>
              )}
            &nbsp;&nbsp;&nbsp;&nbsp;
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
                  console.log('defaultSettings.base', defaultSettings.base);
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
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getList();
  }, [subjectId, keyWord]);

  async function getList() {
    const res = await getSubjectInfoListById(subjectId, keyWord);
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              setType(commonFormType.添加);
              setisModalOpen(true);
            }}
            hidden={!access.hasPerms('system:subject_info:add')}
          >
            添加课时
          </Button>
        </p>
        <Table columns={columns} dataSource={subjectInfoList} pagination={false} />
      </div>
      {isModalOpen && (
        <SubjectInfoFormPage
          subject_id={subjectId}
          isModalOpen
          type={type}
          subject_info={subject_info}
          handleCancel={() => setisModalOpen(false)}
          callBack={getList}
        />
      )}
      {/* {isModalOpen2 && (
        <VideoModal
          type={file_type}
          video_url={video_url}
          isModalOpen={isModalOpen2}
          setIsModalOpen={() => setIsModalOpen2(false)}
        />
      )} */}
    </WrapContent>
  );
};

export default SubjectInfot;
