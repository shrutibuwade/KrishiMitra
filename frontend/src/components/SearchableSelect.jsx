import React, { useState, useRef, useEffect } from 'react';
import '../styles/SearchableSelect.css';

function SearchableSelect({ label, options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({
      target: {
        name: label.toLowerCase(),
        value: option
      }
    });
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="searchable-select" ref={selectRef}>
      <label>{label}</label>
      <div className="select-wrapper">
        <input
          type="text"
          className="select-input"
          placeholder={value || placeholder}
          value={isOpen ? searchTerm : value}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
        />
        <span className="dropdown-icon">▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className={`dropdown-item ${value === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="dropdown-item disabled">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
