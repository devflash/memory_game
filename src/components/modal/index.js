import React, { useEffect } from 'react';
import './modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../store';

const Modal = ({ winner }) => {
  const showResult = useSelector((state) => state.showResult);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showResult) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showResult]);
  return (
    <div className={['modal', showResult && 'show'].join(' ')}>
      <div className="modal_box">
        <h3>Game Over</h3>
        <p>{winner} won!!!!</p>
        <button
          type="button"
          className="modal_btn"
          onClick={() => dispatch(toggleModal())}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
