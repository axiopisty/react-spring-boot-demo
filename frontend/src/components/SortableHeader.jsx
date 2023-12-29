import {useEffect, useState} from 'react';

const SortableHeader = ({id, sortConfig, setSortConfig}) => {

  const [cssClass, setCssClass] = useState('');
  useEffect(() => {
    if (sortConfig === null) {
      setCssClass('');
    } else if (sortConfig.id === id) {
      setCssClass(`sorted ${sortConfig.direction}`);
    } else {
      setCssClass('');
    }
  }, [sortConfig]);

  const [direction, setDirection] = useState('desc');
  const clickHandler = () => {
    if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection('desc');
    }
    setSortConfig({id, direction});
  };

  return (
    <th className={`sort-header ${cssClass}`} onClick={clickHandler}>{id}</th>
  );
};

export default SortableHeader;