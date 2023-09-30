import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    const fileData = data;
    
    return fileData;
  } catch (error) {
    console.error('Помилка читання файлу:', error);
  }
}

async function getContactById(contactId = 'qdggE76Jtbfd9eWJHrssH') {
    try {
      const data = await fs.readFile(contactPath, 'utf-8');
      const fileData = JSON.parse(data); 
  
      const foundContact = fileData.find(contact => contact.id === contactId);

      return foundContact || null;

    } catch (error) {
        console.error('Помилка читання файлу:', error);
        return null;
    }
  }

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactPath, 'utf-8');
        const fileData = JSON.parse(data);

        
        const removedContact = fileData.filter(contact => contact.id === contactId);
        const removedContactID = fileData.findIndex(contact => contact.id === contactId);

        fileData.splice(removedContactID, 1);

        const updatedData = JSON.stringify(fileData, null, 2);

        fs.writeFile(contactPath, updatedData);
      
        return removedContact;


    } catch (error) {
        console.error('Помилка читання файлу:', error);
      }
}

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }

async function addContact(name='Nugget', email='nuggetmail@gmail.com', phone='+380777444333') {
    try {
        const newContact = {
            "id": generateRandomId(21),
            "name": name,
            "email": email,
            "phone": phone
        };

        const data = await fs.readFile(contactPath, 'utf-8');
        const fileData = JSON.parse(data);

        fileData.push(newContact);

        const updatedData = JSON.stringify(fileData, null, 2);

        fs.writeFile(contactPath, updatedData);
        return newContact;
    } catch (error) {
        console.error('Помилка читання файлу:', error);
      }
}

export { listContacts, getContactById, removeContact, addContact };
