import React, { useState, useEffect, useMemo, useRef } from 'react';

import styles from '../index.less';
import {
    List,
    Avatar,
    Image,
    ImageViewer,
    Ellipsis,
    DatePicker,
    Selector, Space, Grid, Radio,
    Slider,
    Stepper,
    SearchBar,
    CheckList, Popup,
    Cascader, CascadePicker, ImageUploader, Toast
} from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import moment from 'moment';

import { history, useModel } from 'umi';
import VideoPlayer from '@/pages/system/video/VideoPlayer';
import type { RouteChildrenProps } from 'react-router';

interface ITrendsInfo {
    avatar: string;
    content: string;
    context: string;
    create_user_id: number;
    file_type: number;
    file_url: string;
    id: number;
    knowledge: string;
    name: string;
    nick_name: string;
    subject_id: number;
    subject_info_id: number;
    subject_type_id: number;
    time: string;
    user_ids: string;
}
interface IProps {
    data: ITrendsInfo[];
    onCancle: () => void;
}

const TrendsInfo = (props: IProps) => {
    const imgRef1 = useRef<any>(null);
const[width,setWidth]=useState(0);
    useEffect(() => {
        if (imgRef1.current !== null) {
          // 执行某些操作
          setWidth(imgRef1.current?.clientWidth)
        }
      }, [imgRef1]);
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

                file_url_list.map(item => {
                    if (item.type.indexOf("image") > -1) {
                        node.push(
                            <Grid.Item key={item.relUrl}>
                                <Image

                                    lazy
                                    src={item.relUrl}
                                    width={'100%'}
                                    height={file_url_list.length <= 3 ? (width * 0.75) / (file_url_list.length) : (width * 0.75) / 3}
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
                                <VideoPlayer src={item.relUrl} className={styles["video-css"]} style={{ height: file_url_list.length <= 3 ? (width * 0.75) / (file_url_list.length) : (width * 0.75) / 3 }} />
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
    console.log("imgRef1.current",imgRef1.current?.clientWidth)
    return (
        <><p className={styles["header_button"]}>

            <span onClick={() => { props.onCancle() }}>
                <LeftOutline fontSize={20} />
            </span>



        </p>
        <div style={{overflow:"scroll",height:"90vh"}}>
            <List style={{ '--border-top': "none" }}>
                {props.data && props.data.map((item, index) => {
                    // const file_urls = item.file_url.split(',');
                    // console.log("file_urls", file_urls)
                    return (
                        <List.Item
                            key={index}
                            prefix={<Avatar src={item.avatar} style={{ marginTop: 12 }} />}
                            description={<div style={{ marginTop: 5 }}>{formatBefore(item.time)}</div>}
                            style={{ alignItems: "flex-start" }}
                            className={styles['trends-item']}

                        >
                            <p style={{ marginBottom: 5 }}>
                                <strong style={{ color: "#5a5acd" }}>{item.nick_name}</strong>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                                <span style={{ color: "#FF9800" }}>主题&nbsp;：</span><span>{item.name}</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                                <span style={{ color: "#FF9800" }}>内容&nbsp;：</span><span>{item.context}</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                                <span style={{ color: "#FF9800" }}>知识点：</span><Ellipsis style={{ marginBottom: 12 }} content={item.knowledge} direction='end' rows={3} expandText='展开'
                                    collapseText='收起' />
                            </p>
                            <hr style={{ borderColor: "#FF9800", color: "#FF9800" }}></hr>
                            <p style={{ marginBottom: 10 }}>
                                {item.content}
                            </p>
                            {/* <Ellipsis style={{ marginBottom: 12 }} content={item.content} direction='end' rows={3} expandText='展开'
                            collapseText='收起' /> */}

                            <p ref={imgRef1}>
                                {renderGridItem(item.file_url)}
                            </p>

                        </List.Item>
                    );
                })}
            </List>
        </div>
        </>
    );
}

export default TrendsInfo;