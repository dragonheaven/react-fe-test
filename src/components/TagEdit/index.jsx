import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { updateReport } from '../../state/features/reports/action';
import { stringToColour } from '../../utils';

const TagEdit = ({ name, tags, id, className }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(tags ? tags.join(',') : '');
  }, [tags, isEditing]);

  const handleChange = () => {
    dispatch(updateReport(id, { [name]: value.split(',') }));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className={clsx("group text-sm flex items-center relative h-8 pr-6", className)}>
        <div className="flex flex-wrap w-80">
          {
            tags && tags.map((tag, index) => (
              <div
                key={index}
                className="rounded-full bg-primary text-white py-1 px-4 mr-2 my-1 cursor-pointer"
                style={{
                  background: stringToColour(tag),
                }}
              >
                {tag}
              </div>
            ))
          }
        </div>
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
      <input
        className="border rounded-md px-4 py-1 outline-none"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="border rounded-md px-3 py-1 outline-none mx-2" onClick={handleChange}>
        <FontAwesomeIcon icon={faSave} className="text-green-400" />
      </button>
      <button className="border rounded-md px-3 py-1 outline-none" onClick={() => setIsEditing(false)}>
        <FontAwesomeIcon icon={faTimes} className="text-red-400" />
      </button>
    </div>
  );
};

TagEdit.propTypes = {
  tags: PropTypes.array,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TagEdit.defaultProps = {
  className: '',
  tags: [],
};

export default TagEdit;
