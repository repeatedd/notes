import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ListGroupItemText,
  ListGroupItemHeading,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getNote, deleteNote } from "../actions/notesActions";
import propTypes from "prop-types";

class NotesList extends Component {
  componentDidMount() {
    this.props.getNote();
  }
  onDeleteClick = (_id) => {
    this.props.deleteNote(_id);
  };
  render() {
    const { notes } = this.props.note;
    return (
      <Container
        className="notesLists"
        style={{
          paddingBottom: "2.3rem",
        }}
      >
        <ListGroup flush>
          <TransitionGroup className="notes-lists">
            {notes.map(({ _id, name, content }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <ListGroupItemHeading>{name}</ListGroupItemHeading>
                  <ListGroupItemText
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    {content}
                  </ListGroupItemText>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                    style={{
                      marginRight: "1rem",
                      // marginTop: "-3rem",
                      alignContent: "center",
                    }}
                  >
                    DELETE
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

NotesList.propTypes = {
  getNote: propTypes.func.isRequired,
  note: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  note: state.note,
});

export default connect(mapStateToProps, { getNote, deleteNote })(NotesList);
