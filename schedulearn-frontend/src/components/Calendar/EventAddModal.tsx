import React from "react";
import Modal, { setAppElement } from "react-modal";
import { LearningDayEvent } from "./LearningDayEvent";
import { EventAddForm } from "./EventAddForm";
import "./EventAddModal.scss";

setAppElement("#root");

export interface EventAddModalProps {
  isOpen: boolean;
  start?: Date;
  end?: Date;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onEventSubmit: (event: LearningDayEvent) => void;
}

export class EventAddModal extends React.PureComponent<EventAddModalProps> {
  render(): JSX.Element {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{ content: { zIndex: 5 }, overlay: { zIndex: 4 } }}

      >
        <EventAddForm
          isOpen={this.props.isOpen}
          onEventSubmit={this.props.onEventSubmit}
          start={this.props.start}
          end={this.props.end}
        />
      </Modal>
    );
  }
}
