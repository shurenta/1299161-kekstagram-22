import './validation-form.js';
import './get-data-form.js';
import './filter.js';
import {getData} from './generate-data.js';
import {initFilters} from './filter.js';
import {fillPhotos} from './photo-preview.js';
import {generateModalPhoto} from './modal-photo.js';
const photosPromise = getData()
photosPromise.then(fillPhotos)
photosPromise.then(generateModalPhoto)
photosPromise.then(initFilters)
