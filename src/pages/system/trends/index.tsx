import React, { useState, useEffect, useMemo,useRef } from 'react';

import styles from './index.less';
import { InfiniteScroll, List, Avatar, ImageViewer, Modal, Image, Grid, Ellipsis, Popover, Toast,Popup,PullToRefresh } from 'antd-mobile';
import defaultSettings from '../../../../config/defaultSettings';
import { getTrendsList, deleteTrends } from './service';
import moment from 'moment';
import { MoreOutline, CameraOutline } from 'antd-mobile-icons'
import VideoPlayer from '@/pages/system/video/VideoPlayer';
import {
  CameraFilled
} from '@ant-design/icons';
import TrendsInfo from './component/trendsInfo';

import { history, useModel,Helmet } from 'umi';
import { set } from 'lodash';

const Trends: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser, isStudent } = initialState || {};
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [popupData, setPopupData] = useState<any>([]);
  const imgRef=useRef<any>(null);
  const[page,setPage]=useState(1);
  const[pageSize,setPageSize]=useState(10);


  const getList = () => {
    (async () => {
      const res = await getTrendsList(currentUser?.userId, !isStudent,page,pageSize);
      setData(res.rows || []);
      setPage(1);
    })();
  }
  // useEffect(() => {
    
  //     getList();
    
    
  // }, []);
  const loadMore = async () => {

    const append = await getTrendsList(currentUser?.userId, !isStudent,page,pageSize);
    if (append && append.rows && append.rows.length > 0) {
      const total=append.total;
      // 更新数据和页码
    setData((prevData) => [...prevData, ...append.rows]);
    setPage((prevPage) => prevPage + 1);
      // 判断是否还有更多数据
      if (append.rows.length < pageSize) {
        setHasMore(false);
      }
    }else{
      setHasMore(false);
    }
  };

  const formatBefore = oldTime => {
    const oldDate = new Date(oldTime)
    //当前时间
    const newDate = new Date();
    const newDateTime1 = newDate.getTime(); //含有时分秒
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    const newDateTime2 = newDate.getTime(); //当前时间,不含有时分秒 

    //传递时间
    const oldDateTime1 = oldDate.getTime(); //含有时分秒
    oldDate.setHours(0);
    oldDate.setMinutes(0);
    oldDate.setSeconds(0);
    oldDate.setMilliseconds(0);
    const oldDateTime2 = oldDate.getTime();//不含有时分秒

    const d1 = (newDateTime1 - oldDateTime1) / 1000;
    const d2 = (newDateTime2 - oldDateTime2) / 1000;

    let res = '';
    if (d2 > 0) { //是几天前
      const days = parseInt(d2 / 86400);
      if (days === 1) {
        res = "昨天";
      } else if (days === 2) {
        res = "前天";
      } else {
        res = days + "天前";
      }
    } else { //是今天
      const hours = parseInt(d1 / 3600);
      if (hours > 0) {
        res = hours + "小时前";
      } else {
        const minutes = parseInt(d1 / 60);
        if (minutes > 0) {
          res = minutes + "分钟前"
        } else {
          const seconds = parseInt(d1);
          if (seconds > 10) {
            res = seconds + "秒前"
          } else {
            res = "刚刚"
          }
        }
      }

    }
    return res;
  }

  const renderGridItem = (file_urls: any) => {
    let node = [];
    if (file_urls != null && file_urls != "") {
      const file_url_list = JSON.parse(file_urls);
      if (file_url_list.length > 0) {
        console.log("imgRef.current",imgRef.current?.clientWidth)
        file_url_list.map(item => {
          if (item.type.indexOf("image") > -1) {
            node.push(
              <Grid.Item key={item.relUrl}>
                <Image

                  lazy
                  src={item.relUrl}
                  width={'100%'}
                  height={file_url_list.length<=3?(imgRef.current?.clientWidth*0.75)/(file_url_list.length):(imgRef.current?.clientWidth*0.75)/3}
                  fit="contain"
                  onClick={() => {
                    ImageViewer.show({ image: item.relUrl });
                  }}
                />
              </Grid.Item>
            )
          } else {
            node.push(
              <Grid.Item key={item.relUrl}>
                <VideoPlayer src={item.relUrl} className={styles["video-css"]} style={{height:file_url_list.length<=3?(imgRef.current?.clientWidth*0.75)/(file_url_list.length):(imgRef.current?.clientWidth*0.75)/3}}/>
              </Grid.Item>
            )
          }
        })


        return <Grid columns={file_url_list.length <= 3 ? file_url_list.length : 3} gap={8}>
          {node.map(item => item)}
        </Grid>
      } else {
        return null
      }


    }
  }
  const popoverMenu = () => {
    let list = [
      { key: 'info', icon: <></>, text: '详情' },

    ]
    if (!isStudent) {
      list.push({ key: 'delete', icon: <></>, text: '删除' })
    }
    return list;
  }
  return (
    <>
    <Helmet>
        <title>动态</title>
      </Helmet>
    <PullToRefresh
      onRefresh={async () => {
        // await sleep(1000)
        // setData([...getNextData(), ...data])
        getList()
      }}
      >
      <div className={styles["bg"]} style={{backgroundImage: `url("${defaultSettings.base}static/img/trends_bg.jpg") `}}>
        <div className={styles["bg-edit"]}>
          {!isStudent && <CameraFilled style={{ color: "#fff", fontSize: 24 }} onClick={() => { history.push("/trendsform") }} />}
        </div>
        <div className={styles["bg-name"]}>
          <strong>{currentUser?.nickName}</strong>
        </div>
        <div className={styles["bg-avatar"]}>
          <Avatar src={currentUser?.avatar} style={{ '--size': '64px' }} />
        </div>
      </div>
      <List style={{ '--border-top': "none" }}>
        {data.map((item, index) => {
          // const file_urls = item.file_url.split(',');
          // console.log("file_urls", file_urls)
          return (
            <List.Item
              key={index}
              prefix={<Avatar src={item.avatar} style={{ marginTop: 12 }} />}
              description={<div style={{ marginTop: 5 }}>{formatBefore(item.time)}</div>}
              style={{ alignItems: "flex-start" }}
              className={styles['trends-item']}
              extra={
                <div style={{ display: "flex", alignItems: "flex-end", height: "100%", paddingBottom: 5 }}>
                  <Popover.Menu
                    actions={popoverMenu().map(action => ({
                      ...action,
                      icon: null,
                    }))}
                    onAction={node => {
                      if (node.key === "info") {
                        setPopupData([item])
                        setPopupVisible(true)
                        
                      } if (node.key === "delete") {
                        Modal.confirm({
                          title: '删除动态',
                          content: '确定删除该动态吗？',
                          onConfirm: () => {
                            deleteTrends(item.id).then(res => {
                              if (res.code === 200) {
                                Toast.show("删除成功")
                                getList()
                              } else {
                                Toast.show("删除失败")
                              }
                            })
                          },
                        })
                      }
                    }}
                    placement='bottom-start'
                    trigger='click'
                  >
                    <MoreOutline fontSize={32} />
                  </Popover.Menu>

                </div>
              }

            >
              <p style={{ marginBottom: 5 }}>
                <strong style={{ color: "#5a5acd" }}>{item.nick_name}</strong>
              </p>

              <Ellipsis style={{ marginBottom: 12 }} content={item.content} direction='end' rows={3} expandText='展开'
                collapseText='收起' />
              <p ref={imgRef}>
              {renderGridItem(item.file_url)}
              </p>
            </List.Item>
          );
        })}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
      <Popup
              visible={popupVisible}
              onMaskClick={() => {
                setPopupVisible(false)
              }}
              onClose={() => {
                setPopupVisible(false)
              }}
              bodyStyle={{ height: '100vh' }}
            >
              <TrendsInfo data={popupData} onCancle={()=>setPopupVisible(false)}/>
            </Popup>

    </>
  );
};

export default Trends;
