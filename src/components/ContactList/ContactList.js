import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import styles from './ContactList.module.css';
import phonebookAction from '../../redux/phonebook/phonebook-actions';
import { getVisibleContact } from '../../redux/phonebook/phonebook-selectors';

function ContactList() {
  const contacts = useSelector(getVisibleContact);
  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(phonebookAction.deleteContact(id));
  return (
    <ul className={styles.list}>
      {contacts.map(contact => {
        const { id, name, number } = contact;

        return (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
            id={id}
          />
        );
      })}
    </ul>
  );
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
