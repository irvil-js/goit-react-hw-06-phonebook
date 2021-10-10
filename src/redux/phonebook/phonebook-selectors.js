export const getItems = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const getVisibleContact = state => {
  const contacts = getItems(state);
  const filter = getFilter(state);

  const normalizeFilter = filter.toLowerCase();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter),
  );
};
