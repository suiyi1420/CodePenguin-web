import React, { useState, useEffect, useMemo } from 'react';

import { Table, Empty, Spin, Modal } from 'antd';
import defaultSettings from '../../../../config/defaultSettings';
import { videoPageType } from '@/utils/valueEnum';
import PdfPage from './Pdf';
import styles from './index.less';
import { getSubjectInfoById } from '@/pages/system/subject/service';

const VideoPdf: React.FC = () => {
  const searchURL = location.search; // 获取到URL中的参数串
  const params = new URLSearchParams(searchURL);
  const valueObj = Object.fromEntries(params); // 转换为普通对象

  const type = parseInt(valueObj.type);
  const [video_url, setVideo_url] = useState('');
  const [pdf_url, setPdf_url] = useState('');
  const subjectInfoId = parseInt(valueObj.subjectInfoId);

  async function getSubjectInfoByIdFun() {
    const res = await getSubjectInfoById(subjectInfoId);

    if (res.data) {
      if (type == videoPageType.video) {
        let url = defaultSettings.base + res.data.url;
        url = url.replaceAll('//', '/');
        url = window.location.origin + url;
        setVideo_url(url);
      } else if (type == videoPageType.pdf) {
        let purl = defaultSettings.base + res.data.pdf_url;
        purl = purl.replaceAll('//', '/');
        purl = window.location.origin + purl;
        setPdf_url(purl);
      }
    }
  }
  useMemo(() => {
    getSubjectInfoByIdFun();
  }, []);

  return (
    <div className={styles['page']}>
      {type == videoPageType.video && video_url !== '' && (
        <div className={styles['video']}>
          <video
            src={video_url}
            autoPlay={true}
            style={{ width: '100%' }}
            controlsList="nodownload"
            controls={true}
          />
        </div>
      )}
      {type == videoPageType.pdf && pdf_url !== '' && <PdfPage url={pdf_url} />}
    </div>
  );
};

export default VideoPdf;
