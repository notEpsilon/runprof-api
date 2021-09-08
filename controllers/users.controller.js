import User from '../models/User.model.js';
import fireApp from '../firebase/firebaseUtils.js';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { validateUserAsync } from '../validation/validationUtils.js';

const firestore = getFirestore(fireApp);

const usersController = {
    addUser: async (req, res) => {
        const { email, number, name, gender, language, avatarUrl } = req.body;
        const user = new User(email, number, name, gender, language, avatarUrl);
        if (!validateUserAsync(email, number, name, gender, language, avatarUrl)) {
            return res.status(400).json({ message: 'Invalid User Info' });
        }
        const userDocRef = doc(firestore, 'users', email);
        try {
            if ((await getDoc(userDocRef)).exists()) {
                return res.status(400).json({ message: 'User with this email already exists!' });
            }
            await setDoc(userDocRef, user.getData());
            return res.status(200).json({ message: 'User Created Successfully!' });
        }
        catch (e) {
            return res.status(400).json({ message: `Error Creating The User!\n\nErrorMsg: ${e}\n` });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const usersData = await getDocs(collection(firestore, 'users'));
            const allDocs = [];
            usersData.forEach(doc => {
                allDocs.push(new User(
                    doc.data().email,
                    doc.data().number,
                    doc.data().name,
                    doc.data().gender,
                    doc.data().language,
                    doc.data().avatarUrl
                ).getData());
            });
            return res.status(200).json({ users: allDocs });
        }
        catch (e) {
            return res.status(400).json({ message: `Error Getting All Users\n\nErrorMsg: ${e}\n` });
        }
    },
    getSingleUser: async (req, res) => {
        const mail = req.params.mail;
        try {
            const document = doc(firestore, 'users', mail);
            const userDoc = await getDoc(document);
            if (!userDoc) {
                return res.status(404).json({ message: 'User not found!' });
            }
            return res.status(200).json({ data: userDoc.data() });
        }
        catch (e) {
            return res.status(400).json({ message: 'Error Retrieving The User Back!' });
        }
    },
    updateUser: async (req, res) => {
        const mail = req.params.mail;
        const { email, number, name, gender, language, avatarUrl } = req.body;
        const user = new User(email, number, name, gender, language, avatarUrl);
        const userDocRef = doc(firestore, 'users', mail);
        try {
            if (user.getData().email !== mail) {
                return res.status(400).json({ message: 'You can\'t change the user\'s email address' });
            }
            await updateDoc(userDocRef, user.getData());
            return res.status(200).json({ message: 'User Updated Successfully!' })
        }
        catch (e) {
            return res.status(400).json({ message: `Error Updating The User\n\nErrorMsg: ${e}\n` });
        }
    },
    deleteUser: async (req, res) => {
        const mail = req.params.mail;
        try {
            await deleteDoc(doc(firestore, 'users', mail));
            return res.status(200).json({ message: 'User Deleted Successfully' });
        }
        catch (e) {
            return res.status(400).json({ message: `Error Deleting The User\n\nErrorMsg: ${e}\n` });
        }
    }
};

export default usersController;
