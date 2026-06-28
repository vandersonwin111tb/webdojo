const express = require('express')
const cors = require('cors')

const prisma = require('./src/database/prisma')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON Format' })
  }
  next()
})

app.get('/', (req, res) => {
  res.json({
    message: 'API do curso Ninja do Cypress!'
  })
})

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name) {
      return res.status(400).json({
        error: 'The "name" field is required.'
      })
    }

    if (!email) {
      return res.status(400).json({
        error: 'The "email" field is required.'
      })
    }

    if (!password) {
      return res.status(400).json({
        error: 'The "password" field is required.'
      })
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userExists) {
      return res.status(409).json({
        error: 'A user with the provided email address already exists.'
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return res.status(201).json({
      message: 'User account successfully created.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'InternalServerError',
      message: 'An unexpected error occurred while processing the request.'
    })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false
      }
    })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users.' })
  }
})

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({
      error: 'The "name" field is required.'
    })
  }

  if (!email) {
    return res.status(400).json({
      error: 'The "email" field is required.'
    })
  }

  if (!password) {
    return res.status(400).json({
      error: 'The "password" field is required.'
    })
  }

  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name, email, password
      }
    })

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Error updating user :(' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})