import { Mutation/* , Action */ } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import settings from '@/config/settings';

export interface StateType {
  // 左侧展开收起
  collapsed: boolean;
  // 顶部菜单开启
  topNavEnable: boolean;
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType;
  mutations: {
    changeLayoutCollapsed: Mutation<StateType>;
    setTopNavEnable: Mutation<StateType>;
  };
  actions: {};
}

const initState: StateType = {
  collapsed: false,
  topNavEnable: settings.topNavEnable,
};

const StoreModel: ModuleType = {
  namespaced: true,
  name: 'global',
  state: {
    ...initState
  },
  mutations: {
    changeLayoutCollapsed(state, payload) {
      state.collapsed = payload;
    },
    setTopNavEnable(state, payload) {
      state.topNavEnable = payload;
    }
  },
  actions: {}
}


export default StoreModel;
