import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
  return (
    <FontAwesomeIcon className="text-gray-700" icon={faSpinner} size="2x" spin />
  );
};

export default Spinner;
