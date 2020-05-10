import React from "react";
import Modal, { setAppElement } from "react-modal";
import { EventAddForm, LearningDayEvent } from "./EventAddForm";
import "./EventAddModal.scss";
import AtLeast from "src/util-types/AtLeast";

setAppElement("#root");

export interface EventAddModalProps {
  isOpen: boolean;
  disabled: boolean;
  learningDayEvent?: AtLeast<LearningDayEvent, "userId">;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onEventSubmit: (event: LearningDayEvent) => void;
}

export class EventAddModal extends React.PureComponent<EventAddModalProps> {
  render(): JSX.Element {
    return (
      <Modal
        portalClassName="event-add-modal ReactModalPortal"
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
