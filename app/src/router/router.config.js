import React from "react"

import BasicLayout from "../layout/BasicLayout";
import AdminLayout from "../layout/AdminLayout";


const PostList = React.lazy(() => import("../view/post/PostList"))
const PublishPage = React.lazy(() => import("../view/post/PublishPage"))
const Modify = React.lazy(() => import("../view/user/Modify"))
const InformationPage = React.lazy(() => import("../view/user/InformationPage"))
const MyPostList = React.lazy(() => import("../view/post/MyPostList"))
const MyFavoriteList = React.lazy(() => import("../view/post/MyFavoriteList"))


const Login = React.lazy(() => import("../view/user/Login"))
const Register = React.lazy(() => import("../view/user/Register"))
const ExceptionPage = React.lazy(() => import("../view/exception/404"))
const Management = React.lazy(() => import("../view/manager/Management"))


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
  {
    path: "/modify",
    name: "ModifyPage",
    layout: AdminLayout,
    component: Modify
  },
  {
    path: "/information",
    name: "InformationPage",
    layout: AdminLayout,
    component: InformationPage
  },
  {
    path: "/myPosts",
    name: "MyPostList",
    layout: AdminLayout,
    component: MyPostList
  },
  {
    path: "/myFavorite",
    name: "MyFavorite",
    layout: AdminLayout,
    component: MyFavoriteList
  },
]

export const managerRouterConfig = [
  {
    path:"/management",
      name:"Management",
    layout:AdminLayout,
    component: Management
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
