import React from "react";
import classNames from "classnames/bind";
import styles from "./flex.module.css";

let cx = classNames.bind(styles);

const Flex = ({ children, ...props }) => {
    const {
        center,
        hcenter,
        vcenter,
        column,
        w100,
        h100,
        end,
        gap,
        className,
        ...rest_props
    } = props

    const class_props = {
        center,
        hcenter,
        vcenter,
        column,
        w100,
        h100,
        end,
    }

  return (
    <div
      className={cx("container", className, {...class_props})}
      style={{ gap }}
      {...rest_props}
    >
      {children}
    </div>
  );
};

export default Flex;
