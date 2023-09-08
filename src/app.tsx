/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/15
 *
 * */

import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { roleList } from '@/utils/valueEnum';
import defaultSettings from '../config/defaultSettings';
import { getUserInfo, getRoutersInfo } from './services/session';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  userConfig?: () => Promise<any>;
  isStudent?: boolean;
  isMobile?: boolean;
}> {
  const fetchUserInfo = async () => {
    try {
      const resp = await getUserInfo();
      if (resp === undefined || resp.code !== 200) {
        history.push(loginPath);
      } else {
        return { ...resp.user, permissions: resp.permissions } as API.CurrentUser;
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const res = await fetch(defaultSettings.base + 'config.json');
  const userConfig = await res.json();
  console.log('userConfig', userConfig);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||false;
  console.log("isMobile",isMobile)
  const stratchJs = () => {
    fetch(userConfig['stratch-web'] + userConfig['stratch-js']).catch((e) =>
      console.log(e.message),
    );
  };

  stratchJs();
  
  const resp = await getUserInfo();
  console.log("resp,",resp)
  // 如果是登录页面，不执行
  if (resp&& resp.code === 200) {
    const currentUser = await fetchUserInfo();
    const url = window.location.href;
    let isStudent = false;
    console.log("currentUser.roles",currentUser.roles)
    currentUser &&
        currentUser.roles.map((item: any) => {
          if (item.roleId === roleList['学生']) {
            isStudent = true;
          }
        });
    if (url == window.location.origin || url == window.location.origin + defaultSettings.base) {

    }
    if (isMobile) {
      console.log("This is a mobile device");
      history.push('/trends');
    } else {
      console.log("This is a desktop device");
      if (isStudent) {
        history.push('/student');
      }
    }
    console.log("isStudent",isStudent)
    return {
      settings: defaultSettings,
      currentUser,
      fetchUserInfo,
      userConfig,
      isStudent:isStudent,
      isMobile:isMobile
    };
  }
  return {
    fetchUserInfo,
    userConfig,
    settings: defaultSettings,
    isMobile:isMobile
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link key="docs" to="/~docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: async () => {
        if (!initialState?.currentUser?.userId) {
          return [];
        }
        // initialState.currentUser 中包含了所有用户信息
        const menus = await getRoutersInfo();
        // console.log('menusmenus', menus);
        setInitialState((preInitialState) => ({
          ...preInitialState,
          menus,
        }));
        return menus;
      },
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    //隐藏悬浮设置框
    childrenRender: (children, props) => {
      return (
        <div>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <></>
            // <SettingDrawer
            //   enableDarkTheme
            //   settings={initialState?.settings}
            //   onSettingChange={(settings) => {
            //     setInitialState((preInitialState) => ({
            //       ...preInitialState,
            //       settings,
            //     }));
            //   }}
            // />
          )}
        </div>
      );
    },
    ...initialState?.settings,
  };
};
