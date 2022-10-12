import React from "react";
import routeConstant from "../../constants/route-constant";
const LandingPage = React.lazy(() => import("../landing-page"));
const LoginPage = React.lazy(() => import("../login-page"));
const OTPConfirm = React.lazy(() => import("../login-page/OTPConfirm"));
const HomePage = React.lazy(() => import("../home"));
const AnswerQuestionPL = React.lazy(() =>
  import("../features/answer-question-pl/answer-question-pl")
);
const SelectCvpPage = React.lazy(() =>
  import("../features/select-cvp/select-cvp")
);
const Dashboard = React.lazy(() => import("../dashboard"));
const Profile = React.lazy(() => import("../features/profile"));
const ListOffer = React.lazy(() => import("../features/list-offer/list-offer"));
const OfferDetail = React.lazy(() => import("../features/offer-detail"));
const ApplicationHistory = React.lazy(() =>
  import("../../container/features/application-history/application-history")
);
const AdditionalInfo = React.lazy(() => import("../features/additional-info/"));
const ApplicationStatus = React.lazy(() =>
  import("../features/application-status")
);
const Application = React.lazy(() => import("../features/application"));
const Terminate = React.lazy(() => import("../features/terminate"));
const BankRequestInfo = React.lazy(() =>
  import("../features/bank-request-info/bank-request-info")
);
const WaitingBank = React.lazy(() =>
  import("../features/waiting-bank/waiting-bank")
);
const ApplicationSubmitted = React.lazy(() =>
  import("../features/application-submitted")
);
const UpdateProfile = React.lazy(() =>
  import("../features/profile/components/UpdateProfile")
);
const OTPUpdateConfirm = React.lazy(() =>
  import("../features/profile/components/OTPUpdateConfirm")
);
const routes = [
  {
    path: routeConstant.LANDING,
    isPrivate: false,
    component: LandingPage,
    exact: true,
  },
  {
    path: routeConstant.LANDING + "promo/:id?",
    isPrivate: false,
    component: LandingPage,
    exact: true,
  },
  {
    path: routeConstant.LOGIN,
    isPrivate: false,
    component: LoginPage,
    exact: true,
  },
  {
    path: routeConstant.HOME,
    isPrivate: false,
    component: HomePage,
    exact: true,
  },
  {
    path: routeConstant.ANSWER_QUESTION_PL,
    isPrivate: false,
    component: AnswerQuestionPL,
    exact: false,
  },
  {
    path: routeConstant.SELECTCVP,
    isPrivate: false,
    component: SelectCvpPage,
    exact: false,
  },
  {
    path: routeConstant.OTPConfirm,
    isPrivate: false,
    component: OTPConfirm,
    exact: false,
  },
  {
    path: routeConstant.DASHBOARD,
    isPrivate: true,
    component: Dashboard,
    exact: false,
  },
  {
    path: routeConstant.PROFILE,
    isPrivate: true,
    component: Profile,
    exact: false,
  },
  {
    path: routeConstant.LIST_OFFER,
    // isFullPage: true,
    isPrivate: false,
    component: ListOffer,
    exact: true,
  },
  {
    path: routeConstant.OFFER_DETAIL,
    // isFullPage: true,
    isPrivate: false,
    component: OfferDetail,
    exact: true,
  },
  {
    path: routeConstant.HISTORY,
    // isFullPage: true,
    isPrivate: true,
    component: ApplicationHistory,
    exact: false,
  },
  {
    path: routeConstant.ADDITIONAL_INFO,
    // isFullPage: true,
    isPrivate: false,
    component: AdditionalInfo,
    exact: false,
  },
  {
    path: routeConstant.APPLICATION_STATUS,
    isPrivate: false,
    component: ApplicationStatus,
    exact: false,
  },
  {
    path: routeConstant.APPLICATION,
    // isFullPage: true,
    isPrivate: false,
    component: Application,
    exact: false,
  },
  {
    path: routeConstant.TERMINATE,
    // isFullPage: true,
    isPrivate: false,
    component: Terminate,
    exact: false,
  },
  {
    path: routeConstant.BANK_REQUEST_INFO,
    // isFullPage: true,
    isPrivate: false,
    component: BankRequestInfo,
    exact: false,
  },
  {
    path: routeConstant.WAITING_BANK,
    // isFullPage: true,
    isPrivate: false,
    component: WaitingBank,
    exact: false,
  },
  {
    path: routeConstant.APPLICATION_SUBMITTED,
    // isFullPage: true,
    isPrivate: false,
    component: ApplicationSubmitted,
    exact: false,
  },
  {
    path: routeConstant.UPDATE_PROFILE,
    // isFullPage: true,
    isPrivate: false,
    component: UpdateProfile,
    exact: false,
  },
  {
    path: routeConstant.OTP_UPDATE_CONFIRM,
    // isFullPage: true,
    isPrivate: false,
    component: OTPUpdateConfirm,
    exact: false,
  },
];
export default routes;
