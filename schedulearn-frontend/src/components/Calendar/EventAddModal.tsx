import React from "react";
import Modal, { setAppElement } from "react-modal";
import { EventAddForm, LearningDayEventInfo } from "./EventAddForm";
import "./EventAddModal.scss";
import AtLeast from "src/util-types/AtLeast";

setAppElement("#root");

export interface EventAddModalProps {
  isOpen: boolean;
  disabled: boolean;
  learningDayEvent?: AtLeast<LearningDayEventInfo, "userId">;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onEventSubmit: (event: LearningDayEventInfo) => void;
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
          disabled={this.props.disabled}
          onEventSubmit={this.props.onEventSubmit}
          learningDayEvent={this.props.learningDayEvent}
        />
      </Modal>
    );
  }
}
