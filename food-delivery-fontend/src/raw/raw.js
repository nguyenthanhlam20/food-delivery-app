import { Modal, Spin } from 'antd';
import jwt_decode from 'jwt-decode';
import moment from 'moment-timezone';
import React, { Suspense, useState } from 'react';
import Geocode from 'react-geocode';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import AppLoading from '../../components/app-loading';
import AppSpinner from '../../components/app-spinner';
import PrivateRoute from '../../components/private-route';
import { AC_LOCAL_STORE, MAP_API_KEY } from '../../constants/constant';
import { cryptoCustom } from '../../helpers/cryptoCustom';
import { useAppSelector } from '../../redux/hooks';
import axiosClient from '../../services/axiosClient';
import './App.css';
import routes from './routes';
const checkHasTouchScreen = () => {
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else {
    const mQ = window.matchMedia('(pointer:coarse)');
    if (mQ && mQ.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
};
function App() {
  const history = useHistory();
  const checkAuth = useAppSelector((state) => state.app.checkAuth);
  const logoutTimeout = React.useRef<any>();
  const sessionEprTime = React.useRef<any>();
  const loading = useAppSelector((state) => state.app.loading);
  const [isSessionTimeout, setIsSessionTimeout] = useState(false);
  const userInfo = cryptoCustom({ action: AC_LOCAL_STORE.GET_ITEM });
  const parseJson = userInfo ? JSON.parse(userInfo) : null;
  const token = parseJson ? parseJson.token.toString() : null;
  const decoded: any = token ? jwt_decode(token) : '';
  sessionEprTime.current = (decoded?.exp - decoded?.iat) * 1000;
  const renderRoute = () =>
    routes.map((route) =>
      route.isPrivate ? (
        <PrivateRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          // permissions={route.permissions}
        />
      ) : (
        <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
      ),
    );
  // get window height
  // fix safari brower
  // const windowHeight = () => {
  //   const doc = document.documentElement;
  //   doc.style.setProperty('--window-height', `${window.innerHeight}px`);
  // };
  // windowHeight();
  const deviceType = () => {
    const ua = navigator.userAgent;
    // console.log('first', isMobile, checkHasTouchScreen(), ua);
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile';
    } else if (checkHasTouchScreen()) {
      return 'tablet';
    }
    return 'desktop';
  };
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    // set geocode api key
    Geocode.setApiKey(MAP_API_KEY);
    moment.tz.setDefault('Asia/Dubai');
    // window.addEventListener('resize', windowHeight);
  }, []);
  React.useEffect(() => {
    // console.log(deviceType());
    if (deviceType() === 'desktop') {
      setVisible(true);
    }
  }, [navigator.userAgent]);
  const handleTimeout = () => {
    localStorage.clear();
    setIsSessionTimeout(false);
    clearTimeoutFunc();
    const chatbotButton = document.getElementById('fpt_ai_livechat_button');
    const chatbotContainer = document.getElementById('fpt_ai_livechat_display_container');
    if (chatbotButton) chatbotButton.style.display = 'none';
    if (chatbotContainer) chatbotContainer.style.display = 'none';
    const chatbotButtonTooltip = document.getElementById('fpt_ai_livechat_button_tooltip');
    if (chatbotButtonTooltip) chatbotButtonTooltip.style.display = 'none';
    window.location.href = '/';
  };
  const clearTimeoutFunc = () => {
    if (logoutTimeout.current) window.clearTimeout(logoutTimeout.current);
  };
  const setTimeoutFunc = () => {
    const Time = sessionEprTime.current ? sessionEprTime.current : 300000;
    logoutTimeout.current = window.setTimeout(timeOut, Time);
  };
  const resetTimeout = () => {
    clearTimeoutFunc();
    setTimeoutFunc();
  };
  const timeOut = () => {
    setIsSessionTimeout(true);
  };
  React.useEffect(() => {
    if (checkAuth) clearTimeoutFunc();
  }, [checkAuth]);
  React.useEffect(() => {
    moment.tz.setDefault('Asia/Dubai');
    axiosClient.getRequest(
      (request: any) => {
        if (request.url.includes('customer-users/login')) {
          setTimeoutFunc();
        }
        if (
          !request.url.includes('customer-users/login') &&
          localStorage.getItem('49f290d6e8459c53f31f97de37921086')
        ) {
          resetTimeout();
        }
        if (request.url.includes('customer-users/logout')) {
          clearTimeoutFunc();
        }
        return request;
      },
      (error: any) => Promise.reject(error),
    );
    // axiosClient.getResponse(
    //   (response: any) => {
    //     if (response?.config?.url?.includes('authorizer/login')) {
    //       setTimeoutFunc();
    //     }
    //     return response;
    //   },
    //   (error: any) => Promise.reject(error),
    // );
  }, []);
  React.useEffect(() => {
    if (isSessionTimeout) {
      Modal.warning({
        title: 'Session Timed Out',
        content: (
          <>
            Your session has timed out <br /> Please Log In to continue.
          </>
        ),
        width: '240',
        okText: 'Yes',
        icon: null,
        centered: true,
        className: 'session-time-out',
        onOk() {
          handleTimeout();
        },
      });
    }
  }, [isSessionTimeout]);
  return (
    <Spin spinning={loading} indicator={<AppSpinner />}>
      <div className="App">
        <Router
          getUserConfirmation={(message, callback) => {
            const flag = localStorage.getItem('Flag');
            if (flag) callback(false);
            else callback(true);
          }}
        >
          <Suspense fallback={<AppLoading loading></AppLoading>}>
            <Switch>
              {renderRoute()}
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </Router>
      </div>
      <Modal visible={visible} footer={null} title="Warning" closable={false}>
        <div>
          For the better user experience please use your mobile/tablet to submit your application
        </div>
      </Modal>
      ;
    </Spin>
  );
}
export default App;