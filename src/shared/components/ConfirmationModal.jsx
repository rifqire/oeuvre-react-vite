import React from "react";
import { Modal, Button } from "flowbite-react";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConfirmationModal({
  show,
  onClose,
  text,
  leftClick,
  rightClick,
  onLeftClick,
  onRightClick,
  isHidden,
}) {
  return (
    <Modal show={show} size="sm" onClose={onClose} popup className="p-0 m-auto bg-gray-700 bg-opacity-60">
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <FontAwesomeIcon
            icon={faWarning}
            size="5x"
            className="mb-3 text-gray-500"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            {text}
          </h3>
          <div className={`flex justify-center gap-4 ${isHidden === true ? "hidden" : ""}`}>
            <Button color="gray" onClick={onLeftClick}>
              {leftClick}
            </Button>
            <Button color="blue" onClick={onRightClick}>
              {rightClick}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
