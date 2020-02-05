import {BasicLayout} from "../layout/BasicLayout";
import {Login} from "../view/user/Login";
import {ExceptionPage} from "../view/exception/404";
import {Register} from "../view/user/Register";
import {PostList} from "../view/post/PostList";
import AdminLayout from "../layout/AdminLayout";
import {PublishPage} from "../view/post/PublishPage";

export const adminRouterConfig = [
  {
    path: "/post",
    name: "PostList",
    layout: AdminLayout,
    component: PostList
  },
  {
    path: "/publish",
    name: "PublishPage",
    layout: AdminLayout,
    component: PublishPage
  }
]


export const publicRouterConfig = [
  {
    path: "/login",
    name: "Login",
    layout: BasicLayout,
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    layout: BasicLayout,
    component: Register
  },
  {
    path: "/404",
    name: "NotFound",
    layout: BasicLayout,
    component: ExceptionPage
  }
]

export const whitePaths = publicRouterConfig.map(route => route.path)
