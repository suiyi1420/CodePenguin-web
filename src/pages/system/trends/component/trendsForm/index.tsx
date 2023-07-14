import React, { useState, useEffect, useMemo ,useRef} from 'react';

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
  Stepper,
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
import { set } from 'lodash';

const TrendsForm: React.FC = () => {
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
    form.validateFields().then(async (values) => {
      console.log(values)
      const subject=values.subject
      const userIds=values.userIds
      values.subjectTypeId=subject[0]
      values.subjectId=subject[1]
      values.subjectInfoId=subject[2]
      values.fileUrl=JSON.stringify(fileList)
      values.userIds=userIds.join(',')
      values.createUserId=currentUser.userId;
      const res = await addTrendsList(values);
      if (res.code == 200) {
        Toast.show('发表成功');
        history.push('/trends')
      }
    })
  }

  const mockUpload = async (file) => {
     console.log("file",file)
    //   const time=Date.now()
    //   console.log(time)
    //   const name=file.name
    //   file.name=time+name
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', "trends");
      const res=await uploadFile(formData);
      if (res.code == 200 && res.url !== '') {
        return{
          relUrl: res.url,
          type:file.type,
          url:URL.createObjectURL(file)
        }
      }
    
  }

  const beforeUpload = (file) => {
    console.log(file)
    const time=Date.now()
    const name=time+file.name
    const newFile = new File([file], name,{type: file.type, lastModified: file.lastModified});
    return newFile
  }
  console.log("fileList",fileList)
  return (
    <>
      
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
        
        
        <Form.Item  label='附件' >
        <ImageUploader
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
    />
        </Form.Item>
      </Form>
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
