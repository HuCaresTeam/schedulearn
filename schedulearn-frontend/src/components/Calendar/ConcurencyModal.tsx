import React from "react";
import Modal, { setAppElement } from "react-modal";
import "./EventModal.scss";

setAppElement("#root");

export interface ConcurencyModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  children: (isOpen: boolean) => React.ReactNode;
}

export class ConcurencyModal extends React.PureComponent<ConcurencyModalProps> {
  render(): JSX.Element {
    return (
      <Modal
        portalClassName="event-add-modal ReactModalPortal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Event modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{ content: { zIndex: 8 }, overlay: { zIndex: 7 } }}
      >
        {this.props.children(this.props.isOpen)}
      </Modal>
    );
  }
}
