import React from "react";
import Modal, { setAppElement } from "react-modal";
import { TopicAddForm, TopicForm } from "./TopicAddForm";
import "./TopicAddModal.scss";

setAppElement("#root");

export interface TopicAddModalProps {
  isOpen: boolean;
  disabled: boolean;
  topic?: TopicForm;
  onRequestClose: () => void;
  onEventSubmit: (topic: TopicForm) => void;
}

export class TopicAddModal extends React.PureComponent<TopicAddModalProps> {
  render(): JSX.Element {
    return (
      <Modal
        portalClassName="topic-add-modal ReactModalPortal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Topic Add Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{ content: { zIndex: 5 }, overlay: { zIndex: 4 } }}
      >
        <TopicAddForm
          isOpen={this.props.isOpen}
          disabled={this.props.disabled}
          onEventSubmit={this.props.onEventSubmit}
          onRequestClose={this.props.onRequestClose}
          newTopic={this.props.topic}
        />
      </Modal>
    );
  }
}
