/**
 * 路由入口
 * @author jisen
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { RoutesDataItem } from "@/utils/routes";

const SecurityLayout = () => import('@/layouts/SecurityLayout.vue');

const UserLayout = () => import('@/layouts/UserLayout/index.vue');

const BasicLayout = () => import('@/layouts/BasicLayout/index.vue');

const BlankLayout = () => import('@/layouts/BlankLayout.vue');

export const UserLayoutRoutes: Array<RoutesDataItem> = [
  {
    title: 'user-layout.menu.login',
    path: 'login',
    component: () => import('@/views/user/login/index.vue'),
  },
  {
    title: 'user-layout.menu.register',
    path: 'register',
    component: () => import('@/views/user/register/index.vue'),
  }
];

export const MenuList: Array<RoutesDataItem> = [
  {
    icon: 'icon-home',
    title: 'menu.home',
    path: '/home',
    redirect: '/home/workplace',
    component: BlankLayout,
    children: [
      {
        icon: 'icon-file',
        title: 'menu.home.workplace',
        path: 'workplace',
        component: () => import('@/views/home/index.vue')
      },
      {
        icon: 'icon-file',
        title: 'menu.home.demo',
        path: 'demo',
        component: () => import('@/views/demo/index.vue'),
        // 自定义面包屑
        breadcrumb: [
          {
            title: 'menu.home.demo',
            path: '/home/demo',
          },
          {
            title: 'menu.home',
            path: '/home',
          },
          {
            title: 'menu.home.demo',
            path: '/home',
          },
        ],
      },
    ],
  },

  {
    icon: 'icon-file',
    title: 'menu.pages',
    path: '/sample',
    redirect: '/sample/list/table',
    component: BlankLayout,
    children: [
      {
        icon: 'icon-file',
        title: 'menu.pages.list',
        path: 'list',
        redirect: '/sample/list/table',
        component: BlankLayout,
        children: [
          {
            title: 'menu.pages.list.table',
            path: 'table',
            component: () => import('@/views/sample/list/table/index.vue'),
          },
          {
            title: 'menu.pages.list.highly-adaptive-table',
            path: 'highlyadaptivetable',
            component: () => import('@/views/sample/list/highly-adaptive-table/index.vue'),
          },
          {
            title: 'menu.pages.list.search',
            path: 'search',
            redirect: '/sample/list/search/table',
            component: BlankLayout,
            children: [
              {
                title: 'menu.pages.list.search.table',
                path: 'table',
                component: () => import('@/views/sample/list/search/table/index.vue'),
              }
            ],
          },
        ],
      },
      {
        icon: 'icon-file',
        title: 'menu.pages.form',
        path: 'form',
        redirect: '/sample/form/basic',
        component: BlankLayout,
        children: [
          {
            title: 'menu.pages.form.basic',
            path: 'basic',
            component: () => import('@/views/sample/form/basic/index.vue'),
          },
          {
            title: 'menu.pages.form.complex',
            path: 'complex',
            component: () => import('@/views/sample/form/complex/index.vue'),
          },
        ],
      },
      {
        icon: 'icon-file',
        title: 'menu.pages.detail',
        path: 'detail',
        redirect: '/sample/detail/basic',
        component: BlankLayout,
        children: [
          {
            title: 'menu.pages.detail.basic',
            path: 'basic',
            component: () => import('@/views/sample/detail/basic/index.vue'),
          },
          {
            title: 'menu.pages.detail.module',
            path: 'module',
            component: () => import('@/views/sample/detail/module/index.vue'),
          },
          {
            title: 'menu.pages.detail.table',
            path: 'table',
            component: () => import('@/views/sample/detail/table/index.vue'),
          },
        ],
      },
    ],
  },
  {
    icon: 'icon-file',
    title: 'menu.roles',
    path: '/roles',
    redirect: '/roles/all',
    component: BlankLayout,
    children: [
      {
        icon: 'icon-file',
        title: 'menu.roles.all',
        path: 'all',
        component: () => import('@/views/roles/all/index.vue'),
      },
      {
        icon: 'icon-file',
        roles: ['user'],
        title: 'menu.roles.user',
        path: 'user',
        component: () => import('@/views/roles/user/index.vue'),
      },
      {
        icon: 'icon-file',
        roles: ['test'],
        title: 'menu.roles.test',
        path: 'test',
        component: () => import('@/views/roles/test/index.vue'),
      },
    ],
  },

];

const routes: Array<RoutesDataItem> = [
  {
    title: 'empty',
    path: '/',
    component: SecurityLayout,
    children: [
      {
        title: 'empty',
        path: '/',
        redirect: '/home/workplace',
        component: BasicLayout,
        children: MenuList
      },
    ]
  },
  {
    title: 'empty',
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: UserLayoutRoutes
  },
  {
    title: 'app.global.menu.notfound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404/index.vue'),
  }
]

const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 }
  },
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes as any,
});

export default router;
