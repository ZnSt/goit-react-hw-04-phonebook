import { Li } from './ContactsList.styled';

export const ContactsList = ({ contacts, deleteContact }) => {
  console.log(contacts);
  return (
    <div>
      <h2>Contacts:</h2>
      <ol>
        {contacts.map(({ id, name, number }) => (
          <Li key={id}>
            <p>
              {name}: {number}
            </p>
            <button onClick={() => deleteContact(id)}>Delete</button>
          </Li>
        ))}
      </ol>
    </div>
  );
};
