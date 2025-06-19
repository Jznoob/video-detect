# 多媒体篡改检测系统前端

本项目为"多媒体篡改检测系统"前端，基于 React + TypeScript + Tailwind CSS（或 shadcn/ui），支持响应式布局，便于与 Django 后端联调。

## 目录结构说明

```
src/
├── assets/                # 静态资源（如 logo、图片、图标等）
├── components/            # 通用组件（Card、Tabs、Toast、Chart 等，可复用）
├── features/              # 各功能模块页面及其专属组件
│   ├── dashboard/         # 首页 Dashboard
│   │   └── components/    # Dashboard 专属组件
│   ├── video-detect/      # 视频检测页
│   │   └── components/    # 视频检测专属组件
│   ├── image-detect/      # 图片检测页
│   │   └── components/    # 图片检测专属组件
│   ├── result/            # 检测结果页
│   │   └── components/    # 结果页专属组件
│   ├── history/           # 检测历史页
│   │   └── components/    # 历史页专属组件
│   ├── model/             # 模型管理页
│   │   └── components/    # 模型管理专属组件
│   └── settings/          # 用户设置页
│       └── components/    # 设置页专属组件
├── hooks/                 # 自定义 React hooks（如 useDetectTask、useTheme 等）
├── layouts/               # 页面布局组件（如主布局、认证布局等）
├── routes/                # 路由配置文件
├── services/              # API 请求封装，与后端接口对接
├── store/                 # 全局状态管理（如 Zustand/Redux）
├── styles/                # 全局样式、Tailwind 配置等
├── utils/                 # 工具函数（如格式化、转换等）
```

## 其他说明
- 每个 features 下的 components 目录仅放该模块专属组件，通用组件请放在 src/components。
- 推荐使用 mock 数据开发，后续可在 services/ 目录下统一切换为后端接口。
- 支持深色模式，建议统一主色调（深蓝、灰紫）。
- 目录下的 `.keep` 文件仅用于保证空目录被 git 追踪，可安全删除。

---
如需开发具体页面或组件，请在对应目录下新建文件。 