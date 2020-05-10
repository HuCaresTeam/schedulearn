import React from "react";
import Modal, { setAppElement } from "react-modal";
import "./ItemInfoModel.scss";

setAppElement("#root");

export interface ItemInfoModalProps {
  isOpen: boolean;
  description: string;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  modalStyle: string;
}

export class ItemInfoModal extends React.PureComponent<ItemInfoModalProps> {
  render(): JSX.Element {
    return (
      <Modal
        portalClassName="item-info-modal ReactModalPortal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          content : {
            transform: this.props.modalStyle,
          },
        }}
      >
        <div>{this.props.description}</div>
      </Modal>
    );
  }
}
