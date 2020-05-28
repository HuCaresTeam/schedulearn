import React from "react";
import "./EventModal.scss";
import { Modal } from "react-bootstrap";

export interface EventModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  children: (isOpen: boolean) => React.ReactNode;
}

export class EventModal extends React.PureComponent<EventModalProps> {
  render(): JSX.Element {
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children(this.props.isOpen)}</Modal.Body>
      </Modal>
    );
  }
}
