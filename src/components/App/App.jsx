import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import initialContacts from '../../data/contacts.json';

import { Form } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container } from '../Container/Container';

import { Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = (name, number) => {
    const AddedContact = {
      id: uuidv4(),
      name,
      number,
    };

    const isDoubleContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isDoubleContact) {
      alert(`${name} is alredy in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [AddedContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <Container>
        <Title>
          Phonebook
          <Form onSubmit={this.addContact} />
        </Title>
        <Title>
          {' '}
          Contacts
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Title>
      </Container>
    );
  }
}
