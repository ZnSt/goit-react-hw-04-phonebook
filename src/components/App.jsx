import { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import { Form } from './Form';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      const contactsLocal = localStorage.getItem('contacts');
      if (contactsLocal && JSON.parse(contactsLocal).length) {
        setContacts(JSON.parse(contactsLocal));
      }
      isFirstRender.current = false;
      return;
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleFormSubmit = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevState => [newContact, ...prevState]);

    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
  };

  const deleteContacts = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleName = () => {
    const normilizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  const filterName = getVisibleName();
  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
      <ContactsList contacts={filterName} deleteContact={deleteContacts} />
      <Filter filterChange={filterChange} value={filter} />
    </div>
  );
};
