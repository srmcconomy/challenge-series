// @flow

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type Props = {
  header: any,
  body: any,
};

export default function ItemChecklist(props: Props) {
  return (
    <div className="EnemyChecklist">
      <ReactCSSTransitionGroup
        key="transition"
        component="div"
        transitionName="transition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {props.header ? React.cloneElement(props.header, {
          key: props.location.pathname,
        }) : null}
      </ReactCSSTransitionGroup>
      <div className="body">
        {props.body}
      </div>
    </div>
  );
}
