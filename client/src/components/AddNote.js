import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addNote } from "../actions/notesActions";

class AddNote extends Component {
  state = {
    modal: false,
    name: "",
    content: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChangeName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      name: this.state.name,
      content: this.state.content,
    };

    this.props.addNote(newNote);

    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          color="warning"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Note
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>New Note</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {/* <Label for="item">Title</Label> */}
                <Input
                  type="text"
                  name="name"
                  id="id"
                  placeholder="Title"
                  className="mb-3"
                  onChange={this.onChangeName}
                />
                <Input
                  type="textarea"
                  content="content"
                  id="id"
                  placeholder="Content"
                  onChange={this.onChangeContent}
                  className="mb-3"
                />
                <div className="text-center">
                  <Button
                    color="success"
                    style={{
                      marginTop: "1rem",
                      alignContent: "center",
                      width: "25%",
                    }}
                    inline
                  >
                    Add
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  note: state.note,
});

export default connect(mapStateToProps, { addNote })(AddNote);
