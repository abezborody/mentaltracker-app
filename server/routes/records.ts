import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  hoursSlept: z.number().int().positive().min(0),
  deppressedLevel: z.number().int().positive().min(0).max(10),
  elevatedLevel: z.number().int().positive().min(0).max(10),
  irritabilityLevel: z.number().int().positive().min(0).max(10),
  anxietyLevel: z.number().int().positive().min(0).max(10),
  isTalkTherapyToday: z.boolean(),
  date: z.date(),
})

type Expense = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({ id: true })

const fakeExpenses: Expense[] = [
  {
    id: 1,
    hoursSlept: 4,
    deppressedLevel: 3,
    elevatedLevel: 6,
    irritabilityLevel: 2,
    anxietyLevel: 3,
    isTalkTherapyToday: false,
    date: new Date('2024-01-09'),
  },
  {
    id: 2,
    hoursSlept: 4,
    deppressedLevel: 3,
    elevatedLevel: 6,
    irritabilityLevel: 2,
    anxietyLevel: 3,
    isTalkTherapyToday: false,
    date: new Date('2024-01-09'),
  },
  {
    id: 3,
    hoursSlept: 4,
    deppressedLevel: 3,
    elevatedLevel: 6,
    irritabilityLevel: 2,
    anxietyLevel: 3,
    isTalkTherapyToday: false,
    date: new Date('2024-01-09'),
  },
]

export const recordsRoute = new Hono()
  .get('/', (c) => {
    return c.json({
      expenses: fakeExpenses,
    })
  })
  .post('/', zValidator('json', createPostSchema), async (c) => {
    const data = await c.req.valid('json')
    const expense = createPostSchema.parse(data)
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense })
    c.status(201)
    return c.json(expense)
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const expense = fakeExpenses.find((e) => e.id === id)
    if (!expense) {
      return c.notFound()
    }
    return c.json(expense)
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const indexToDelete = fakeExpenses.findIndex((e) => e.id === id)
    if (indexToDelete === -1) {
      return c.notFound()
    }
    const deletedExpenses = fakeExpenses.splice(indexToDelete, 1)
    return c.json({ expense: deletedExpenses })
  })
// .put
