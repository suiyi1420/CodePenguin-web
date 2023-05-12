import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Form, Select, Input, Upload, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadSubjectFile } from '../../service';
import { uploadAccess } from '@/utils/valueEnum';
type Iprops = {
  type: string;
  callBack: (data: any) => void;
  uploadPath: string;
};
const SubsectionUpload: React.FC<{ props: Iprops }> = (props: Iprops) => {
  const { type, callBack, uploadPath } = props;
  const [fileList, setFileList] = useState([]);
  const acceptType = uploadAccess[type];
  const uploadProps = {
    multiple: false,
    accept: acceptType,
    fileList,
    maxCount: 1,
    onChange(info: any) {
      console.log('onChange', info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
      setFileList([...info.fileList]);
    },

    onStart(file) {
      console.log('onStart', file, file.name);
    },

    onError(err) {
      console.log('onError', err);
    },

    customRequest({ file, filename, onError, onProgress, onSuccess, withCredentials }) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', uploadPath);
      uploadSubjectFile(formData, {
        //上传进度事件的回调函数
        onReqProgress: function (ev: ProgressEvent) {
          console.log('onReqProgress', Math.round((ev.loaded / ev.total) * 100).toFixed(2));
          onProgress({ percent: Math.round((ev.loaded / ev.total) * 100).toFixed(2) }, file);
        },
        // //下载进度事件的回调函数
        // onResProgress: function (ev: ProgressEvent) {
        //   console.log('onResProgress', ev);
        // },
      })
        .then((res) => {
          setTimeout(() => {
            onSuccess();
          });
          if (res.code == 200 && res.url !== '') {
            callBack && callBack(res.url);
          }
        })
        .catch(onError);

      // const headers = {};
      // const accessToken = getAccessToken();
      // if (accessToken) {
      //   headers['Authorization'] = `Bearer ${accessToken}`;
      // }

      // axios
      //   .post('/api/system/user/profile/subject_upload', formData, {
      //     withCredentials,
      //     headers,

      //     onUploadProgress: ({ total, loaded }) => {
      //       console.log('onUploadProgress', total, loaded);
      //       onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
      //     },
      //   })
      //   .then((res) => {
      //     onSuccess(res, file);
      //     setTimeout(() => {
      //       onSuccess();
      //     });
      //   })
      //   .catch(onError);

      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
    },
  };

  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
    </>
  );
};

export default SubsectionUpload;
