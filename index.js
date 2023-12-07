const listContacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listAllContacts = await listContacts.listContacts();
      console.table(listAllContacts);
      break;

    case "get":
      const oneContactById = await listContacts.getContactById(id);
      return console.log(oneContactById);

    case "add":
      const newContact = await listContacts.addContact({ name, email, phone });
      return newContact;

    case "remove":
      const delContact = await listContacts.removeContact(id);
      return delContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
