import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Form, Select, Input, Upload, Image, message } from 'antd';

import { addSubjectInfo, editSubjectInfo } from '../../service';
import SubsectionUpload from '../subsection/upload';
import { subjectInfoType, commonFormType } from '@/utils/valueEnum';

const SubjectInfoFormPage: React.FC = (props: any) => {
  const [addForm] = Form.useForm();
  const { isModalOpen, handleCancel, subject_id, type, subject_info, callBack } = props;
  const [uploadType, setUploadType] = useState(0);
  useMemo(() => {
    if (type == commonFormType.编辑) {
      console.log(type, subject_info);
      addForm.setFieldsValue(subject_info);
    }
  }, [subject_info, type]);
  const onOk = () => {
    addForm.validateFields().then((values) => {
      console.log(values);
      values['subject_id'] = subject_id;
      if (type == commonFormType.添加) {
        addSubjectInfo(values)
          .then((res) => {
            if (res.code == 200) {
              message.success('课时添加成功');
              handleCancel();
              callBack();
            } else {
              message.error('课时添加失败');
            }
          })
          .catch((e) => console.log(e.message));
      } else {
        values['subject_info_id'] = subject_info.subject_info_id;
        editSubjectInfo(values)
          .then((res) => {
            if (res.code == 200) {
              message.success('课时修改成功');
              handleCancel();
              callBack();
            } else {
              message.error('课时修改失败');
            }
          })
          .catch((e) => console.log(e.message));
      }
    });
  };
  return (
    <>
      <Modal
        title={type == commonFormType.添加 ? '添加课时' : '编辑课时'}
        open={isModalOpen}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <Form
          form={addForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="课时名称"
            name="name"
            rules={[{ required: true, message: '请输入课程名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="课时内容"
            name="context"
            rules={[{ required: true, message: '请输入课程名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="知识点"
            name="knowledge"
            rules={[{ required: false, message: '请输入课程名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="课件"
            name="pdf_url"
            rules={[{ required: true, message: '请上传pdf文件！!' }]}
            style={{ marginBottom: 24 }}
          >
            <SubsectionUpload
              type="pdf"
              callBack={(value) => addForm.setFieldValue('pdf_url', value)}
            />
          </Form.Item>
          <Form.Item
            label="课程类型"
            name="type"
            style={{ marginBottom: 24 }}
            rules={[
              {
                required: type == commonFormType.添加 ? true : false,
                message: '请选择课程类型！!',
              },
            ]}
            initialValue={0}
          >
            <Select
              style={{ width: 220 }}
              onChange={(value) => setUploadType(value)}
              defaultValue={subjectInfoType['编程小节']}
            >
              <Select.Option value={subjectInfoType['编程小节']}>编程小节</Select.Option>
              <Select.Option value={subjectInfoType['视频小节']}>视频小节</Select.Option>
              <Select.Option value={subjectInfoType['课程视频']}>课程视频</Select.Option>
            </Select>
          </Form.Item>
          {uploadType === subjectInfoType['课程视频'] ? (
            <Form.Item
              label="视频上传"
              name="url"
              rules={[
                {
                  required: type == commonFormType.添加 ? true : false,
                  message: '请上传视频文件！!',
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <SubsectionUpload
                type={'video/subject_id' + subject_id}
                callBack={(value) => addForm.setFieldValue('url', value)}
              />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};

export default SubjectInfoFormPage;
