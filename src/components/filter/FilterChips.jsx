import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import deleteIcon from '../../assets/x.png';

const FilterChips = () => {
  const [chips, setChips] = useState({});
  const { search } = useLocation();
  const navigate = useNavigate();

  const useQueryParams = () => {
    return new URLSearchParams(search);
  };

  const queryParams = useQueryParams();

  useEffect(() => {
    const queryObject = Object.fromEntries(queryParams.entries());
    const parsedChips = {};

    for (const key in queryObject) {
      try {
        const value = JSON.parse(queryObject[key]);
        parsedChips[key] = Array.isArray(value) ? value : value.split(',');
      } catch (e) {
        parsedChips[key] = queryObject[key].split(',');
      }
    }

    setChips(parsedChips);
  }, [search]);

  const handleRemoveChip = (key, chip) => {
    const updatedChips = { ...chips };
    updatedChips[key] = updatedChips[key].filter(item => item !== chip);

    if (updatedChips[key].length === 0) {
      delete updatedChips[key];
    }
    setChips(updatedChips);
    const updatedQueryParams = new URLSearchParams(search);
    if (updatedChips[key]) {
      updatedQueryParams.set(key, updatedChips[key].join(','));
    } else {
      updatedQueryParams.delete(key);
    }
    navigate(`?${updatedQueryParams.toString()}`);
  };

  const click = () => {
    navigate('');
  }

  return (
    <div className='flex items-center flex-wrap mt-2'>
      {Object.entries(chips).flatMap(([key, values]) =>
        values.map((chip, index) => (
          <div key={`${key}-${index}`} className='bg-white border border-[color:var(--gray-border)] rounded-full px-4 py-2 m-1 text-xs flex items-center'>
            {chip}
            <img
              className='w-4 h-4 ml-2 cursor-pointer'
              src={deleteIcon}
              alt="delete"
              onClick={() => handleRemoveChip(key, chip)}
            />
          </div>
        ))
      )}
      {Object.keys(chips).length > 0 && (
        <p onClick={click} className='ml-2'>გასუფთავება</p>
      )}
    </div>
  );
};

export default FilterChips;
