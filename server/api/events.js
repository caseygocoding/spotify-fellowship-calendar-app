const router = require('express').Router();
const { Event } = require('../db/models');
module.exports = router;

router.get('/:month/:year', (req, res, next) => {
  Event.findAll({
    where: {
      month: req.params.month,
      year: req.params.year,
    },
  })
    .then(events => {
      res.json(events);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(newEvent => {
      res.status(200).json(newEvent);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Event.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => Event.findById(req.params.id))
    .then(updatedEvent => {
      res.json(updatedEvent);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(201))
    .catch(next);
});
