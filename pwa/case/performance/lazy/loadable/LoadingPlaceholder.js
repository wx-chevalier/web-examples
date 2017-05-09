// @flow

import React from "react";
type Props = {
  isLoading: boolean,
  error: Error | null,
  pastDelay: null
};
/**
 * @return {null}
 */
export const LoadingPlaceholder = ({ isLoading, error, pastDelay }: Props) => {
  if (isLoading) {
    return pastDelay ? <div>Loading...</div> : null; // Don't flash "Loading..." when we don't need to.
  } else if (error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return <div>aa</div>;
  }
};
