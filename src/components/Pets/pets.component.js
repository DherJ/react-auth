import React, { useState, useEffect } from "react";
import { Trans } from 'react-i18next';
import '../../i18n.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeight } from '@fortawesome/free-solid-svg-icons';

import Loader from '../Loader/loader.component';
import PetModal from './pet.modal.component';

import PetsService from "../../services/pets.service";


import getImageByKey from '../../utils/image-utils';


const PetsList = (props) => {
  const [selectedPet, setSelectedPet] = useState([]);
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
      retrievePets();
  }, []);

  const retrievePets = () => {
    setIsLoading(true);
    PetsService.getAllPets()
        .then((response) => {
            setPets(response.data);
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
            setIsLoading(false);
        });
};

const handleShow = (pet) => {
  setSelectedPet(pet);
  setShow(true);
}

return (

      <div className="container">
          <header className="jumbotron">
            <h1>
              <Trans i18nKey="pets.title"/>
            </h1>
          </header>
          {isLoading && (<Loader />)}
         
      <div className="flex">
          {pets.map((pet) => {
            return <div className="col" key={pet.id}>
                
              <img className="thumb" src={getImageByKey(pet.name)} width="200" height="200" alt="Some sample words"/>

              <div className="content">
                <h5>{pet.name}</h5>
                <p>{pet.description}</p>
                <span><Trans i18nKey="pets.additionalFood"/></span>
                        <ul>{pet.foodPreference.map((food) => {
                              return <li>{food.description}</li>
                            })}
                        </ul>
                <div className="footer">
                  <div className="infos">
                    <span><FontAwesomeIcon icon={faWeight}/> {pet.weight}Kg</span>
                  </div>  
                  <div className="actions">
                    <button className="btn-primary nextButton" onClick={() => handleShow(pet)} data-toggle="modal"><Trans i18nKey="pets.detailsButton"/></button>
                  </div>
                </div>
              </div>
            </div>
          })}
			</div>
      <PetModal pet={selectedPet} show={showModal} handleClose={handleClose}/>
</div>
);
}

export default PetsList;