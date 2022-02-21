import express from 'express'
import cors from 'cors'

const server = express()
server.use(cors())
server.use(express.json())

// Login user
const user = {
  email: 'arthur.toledo@squadra.com.br',
  password: '123456'
}

server.post('/login', (req, res) => {
  const { email, password } = req.body
  if (email === user.email && password === user.password) {
    res.json({
      token: 'token'
    })
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    })
  }
})


server.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
