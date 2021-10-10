import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import phonebookAction from '../../redux/phonebook/phonebook-actions';
import { getItems } from '../../redux/phonebook/phonebook-selectors';
import styles from './ContactForm.module.css';

function ContactForm() {
  const items = useSelector(getItems);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const repeatContact = name => {
    const repeatName = name.toLowerCase();
    return items.find(contact => contact.name === repeatName);
  };
  const addContact = () => dispatch(phonebookAction.addContact(name, number));

  const handleSubmit = event => {
    event.preventDefault();
    const repeat = repeatContact(name);
    if (name.length < 2) {
      toast.warn(
        `Текст должен быть не меньше 2 символов, сейчас ${name.length}`,
      );
      return;
    }

    if (number.length < 5) {
      toast.warn(
        `Номер должен быть не меньше 5 символов, сейчас ${number.length}`,
      );
      return;
    }

    repeat ? toast.error(`${name} уже существует!`) : addContact();

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          placeholder="Name contact"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="number"
          name="number"
          placeholder="Number contact"
          value={number}
          onChange={handleChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
