import React, { useState, useEffect, useMemo ,useRef} from 'react';
import{Upload,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../../index.less';
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,Space,Grid,Radio,
  Slider,
  ImageViewer,
  SearchBar,
  CheckList, Popup,
  Cascader,CascadePicker,ImageUploader,Toast
} from 'antd-mobile'
import { addTrendsList,uploadFile } from '../../service';
import { getSubjectTypeList, getSubjectByTypeId, getSubjectInfoListById} from '../../../subject/service';
import moment from 'moment';
import {
  getUserList,
  getUser,
  removeUser,
  addUser,
  updateUser,
  exportUser,
  updateUserPwd,
  getDeptTree,
  getUserCreateCount,
} from '../../../user/service';
import type { DataNode } from 'antd/lib/tree';
import { history, useModel } from 'umi';
import {compressImage,CompressorVideo} from '../../../../../utils/compressImage';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||false;
const TrendsForm: React.FC = (props:any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser, isStudent } = initialState || {};
  const [form] = Form.useForm();
  const[file_type,setFileType]=useState<number>(0)
  const [fileList, setFileList] = useState<any[]>([])
  const [file_url_list, setFileUrlList] = useState<any[]>([])
  const [deptTree, setDeptTree] = useState<DataNode[]>();
  const [visible, setVisible] = useState(false);
  const [selectDeptId, setSelectDeptId] = useState<any>([]);
  const [studentList, setStudentList] = useState<any[]>([]);

  const [valueToOptions, setValueToOptions] = useState(
    {} 
  )
  const [searchText, setSearchText] = useState('');
  const [selectUserIds, setSelectUserIds] = useState<any[]>([]);
  const options = useMemo<any[]>(() => {
    function generate(v: string): any[] | undefined {
      const options = valueToOptions[v]
      if (options === null) {
        return undefined
      }
      if (options === undefined) {
        return Cascader.optionSkeleton
      }
      return options.map(option => ({
        ...option,
        children: generate(option.value),
      }))
    }
    return generate('') ?? []
  }, [valueToOptions])
  const filteredItems = useMemo(() => {
    if (searchText) {
      return studentList.filter(item => item.nickName.includes(searchText))||[]
    } else {
      return studentList
    }
  }, [studentList, searchText])

  async function fetchOptionsForValue(v: string, level: number) {
    if (v in valueToOptions) return
    let options = []
    if (level === 0) {
      const res = await getSubjectTypeList()
      options =
        res === null
          ? null
          : res.data.map(entry => ({
            value: entry.subject_type_id,
            label: entry.subject_type_name,
          }));
      setValueToOptions(prev => ({
        ...prev,
        [v]: options,
      }))

    }
    else if (level === 1) {
      const res = await getSubjectByTypeId(v)
      options =
        res === null
          ? null
          : res.data.map(entry => ({
            value: entry.subject_id,
            label: entry.subject_name,
          }));
      setValueToOptions(prev => ({
        ...prev,
        [v]: options,
      }))

    }
    else if (level === 2) {
      const res = await getSubjectInfoListById(v)
      options =
        res === null
          ? null
          : res.data.map(entry => ({
            value: entry.subject_info_id,
            label: entry.name,
          }));
      setValueToOptions(prev => ({
        ...prev,
        [v]: options,
      }))

    }


    else if (level >= 3) {
      setValueToOptions(prev => ({
        ...prev,
        [v]: null,
      }))
      return
    }

  }
  const filterDept = (treeData) => {
    const list=treeData.map((item) => {
      item.label = item.title
      if (item.children) {
        filterDept(item.children)
      } 
      return {...item};
    })
    return list;
  }

  useEffect(() => {
    fetchOptionsForValue('', 0)
    getDeptTree({}).then((res) => {
      const treeData = filterDept(res);
      setDeptTree(treeData);
      console.log("treeData",treeData)
    });
  }, [])
  
  useEffect(() => {
    if (selectDeptId) {
      getUserList({ deptId: selectDeptId[selectDeptId.length-1] ,current:1,pageSize:99999,roleId:5,status:0}).then((res) => {
        setStudentList(res.rows);
        console.log("getUserList",res.rows)
      });
    }

  }, [selectDeptId])

  const onFinish = (values: any) => {
    console.log(values,fileList)
    // const url_list=file_url_list.map(item=>item.url)
    form.validateFields().then(async (values) => {
      console.log(values)
      const subject=values.subject
      const userIds=values.userIds
      values.subjectTypeId=subject[0]
      values.subjectId=subject[1]
      values.subjectInfoId=subject[2]
      values.fileUrl=JSON.stringify(file_url_list)
      values.userIds=userIds.join(',')
      values.createUserId=currentUser.userId;
      const res = await addTrendsList(values);
      if (res.code == 200) {
        Toast.show('发表成功');
        if(isMobile){
          history.push('/trends')
        }else{
          props.callBack(Math.random())
          form.resetFields();
          setFileList([]);
        }
        
      }
    })
  }

  // const mockUpload = async (file) => {
  //    console.log("file",file)
  //   //   const time=Date.now()
  //   //   console.log(time)
  //   //   const name=file.name
  //   //   file.name=time+name
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('type', "trends");
  //     const res=await uploadFile(formData);
  //     if (res.code == 200 && res.url !== '') {
  //       return{
  //         relUrl: res.url,
  //         type:file.type,
  //         url:URL.createObjectURL(file)
  //       }
  //     }
    
  // }
  
  // const beforeUpload = (file) => {
  //   console.log(file)
  //   const time=Date.now()
  //   const name=time+file.name
  //   const newFile = new File([file], name,{type: file.type, lastModified: file.lastModified});
  //   return newFile
  // }
  console.log("fileList",fileList)

  const uploadProps = {
    multiple: true,
    accept: 'image/*,video/*',
    listType:"picture-card",
    fileList,
    maxCount: 9,
    async beforeUpload (file) {
      console.log("beforeUpload",file)
      const time=Date.now()
      let name=time+file.name
      let newFile=null;
      if(file.type.includes("video")){
        const nameArray=file.name.split(".")
        name=name.replace(nameArray[nameArray.length-1],"mp4") 
        //因微信浏览器的限制，视频的压缩则放在后端处理
        newFile = new File([file], name,{type: 'video/mp4', lastModified: file.lastModified});
        // await CompressorVideo(file);
        // console.log("newFile",newFile)
        
      }else if(file.type.includes("image")){
        //先压缩图片再上传
        const compress_img=await compressImage(file,0.5)
        newFile = new File([compress_img], name,{type: file.type, lastModified: file.lastModified});
      }
      console.log("newFile2",newFile)
      return newFile
    },
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
    onPreview(file){
      
      if(file.type.includes("image")){
        const curFile=file_url_list.find(i=>i.name===file.name)
        console.log("curFile",curFile);
        ImageViewer.show({ image: curFile.url });
      }
      
    },
    onRemove(file){
      const list=file_url_list.filter(i=>i.name!==file.name)
      setFileUrlList(list)
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
      formData.append('type', "trends");
      uploadFile(formData, {
        //上传进度事件的回调函数
        onReqProgress: function (ev: ProgressEvent) {
          console.log('onReqProgress', Math.round((ev.loaded / ev.total) * 100).toFixed(2));
          onProgress({ percent: Math.round((ev.loaded / ev.total) * 100).toFixed(2) }, file);
        },
      })
        .then((res) => {
          setTimeout(() => {
            onSuccess();
          });
          if (res.code == 200 && res.url !== '') {
            const m={name:file.name,
              relUrl: res.url,
              type:file.type,
              url:URL.createObjectURL(file)
          
                    }
            setFileUrlList((old)=>[...old,m])
            // const list=fileList.map(item=>{
            //   if(item.file.uid==file.uid){
            //     item.url=res.url
            //   }
            // })
            // setFileList([...list])
          }
        })
        .catch(onError=>{
          
        });
      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
    },
  };
  return (
    <>
      <div className={styles["trendsForm"]}>
      <Form
      style={{'--border-top':"none"}}
        name='form'
        onFinish={onFinish}
        layout='horizontal'
        form={form}
        
      >
        <Form.Header><p className={styles["header_button"]}>
          
          <span onClick={()=>{history.push('/trends')}}>
                取消
              </span>
              
              <Button size='mini' color='success' type='submit'>
                发表
              </Button>
             
          </p></Form.Header>
        <Form.Item name='time' label='时间' rules={[{ required: true }]}
        trigger='onConfirm'  // ⬅️
        onClick={(e, datePickerRef) => {
          datePickerRef.current?.open()
        }}
        >
          <DatePicker
          precision='second'
          >
    {value =>
      value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '请选择'
    }
  </DatePicker>
        </Form.Item>
        <Form.Item name='subject' label='课程' 
        rules={[{ required: true }]}
        trigger='onConfirm'
        onClick={(e, cascaderRef) => {
          cascaderRef.current?.open()
        }}>
        <Cascader
          options={options}
          onSelect={value => {
            value.forEach((v, index) => {
              fetchOptionsForValue(v, index + 1)
            })
          }}
          
          
        >
          {value => {
          if (value.every(item => item === null)) {
            return '未选择'
          } else {
            return value.map(item => item?.label ?? '未选择').join('/')
          }
        }}
        </Cascader>
        </Form.Item>
        <Form.Item name='depId' label='部门' 
        rules={[{ required: true }]}
        trigger='onConfirm'
        onClick={(e, cascaderRef) => {
          cascaderRef.current?.open()
        }}>
          <Cascader
          options={deptTree}
          onSelect={value => {
            console.log("部门",value)
            setSelectDeptId(value)
          }}
          
        >
          {value => {
          if (value.every(item => item === null)) {
            return '未选择'
          } else {
            return value.map(item => item?.label ?? '未选择').join('-')
          }
        }}
          
        </Cascader>

        </Form.Item>
        <Form.Item name='userIds' label='接收人' 
        rules={[{ required: true }]}
        trigger='onConfirm'
        onClick={(e, popupRef) => {
          setVisible(true)
        }}>
        {selectUserIds.length>0?'已选'+selectUserIds.length+'人':'请选择'}
         

        </Form.Item>
        <Form.Item
          name='content'
          label='评价详情'
          rules={[{ required: true }]}
        >
          <TextArea
            rows={4}
            placeholder='请输入评价详情'
            />
        </Form.Item>
        
        
        <Form.Item  label='附件' layout="vertical">
        <Upload className={styles['upload-img']}
        {...uploadProps}
        
      >
        {fileList.length >= 9 ? null : (<div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>)}
      </Upload>
        {/* <ImageUploader
        accept={'image/*,video/*'}
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      beforeUpload={beforeUpload}
      multiple
      maxCount={9}
      showUpload={fileList.length < 9}
      onCountExceed={exceed => {
        Toast.show(`超出附件数量限制！`)
      }}
    /> */}
        </Form.Item>
      </Form>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        // destroyOnClose
      >
        <p className={styles["header_button"]}>
          
        <Button size='small' onClick={()=>{setSelectUserIds([]);setVisible(false);}}>
                取消
              </Button>
              
              <Button size='small' color='success' onClick={()=>{form.setFieldValue("userIds",selectUserIds);setVisible(false)}}>
                确定
              </Button>
             
          </p>
        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder='输入文字过滤选项'
            value={searchText}
            onChange={v => {
              setSearchText(v)
            }}
            showCancelButton={() => true}
            cancelText="全选"
            onCancel={()=>{
              setSelectUserIds(filteredItems.map((option) => option.userId));
            }}
          />
          
        </div>
        <div className={styles.checkListContainer}>
          <CheckList
          
          multiple 
            className={styles.myCheckList}
            // defaultValue={selected ? [selected] : []}
            value={selectUserIds}
            onChange={val => {
              // setSelected(val[0])
              // setVisible(false)
              setSelectUserIds(val)
              
              console.log("CheckList",val)
            }}
          >
            {filteredItems&&filteredItems.map(item => (
              <CheckList.Item key={item.userId} value={item.userId}>
                {item.nickName}
              </CheckList.Item>
            ))}
          </CheckList>
        </div>
      </Popup>
    </>
  );
};

export default TrendsForm;
