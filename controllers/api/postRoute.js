//import router express
const router = require('express').Router();
//getting User Post Comment model
const { User, Post, Comment } = require('../../models');
//importing withAuth utils
const withAuth = require('../../utils/auth');