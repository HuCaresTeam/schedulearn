import React from "react";
import { Modal } from "react-bootstrap";

export interface CustomModalProps {
  isOpen: boolean;
  title: string;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  children: (isOpen: boolean) => React.ReactNode;
}

export class CustomModal extends React.PureComponent<CustomModalProps> {
  render(): JSX.Element {
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children(this.props.isOpen)}</Modal.Body>
      </Modal>
    );
  }
}
