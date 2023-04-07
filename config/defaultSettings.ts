import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const { REACT_APP_ENV } = process.env;
console.log('REACT_APP_ENV2', REACT_APP_ENV);
let base = '/';
if (REACT_APP_ENV !== 'dev') {
  base = '/admin/';
}
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  tabsLayout?: boolean;
  apiBasePath?: string;
  base?: string;
} = {
  navTheme: 'light',
  headerTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  splitMenus: true,
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '',
  pwa: false,
  logo: base + 'pro_icon.svg',
  iconfontUrl: '',
  tabsLayout: true,
  apiBasePath: '/api',
  base: base,
};

export default Settings;
