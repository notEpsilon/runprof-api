import express from 'express';
import usersController from '../controllers/users.controller.js'

const router = express.Router();

// Add User
router.post('/register', usersController.addUser);

// Get All Users
router.get('/users', usersController.getAllUsers);

// Get Single User
router.get('/users/:mail', usersController.getSingleUser);

// Update User
router.put('/users/:mail', usersController.updateUser);

// Delete User
router.delete('/users/:mail', usersController.deleteUser);

export default router;
