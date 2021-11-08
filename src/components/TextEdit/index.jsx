import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { updateReport, updateSocial } from '../../state/features/reports/action';

const TextEdit = ({ name, text, id, multiline, className, type }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(text);
  }, [text, isEditing]);

  const handleChange = () => {
    if (name === 'views' || name === 'stars') {
      dispatch(updateSocial(id, { [name]: value }));
    } else {
      dispatch(updateReport(id, { [name]: value }));
    }
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className={clsx("group text-sm flex items-center relative h-8 pr-6", className)}>
        <span>{text}</span>
        <FontAwesomeIcon
          icon={faPen}
          className="hidden absolute right-2 top-1/2 -translate-y-2/4 group-hover:block text-gray-700 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-start">
      {
        multiline ? (
          <textarea
            className="border rounded-md px-4 py-1 flex-grow appearance-none outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <input
            className={clsx("border rounded-md px-4 py-1 outline-none", type === 'number' ? 'w-24' : 'w-40')}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )
      }
      <button className="border rounded-md px-3 py-1 outline-none mx-2" onClick={handleChange}>
        <FontAwesomeIcon icon={faSave} className="text-green-400" />
      </button>
      <button className="border rounded-md px-3 py-1 outline-none" onClick={() => setIsEditing(false)}>
        <FontAwesomeIcon icon={faTimes} className="text-red-400" />
      </button>
    </div>
  );
};

TextEdit.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  className: PropTypes.string,
};

TextEdit.defaultProps = {
  multiline: false,
  className: '',
  type: 'text',
  text: '',
};

export default TextEdit;
