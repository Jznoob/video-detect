import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
            <h3 className="font-bold">组件加载失败</h3>
            <p>该组件渲染时发生错误，请检查浏览器控制台获取更多信息。</p>
            <p className="mt-2 text-xs">可能的原因是相关依赖 (如 react-heatmap-grid) 未能成功安装。</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 