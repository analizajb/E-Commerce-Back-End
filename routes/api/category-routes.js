const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll(
    // include its associated Products
    {
      include: {
        model: Product,
        attributes: ['product_name'],
      },
    }
  )
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Products
    include: {
      model: Product,
      attributes: ['category_id'],
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found' });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
