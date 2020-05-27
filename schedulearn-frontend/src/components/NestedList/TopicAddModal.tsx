import React from "react";
import { TopicForm, TopicAddForm } from "./TopicAddForm";
import "./TopicAddModal.scss";
import { Modal } from "react-bootstrap";

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
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Topic Add Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TopicAddForm
            isOpen={this.props.isOpen}
            disabled={this.props.disabled}
            onEventSubmit={this.props.onEventSubmit}
            onRequestClose={this.props.onRequestClose}
            newTopic={this.props.topic}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
