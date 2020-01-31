import {BasicLayout} from "../layout/BasicLayout";
import {Login} from "../view/user/Login";
import {ExceptionPage} from "../view/exception/404";
import {Register} from "../view/user/Register";
import {PostList} from "../view/post/PostList";
import authorize from "../utils/permission";

export const adminRouterConfig = [
  {
    path: "/",
    name: "Index",
    home: "/post",
    auth: authorize,
    redirect: "/login",
    component: BasicLayout,
    children: [
      {
        path: "/post",
        name: "PostList",
        component: PostList
      }
    ]
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
