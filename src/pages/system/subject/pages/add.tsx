import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Form, Select, Input, Upload, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addSubject, editSubject } from '../service';
import defaultSettings from '../../../../../config/defaultSettings';
import SubsectionUpload from './subsection/upload';
import { commonFormType } from '@/utils/valueEnum';
const AddSubjectPage: React.FC = (props: any) => {
  const [addForm] = Form.useForm();
  const [subjectImg, setSubjectImg] = useState<any>();
  const [subjectFile, setSubjectFile] = useState<any>();
  const { isModalOpen, handleCancel, subjectTypeList, formType, editRecord, callBack } = props;

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  // const uploadParams = {
  //   beforeUpload: (file) => {
  //     const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
  //     console.log('file', file);
  //     if (!isPNG) {
  //       message.error(`${file.name} 不是图片文件`);
  //     } else {
  //       getBase64(file, (url) => {
  //         console.log('url', url);
  //         setSubjectImg(url);
  //       });
  //       setSubjectFile(file);
  //     }
  //     return false;
  //   },
  //   onChange: (info) => {
  //     console.log('info.fileList', info);
  //     if (info.file.status === 'done') {
  //       // Get this url from response in real world.
  //     }
  //   },
  // };

  useMemo(() => {
    if (formType == commonFormType.编辑) {
      addForm.setFieldsValue(editRecord);
    }
  }, [formType, editRecord]);
  const onOk = () => {
    addForm
      .validateFields()
      .then((values) => {
        console.log(values);
        if (formType === commonFormType.添加) {
          addSubject(values)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                message.success('课程添加成功');
                callBack && callBack();
                handleCancel();
              } else {
                message.error('课程添加失败');
              }
            })
            .catch((e) => message.error(e.message));
        } else if (formType === commonFormType.编辑) {
          values['subject_id'] = editRecord['subject_id'];
          editSubject(values)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                message.success('课程修改成功');
                callBack && callBack();
                handleCancel();
              } else {
                message.error('课程修改失败');
              }
            })
            .catch((e) => message.error(e.message));
        }
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <>
      <Modal
        title={formType === commonFormType.添加 ? '添加课程' : '编辑课程'}
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
            label="课程分类"
            name="subject_type_id"
            rules={[{ required: true, message: '请选择课程分类!' }]}
            style={{ marginBottom: 24 }}
          >
            <Select style={{ width: 220 }}>
              {subjectTypeList &&
                subjectTypeList.map((item: any) => {
                  return (
                    <Select.Option value={item.subject_type_id}>
                      {item.subject_type_name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="课程名称"
            name="subject_name"
            rules={[{ required: true, message: '请输入课程名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="课程简介"
            name="subject_context"
            rules={[{ required: true, message: '请输入课程名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="课程小节数"
            name="class_time"
            rules={[{ required: false, message: '请输入课程名称!' }]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="课程图片"
            name="image"
            rules={[{ required: false, message: '请上传课程图片!' }]}
            style={{ marginBottom: 24 }}
          >
            <SubsectionUpload
              type="image"
              callBack={(value) => {
                addForm.setFieldValue('image', value);
                let url = defaultSettings.base + value;
                url = url.replaceAll('//', '/');
                url = window.location.origin + url;
                setSubjectImg(url);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Image src={subjectImg} width={'100%'} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSubjectPage;
