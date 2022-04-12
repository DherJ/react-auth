import Papuche from '../img/papuche.png';
import Bouh from '../img/bouh.png';
import Neko from '../img/neko.png';

const images = {
    Papuche,
    Bouh,
    Neko
};

function getImageByKey(key) {
  return images[key]
}

export default getImageByKey;