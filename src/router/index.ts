import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/home.page.vue";
import LoginPage from "../views/login.page.vue";
import NotificationsPage from "../views/notifications.page.vue";
import ProfilePage from "../views/profile.page.vue";

//Onboarding
import PersonalDetailsPage from "../views/onboarding/personal-details.page.vue";
import DemographicsPage from "../views/onboarding/demographics.page.vue";
import CreatePasswordPage from "../views/onboarding/create-password.page.vue";
import VerifyEmailAddressPage from "../views/onboarding/verify-email-address.page.vue";
import VerifyCellNumberPage from "../views/onboarding/verify-cell-number.page.vue";
import PickFavouriteTopicsPage from "../views/onboarding/pick-favourite-topics.page.vue";
import AgreementPage from "../views/onboarding/agreement.page.vue";

//Reset Password
import ConfirmUsernamePage from "../views/resetPassword/confirm-username.page.vue";
import ResetPasswordPage from "../views/resetPassword/reset-password.page.vue";

//Tasks
import ViewAllTasksPage from "../views/tasks/view-all-tasks.page.vue";
import ViewTaskPage from "../views/tasks/view-task.page.vue";
import TaskCompletePage from "../views/tasks/task-complete.page.vue";
// User Task Pages
import ViewAllUserTasksPage from "../views/tasks/user-tasks/view-all-user-tasks.page.vue";
import ViewUserTaskPage from "../views/tasks/user-tasks/view-user-task.page.vue";

//Courses
import ViewAllCoursesPage from "../views/courses/view-all-courses.page.vue";
import ViewCoursePage from "../views/courses/view-course.page.vue";
import CourseCompletePage from "../views/courses/course-complete.page.vue";
// User Courses Pages
import ViewAllUserCoursesPage from "../views/courses/user-courses/view-all-user-courses.page.vue";
import ViewUserCoursePage from "../views/courses/user-courses/view-user-course.page.vue";

//Surveys
import ViewAllSurveysPage from "../views/surveys/view-all-surveys.page.vue";
import ViewSurveyPage from "../views/surveys/view-survey.page.vue";
import SurveyCompletePage from "../views/surveys/survey-complete.page.vue";
// User Surveys Pages
import ViewAllUserSurveysPage from "../views/surveys/user-surveys/view-all-user-surveys.page.vue";
import ViewUserSurveyPage from "../views/surveys/user-surveys/view-user-survey.page.vue";

//Store Pages
import ViewStoreDirectoryPage from "../views/store/view-store-directory.page.vue";
import ViewStoreItemsPage from "../views/store/view-store-items.page.vue";
import ViewItemPage from "../views/store/view-item.page.vue";

//Wallet
import UserWalletPage from "../views/wallet/user-wallet.page.vue";
//User Vouchers Pages
import ViewAllUserVouchersPage from "../views/wallet/vouchers/view-all-user-vouchers.page.vue";
import ViewVoucherPage from "../views/wallet/vouchers/view-voucher.page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "Home",
      component: HomePage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/notifications",
      name: "Notifications",
      component: NotificationsPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfilePage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/",
      name: "Login",
      component: LoginPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/confirm-username",
      name: "ConfirmUsername",
      component: ConfirmUsernamePage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPasswordPage,
      meta: {
        layout: "onboarding",
      },
    },
    //Onboarding Views
    {
      path: "/personal-details",
      name: "PersonalDetails",
      component: PersonalDetailsPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/demographics",
      name: "Demographics",
      component: DemographicsPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/create-password",
      name: "CreatePassword",
      component: CreatePasswordPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/verify-email-address",
      name: "VerifyEmailAddress",
      component: VerifyEmailAddressPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/verify-cell-number",
      name: "VerifyCellNumber",
      component: VerifyCellNumberPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/pick-favourite-topics",
      name: "PickFavouriteTopics",
      component: PickFavouriteTopicsPage,
      meta: {
        layout: "onboarding",
      },
    },
    {
      path: "/agreement",
      name: "Agreement",
      component: AgreementPage,
      meta: {
        layout: "onboarding",
      },
    },
    // Tasks
    {
      path: "/view-all-tasks",
      name: "ViewAllTasks",
      component: ViewAllTasksPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-all-user-tasks",
      name: "ViewAllUserTasks",
      component: ViewAllUserTasksPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-task/:id",
      name: "ViewTask",
      component: ViewTaskPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-user-task/:taskID/:transactionID",
      name: "ViewUserTask",
      component: ViewUserTaskPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/task-complete",
      name: "TaskComplete",
      component: TaskCompletePage,
      meta: {
        layout: "default",
      },
    },
    // Courses
    {
      path: "/view-all-courses",
      name: "ViewAllCourses",
      component: ViewAllCoursesPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-all-user-courses",
      name: "ViewAllUserCourses",
      component: ViewAllCoursesPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-course/:id",
      name: "ViewCourse",
      component: ViewCoursePage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-user-course/:id",
      name: "ViewUserCourse",
      component: ViewUserCoursePage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/course-complete",
      name: "CourseComplete",
      component: CourseCompletePage,
      meta: {
        layout: "default",
      },
    },
    // Surveys
    {
      path: "/view-all-surveys",
      name: "ViewAllSurveys",
      component: ViewAllSurveysPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-all-user-surveys",
      name: "ViewAllUserSurveys",
      component: ViewAllUserSurveysPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-survey/:id",
      name: "ViewSurvey",
      component: ViewSurveyPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-user-survey/:id",
      name: "ViewUserSurvey",
      component: ViewUserSurveyPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/survey-complete",
      name: "SurveyComplete",
      component: SurveyCompletePage,
      meta: {
        layout: "default",
      },
    },
    //Store Views
    {
      path: "/view-store-directory",
      name: "ViewStoreDirectory",
      component: ViewStoreDirectoryPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-store-items/:store_id/:store_name",
      name: "ViewStoreItems",
      component: ViewStoreItemsPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/view-item/:item_id/:store_id/:store_name/:store_cat_id",
      name: "ViewItem",
      component: ViewItemPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
    //Wallet
    {
      path: "/user-wallet",
      name: "UserWallet",
      component: UserWalletPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/user-wallet/view-all-user-vouchers",
      name: "ViewAllUserVouchers",
      component: ViewAllUserVouchersPage,
      meta: {
        layout: "default",
      },
    },
    {
      path: "/user-wallet/view-voucher/:voucher_id",
      name: "ViewVoucher",
      component: ViewVoucherPage,
      props: true,
      meta: {
        layout: "default",
      },
    },
  ],
});

export default router;
