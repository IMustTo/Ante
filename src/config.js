const wwwConfig = {
  base_ws_path: 'ws://wechat.i3618.com.cn/core-web/',
  bowerCountTime: '',
  currentCorpName: '爱心小学',
  env_type: 'test',
  hasLogin: true,
  identityList: [{ code: '102', name: '家长' }, { code: '103', name: '老师' }],
  loginUser: {
    headIcon: '',
    headPortraitId: 0,
    lastLoginIp: '',
    lastLoginTime: null,
    loginName: 'axyangss',
    mobile: '18905429186',
    operatorId: 45,
    operatorName: '我是谁a',
    orgSeqName: '',
    sex: '',
    status: '101',
    userType: '103',
  },
  projectPath: 'http://wechat.i3618.com.cn',
  release: false,
  sessionId: '9a73bbf2-0bc1-43f5-91ef-edbaaaf3682a!536806633',
  www_head: 'http://wechat.i3618.com.cn/core-web/',
  www_remote: '',
  www_version: 1480489568398,
};

const wechatConfig = {
  currentAgentId: '294',
  currentCorpId: 'wxc2a104d974df2b69',
  currentRootOrgId: '2533',
  currentUrl: 'http://wechat.i3618.com.cn/core-web/i3618/star/index',
  nonceStr: 'sLSTsmZEUPqa6C0u',
  signature: 'd5cb1ffa7eaa2b547f41ae9cd9f78e48900e74f2',
  timestamp: '1480489549',
};

const wwwAliyunImgurl = 'http://testimg.i3618.com.cn/';

export default {
  WWW_CONFIG: window.WWW_CONFIG || wwwConfig,
  WECHAT_CONFIG: window.WECHAT_CONFIG || wechatConfig,
  www_aliyun_imgurl: window.www_aliyun_imgurl || wwwAliyunImgurl,
};
