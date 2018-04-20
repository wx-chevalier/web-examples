import React from "react";

const UIContext = React.createContext({
    theme:'dark'
});

export const { Consumer, Provider } = UIContext;

// 高阶函数
export default function withUIContext(Component) {
  // 返回另一个组件
  return function WithUIContextComponent(props) {
    // 添加额外的 Context Props
    return (
      <Consumer>{uiContext => <Component {...props} uiContext={uiContext} />}</Consumer>
    );
  };
}