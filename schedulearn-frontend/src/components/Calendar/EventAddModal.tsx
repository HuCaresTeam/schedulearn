import React from 'react';
import Modal, { setAppElement } from 'react-modal';
import { LearningDayEvent } from './LearningDayEvent';

setAppElement('#root');

export interface EventAddModalProps {
  isOpen: boolean;
  start?: Date;
  end?: Date;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onEventSubmit: (event: LearningDayEvent) => void;
}

export interface EventAddModalState {
  title: string;
}

export class EventAddModal extends React.Component<EventAddModalProps, EventAddModalState> {
  public state: EventAddModalState = {
    title: '',
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onEventSubmit(
      {
        start: this.props.start || new Date(Date.now()),
        end: this.props.end || new Date(Date.now()),
        title: this.state.title,
        learningDayId: 0,
      });
  }

  onTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: event.target.value });
  }

  render(): JSX.Element {

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.title} onChange={this.onTitleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    );
  }
}
