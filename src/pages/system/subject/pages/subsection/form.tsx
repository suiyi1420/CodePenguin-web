import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Form, Select, Input, Upload, Image, message } from 'antd';
import { addSubjectSubsection, editSubjectSubsection } from '../../service';
import SubsectionUpload from './upload';
import { subjectSubsectionType, subjectInfoType, commonFormType } from '@/utils/valueEnum';

const SubsectionFormPage: React.FC = (props: any) => {
  const [addForm] = Form.useForm();
  const {
    isModalOpen,
    handleCancel,
    subjectInfoId,
    type,
    subject_subsection,
    callBack,
    subjectInfo_type,
  } = props;
  const [uploadType, setUploadType] = useState(0);
  useMemo(() => {
    if (type == commonFormType.编辑) {
      addForm.setFieldsValue(subject_subsection);
    }
    if (subjectInfo_type == subjectInfoType.视频小节) {
      setUploadType(subjectSubsectionType.仅视频);
    } else {
      setUploadType(subjectSubsectionType['视频+sb3文件']);
    }
  }, [subject_subsection, type]);
  const onOk = () => {
    addForm.validateFields().then((values) => {
      values['subject_info_id'] = subjectInfoId;
      values['status'] = 1;
      console.log(values);
      if (type == commonFormType.添加) {
        addSubjectSubsection(values)
          .then((res) => {
            if (res.code == 200) {
              message.success('课时小节添加成功');
              handleCancel();
              callBack();
            } else {
              message.error('课时小节添加失败');
            }
          })
          .catch((e) => console.log(e.message));
      } else if (type == commonFormType.编辑) {
        values['id'] = subject_subsection.id;
        editSubjectSubsection(values)
          .then((res) => {
            if (res.code == 200) {
              message.success('课时小节修改成功');
              handleCancel();
              callBack();
            } else {
              message.error('课时小节修改失败');
            }
          })
          .catch((e) => console.log(e.message));
      } else {
        values['status'] = 2;
        editSubjectSubsection(values)
          .then((res) => {
            if (res.code == 200) {
              message.success('课时小节删除成功');
              handleCancel();
              callBack();
            } else {
              message.error('课时小节删除失败');
            }
          })
          .catch((e) => console.log(e.message));
      }
    });
  };
  return (
    <>
      <Modal
        title={type === commonFormType.编辑 ? '编辑课时小节' : '添加课时小节'}
        open={isModalOpen}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <Form
          form={addForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="小节名称"
            name="name"
            rules={[
              { required: type == commonFormType.添加 ? true : false, message: '请输入课程名称!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item label="上传类型" name="type" style={{ marginBottom: 24 }}>
            <Select
              style={{ width: 220 }}
              onChange={(value) => setUploadType(value)}
              defaultValue={
                subjectInfo_type == subjectInfoType.视频小节
                  ? subjectSubsectionType.仅视频
                  : subjectSubsectionType['视频+sb3文件']
              }
            >
              {subjectInfo_type !== subjectInfoType.视频小节 && (
                <>
                  <Select.Option value={subjectSubsectionType['视频+sb3文件']}>
                    视频+sb3文件
                  </Select.Option>
                  <Select.Option value={subjectSubsectionType.仅sb3}>仅sb3</Select.Option>
                  <Select.Option value={subjectSubsectionType.仅视频}>仅视频</Select.Option>
                </>
              )}

              {subjectInfo_type == subjectInfoType.视频小节 && (
                <Select.Option value={subjectSubsectionType.仅视频}>仅视频</Select.Option>
              )}
            </Select>
          </Form.Item>
          {(uploadType === subjectSubsectionType['视频+sb3文件'] ||
            uploadType === subjectSubsectionType.仅视频) && (
            <Form.Item
              label="视频上传"
              name="video_url"
              rules={[
                {
                  required: type == commonFormType.添加 ? true : false,
                  message: '请上传视频文件！!',
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <SubsectionUpload
                type="video"
                uploadPath={'video/subjectInfoId' + subjectInfoId}
                callBack={(value) => addForm.setFieldValue('video_url', value)}
              />
            </Form.Item>
          )}

          {(uploadType === subjectSubsectionType['视频+sb3文件'] ||
            uploadType === subjectSubsectionType.仅sb3) && (
            <Form.Item
              label="sb3文件上传"
              name="file_url"
              rules={[
                {
                  required: type == commonFormType.添加 ? true : false,
                  message: '请上传sb3文件！',
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <SubsectionUpload
                type="sb3"
                uploadPath={'sb3/subjectInfoId' + subjectInfoId}
                callBack={(value) => addForm.setFieldValue('file_url', value)}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default SubsectionFormPage;
