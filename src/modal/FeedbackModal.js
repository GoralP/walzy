import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
import { feedback } from "../redux/actions";
import { useDispatch } from "react-redux";

const FeedbackModal = ({ modalFeedback, setModalFeedback, toggleFeedback }) => {
  const dispatch = useDispatch();
  const [formData, updateFormData] = useState("");
  const [update, setUpdate] = useState("");

  // const handleChange = (e) => {
  //   updateFormData(
  //     { ...formData, [e.target.name]: e.target.value.trim() },
  //     function () {
  //       console.log(formData);
  //     }
  //   );

  //   console.log("btn", formData);
  //   dispatch(feedback(formData));
  // };

  const handleChange = (e) => {
    let newEdit = { ...formData };
    newEdit.flag_type = e.target.value;
    updateFormData(newEdit);
    dispatch(feedback(newEdit));
    toggleFeedback();
  };

  return (
    <div>
      <Modal isOpen={modalFeedback}>
        <ModalHeader toggle={toggleFeedback} className="que-modal">
          Report
        </ModalHeader>

        <ModalBody>
          <div>
            <Button
              className="fd-btn"
              name="flag_type"
              value="Sexually explicit"
              onClick={handleChange}
            >
              Sexually explicit
            </Button>
          </div>

          <div>
            <Button
              className="fd-btn"
              name="flag_type"
              value="Offensive"
              onClick={handleChange}
            >
              Offensive
            </Button>
          </div>
          <div>
            <Button
              className="fd-btn"
              name="flag_type"
              value="Bad Quality"
              onClick={handleChange}
            >
              Bad Quality
            </Button>
          </div>
          <div>
            <Button
              className="fd-btn"
              name="flag_type"
              value="Copyrighted"
              onClick={handleChange}
            >
              Copyrighted
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
