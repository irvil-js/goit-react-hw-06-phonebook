import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import phonebookAction from '../../redux/phonebook/phonebook-actions';
import { getFilter } from '../../redux/phonebook/phonebook-selectors';

function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChange = event =>
    dispatch(phonebookAction.changeFilter(event.target.value));
  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
