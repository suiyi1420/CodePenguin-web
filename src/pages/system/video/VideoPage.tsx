import React, { useState, useEffect } from 'react';

import { Select, Button, Input, Modal } from 'antd';
import styles from './index.less';
import { getSubsectionList } from '../subject/service';
import defaultSettings from '../../../../config/defaultSettings';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

const VideoPage: React.FC = (props: any) => {
  const searchURL = location.search; // 获取到URL中的参数串
  const params = new URLSearchParams(searchURL);
  const valueObj = Object.fromEntries(params); // 转换为普通对象

  const subjectInfoId = parseInt(valueObj.subjectInfoId);
  const [subsectionList, setSubsectionList] = useState([]);

  const [select, setSelect] = useState({});

  useEffect(() => {
    getList();
  }, [subjectInfoId]);

  async function getList() {
    const res = await getSubsectionList(subjectInfoId, '');
    console.log('res', res);
    setSubsectionList(res.data);
    if (res.data && res.data.length > 0) {
      let uri = defaultSettings.base + res.data[0].video_url;
      uri = uri.replaceAll('//', '/');
      console.log('subsectionList1', uri);
      setSelect(uri);
    }
  }

  return (
    <>
      <div className={styles['page']}>
        <div className={styles['memu']}>
          课程小节：
          <Select
            style={{ width: 220 }}
            onChange={(value) => {
              setSelect(value);
            }}
            value={select}
          >
            {subsectionList &&
              subsectionList.map((item) => {
                let uri = defaultSettings.base + item.video_url;
                uri = uri.replaceAll('//', '/');
                console.log('subsectionList', uri);
                return <Select.Option value={uri}>{item.name}</Select.Option>;
              })}
          </Select>
        </div>
        <div className={styles['video']}>
          <video
            src={window.location.origin + select}
            autoPlay={true}
            style={{ width: '100%' }}
            controlsList="nodownload"
            controls={true}
          />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
