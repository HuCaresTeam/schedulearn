
import React from "react";
import { Link, LinkProps } from "react-router-dom";
import "./AppNav.scss";
import { LocationState } from "history";

export interface NavItemProps<T> extends LinkProps<T> {
  liClassName?: string;
}

export default class NavItem<T = LocationState> extends React.Component<NavItemProps<T>> {

  render(): React.ReactNode {
    const { liClassName, ...props } = { ...this.props };
    return (
      <li className={liClassName}>
        <Link {...props} />
      </li>
    );
  }
}