import React from "react";
import Modal, { setAppElement } from "react-modal";
import "./ItemInfoModel.scss";

setAppElement("#root");

export interface ItemInfoModalProps {
  isOpen: boolean;
  description: string;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  posX: number;
  posY: number;
}

export class ItemInfoModal extends React.PureComponent<ItemInfoModalProps> {
  render(): JSX.Element {

    const offsetX = -370;
    const offsetY = -70;

    return (
      <Modal
        portalClassName="item-info-modal ReactModalPortal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          content: {
            transform: `translate3d(${this.props.posX + offsetX}px, ${this.props.posY + offsetY}px, 0px)`,
            zIndex: 7,
          },
          overlay: { zIndex: 6 },
        }}
      >
        <div>{this.props.description}</div>
      </Modal>
    );
  }
}
