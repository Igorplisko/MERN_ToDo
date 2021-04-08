const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




router.post('/registration',
   [
      check('email', 'Incorrect email').isEmail(),
      check('password', 'Invalid password').isLength({ min: 6 })
   ],
   //!проверка регестрации

   async (req, res) => {
      try {
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Incorrect registration data! '
            })
         }

         const { email, password } = req.body
         const isUsed = await User.findOne({ email })


         if (isUsed) {
            return res.status(300).json({ message: 'This email address is already in use, please try another one!' })
         }

         //!bcrypt
         const hashedPassword = await bcrypt.hash(password, 12)
         const user = new User({
            email, password: hashedPassword
         })

         await user.save()

         res.status(201).json({ message: 'User has been created!' })

      } catch (error) {
         console.log(error)
      }
   })

module.exports = router



router.post('/login',
   [
      check('email', 'Incorrect email').isEmail(),
      check('password', 'Invalid password').exists()
   ],
   //!проверка регестрации

   async (req, res) => {
      try {
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Incorrect registration data! '
            })
         }

         const { email, password } = req.body

         const user = await User.findOne({ email })

         if (!user) {
            return res.status(400).json({ message: 'This email does not exist in the database.' })
         }

         //!сравнение паролей 
         const isMatched = bcrypt.compare(password, user.password)
         if (!isMatched) {
            return res.status(400).json({ message: 'Password mismatch ! Please enter a different password!' })

         }

         const jwtSecret = 'qwrw22342352qtggewhyere' //секретный ключ 

         const token = jwt.sing(
            { userId: user.id },
            jwtSecret,
            { expiresIn: '1h' }
         )

         res.json({
            token, userId: user.id
         })


         //!1:15



         res.status(201).json({ message: 'User has been created!' })

      } catch (error) {
         console.log(error)
      }
   })

module.exports = router