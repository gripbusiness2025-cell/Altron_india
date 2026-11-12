import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { config } from '../config.js'
import { Category } from '../models/Category.js'
import { Product } from '../models/Product.js'
import { User } from '../models/User.js'
import { requireAdmin } from '../middleware/auth.js'

export const adminRouter = Router()

adminRouter.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').toLowerCase().trim()
    const password = String(req.body?.password || '')
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ sub: String(user._id), role: user.role }, config.jwtSecret, {
      expiresIn: '7d',
    })
    res.json({ token, role: user.role, email: user.email })
  } catch (err) {
    next(err)
  }
})

adminRouter.use(requireAdmin)

adminRouter.post('/categories', async (req, res, next) => {
  try {
    const { slug, label, parentId, sortOrder, legacyWcCategoryId } = req.body ?? {}
    if (!slug || !label) return res.status(400).json({ error: 'slug and label required' })
    const parent =
      parentId && mongoose.isValidObjectId(parentId) ? new mongoose.Types.ObjectId(parentId) : null
    const doc = await Category.create({
      slug: String(slug).trim(),
      label: String(label).trim(),
      parent,
      sortOrder: Number(sortOrder) || 0,
      legacyWcCategoryId: legacyWcCategoryId ? Number(legacyWcCategoryId) : undefined,
    })
    res.status(201).json(doc)
  } catch (err) {
    next(err)
  }
})

adminRouter.patch('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' })
    const updates: Record<string, unknown> = {}
    for (const key of ['slug', 'label', 'sortOrder', 'published'] as const) {
      if (req.body?.[key] !== undefined) updates[key] = req.body[key]
    }
    if (req.body?.parentId !== undefined) {
      updates.parent =
        req.body.parentId && mongoose.isValidObjectId(req.body.parentId)
          ? new mongoose.Types.ObjectId(req.body.parentId)
          : null
    }
    const doc = await Category.findByIdAndUpdate(id, updates, { new: true })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

adminRouter.delete('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' })
    await Category.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

adminRouter.post('/products', async (req, res, next) => {
  try {
    const body = req.body ?? {}
    if (!body.slug || !body.title || !body.categoryId) {
      return res.status(400).json({ error: 'slug, title, categoryId required' })
    }
    if (!mongoose.isValidObjectId(body.categoryId)) {
      return res.status(400).json({ error: 'Invalid categoryId' })
    }
    const doc = await Product.create({
      slug: String(body.slug).trim(),
      title: String(body.title),
      excerptHtml: body.excerptHtml || '',
      contentHtml: body.contentHtml || '',
      imageUrl: body.imageUrl || null,
      catalogueUrl: body.catalogueUrl || null,
      catalogueLabel: body.catalogueLabel || 'Download Catalogue',
      categoryId: new mongoose.Types.ObjectId(body.categoryId),
      published: body.published !== false,
      legacyWcProductId: body.legacyWcProductId ? Number(body.legacyWcProductId) : undefined,
    })
    res.status(201).json(doc)
  } catch (err) {
    next(err)
  }
})

adminRouter.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' })
    const updates = { ...req.body }
    if (updates.categoryId && mongoose.isValidObjectId(updates.categoryId)) {
      updates.categoryId = new mongoose.Types.ObjectId(updates.categoryId)
    }
    const doc = await Product.findByIdAndUpdate(id, updates, { new: true })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

adminRouter.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' })
    await Product.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

adminRouter.post('/users/bootstrap', async (req, res, next) => {
  try {
    const count = await User.countDocuments()
    if (count > 0) return res.status(403).json({ error: 'Users already exist' })

    const email = String(req.body?.email || '').toLowerCase().trim()
    const password = String(req.body?.password || '')
    if (!email || password.length < 8) {
      return res.status(400).json({ error: 'Valid email and password (8+ chars) required' })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ email, passwordHash, role: 'admin' })
    res.status(201).json({ id: user._id, email: user.email })
  } catch (err) {
    next(err)
  }
})
