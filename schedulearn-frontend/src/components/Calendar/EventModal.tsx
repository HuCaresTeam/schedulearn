import React from "react";
import Modal, { setAppElement } from "react-modal";
import "./EventModal.scss";

setAppElement("#root");

export interface EventModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  children: (isOpen: boolean) => React.ReactNode;
}

export class EventModal extends React.PureComponent<EventModalProps> {
  render(): JSX.Element {
    return (
      <Modal
        portalClassName="event-add-modal ReactModalPortal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Event modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{ content: { zIndex: 5 }, overlay: { zIndex: 4 } }}
      >
        {this.props.children(this.props.isOpen)}
      </Modal>
    );
  }
}
