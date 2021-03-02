import './validation-form.js';
import './get-data-form.js';
import './filter.js';
import {getData} from './generate-data.js';
import {initFilters} from './filter.js';

getData()
  .then(initFilters)
