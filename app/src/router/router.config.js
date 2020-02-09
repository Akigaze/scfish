import React from "react"

import BasicLayout from "../layout/BasicLayout";
import AdminLayout from "../layout/AdminLayout";


const PostList = React.lazy(() => import("../view/post/PostList"))
const PublishPage = React.lazy(() => import("../view/post/PublishPage"))

const Login = React.lazy(() => import("../view/user/Login"))
const Register = React.lazy(() => import("../view/user/Register"))
const ExceptionPage = React.lazy(() => import("../view/exception/404"))

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
  },
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
