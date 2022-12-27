// @flow

import React from "react";

type Props = {
  isLoading: boolean,
  error: Error | null,
  pastDelay: null
};

/**
 * Description 异步加载指示符
 * @return {null}
 */
export const LoadingPlaceholder = ({ isLoading, error, pastDelay }: Props) => {
  if (isLoading) {
    return pastDelay ? <div>加载中。。。</div> : null; // Don't flash "Loading..." when we don't need to.
  } else if (error) {
    return <div>加载失败！</div>;
  } else {
    return <div>aa</div>;
  }
};
