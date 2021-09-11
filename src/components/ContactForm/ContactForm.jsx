import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ContactForm, Label, Input, Button } from './ContactForm.styled';

export class Form extends Component {
  state = {
    name: '',
    number: ''
};

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleChange = e => {
      const { name, value } = e.currentTarget;
      this.setState({ [name]: value });
     
  };

    handleSubmit = e => {
      const { name, number } = this.state;
    e.preventDefault();

    this.props.onSubmit(name, number);
 
    this.reset();
  };


  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <ContactForm onSubmit={this.handleSubmit}>
        <Label htmlFor={this.nameInputId}>
          Name
          <Input
           type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}        
          />
            </Label>
         <Label htmlFor={this.numberInputId}>
          Number
          <Input
            type="tel"
             name="number"
             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
             title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
             required
            value={this.state.number}
             onChange={this.handleChange}
            id={this.numberInputId}
            />   
            </Label>
            
  
        <Button type="submit">
          Add contact
        </Button>
      </ContactForm>
    );
  }
}

