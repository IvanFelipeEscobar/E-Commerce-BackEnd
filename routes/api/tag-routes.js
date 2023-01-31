const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
const dbTagData = await Tag.findAll({
  include: {
    model: Product,
    attributes: [`id`, `product_name`, `price`, `stock`, `category_id`]
  }
})
res.status(200).json(dbTagData)
} catch(err){res.status(500).json(err)}
});

router.get('/:id', async (req, res) => {
  try{
    const dbTagById = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: [`id`, `product_name`, `price`, `stock`, `category_id`]
      }
    })
    if(!dbTagById){res.status(404).json({message: `no tag found by that id`})}
    res.status(200).json(dbTagById)
  } catch(err){
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const dbTagCreate = await Tag.create({
      tag_id: req.body.tag_id
    })
    res.status(200).json(dbTagCreate)
  }catch(err){res.status(500).json(err)}
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
