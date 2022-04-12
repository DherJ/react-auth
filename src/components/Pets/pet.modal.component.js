import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';

import { Trans } from 'react-i18next';
import '../../i18n.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeight } from '@fortawesome/free-solid-svg-icons';

import Loader from '../Loader/loader.component';

import PetsService from "../../services/pets.service";

import './pets.modal.component.scss';
import getImageByKey from '../../utils/image-utils';


const PetModal = (props) => {

  const show = props.show;
  const handleClose = props.handleClose;
  const pet = props.pet;

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <button type="button" className="close" onClick={handleClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>            
            <div className="icon"></div>
            <h3 className="title">
                <span>{pet.name}</span>
            </h3>
            <p className="description"> Woohoo, you're reading this text in a modal! </p>
            <button className="subscribe"><Trans i18nKey="input.save"/></button>
        </Modal.Body>
    </Modal>
  );
    }

export default PetModal;