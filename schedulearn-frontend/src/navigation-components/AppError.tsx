
import React from "react";
import "./AppError.scss";

export interface AppErrorProps {
  currentError?: string;
}

export default class AppError extends React.Component<AppErrorProps> {
  render(): React.ReactNode {
    if (!this.props.currentError)
      return (<></>);

    return (
      <div className="error-container">
        {this.props.currentError}
      </div>
    );
  }
}