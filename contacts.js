const fs = require("fs/promises");
const path = require("path");

const contactsPath = require("./services").absolutePath("db", "contacts.json");

const { nanoid } = require("nanoid");

export async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contId = contacts.find((contact) => contact.id === contactId) || null;
  return contId;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [result] = allContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(result);
  return result;
}

async function addContact(data) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(newContact);
  return newContact;
}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
