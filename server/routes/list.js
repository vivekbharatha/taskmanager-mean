const express = require('express');
const router = express.Router();

const { List, Task } = require('./../db/models');
router.get('/', (req, res) => {
  List.find({})
  .then((lists) => {
    return res.json(lists);
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  let payload = req.body;

  let newList = new List({ title: payload.title });

  newList.save()
  .then((listCreated) => {
    return res.json(listCreated);
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.patch('/:id', (req, res) => {
  List.findOneAndUpdate({ _id: req.params.id }, {$set: {title: req.body.title}}, {new: true})
  .then((updatedList) => {
    return res.json(updatedList);
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  List.findOneAndRemove({ _id: req.params.id })
  .then((updatedList) => {
    return res.json(updatedList);
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.get('/:listId/tasks', (req, res) => {
  Task.find({
    listid: req.params.listid
  })
  .then((tasks) => {
    return res.json(tasks);
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.post('/:listId/tasks', (req, res) => {
  List.findOne({
    _id: req.params.listId
  })
  .then((list) => {
    if (!list) {
      return false;
    }

    return true;
  })
  .then((canCreate) => {
    if (!canCreate) {
      return res.sendStatus(404);
    }

    let newTask = new Task({
      title: req.body.title,
      listId: req.params.listId
    });
    return newTask.save().then((taskCreated) => {
      return res.json(taskCreated);
    })
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.patch('/:listId/tasks/:taskId', (req, res) => {
  List.findOne({
    _id: req.params.listId
  })
  .then((list) => {
    if (!list) {
      return false;
    }

    return true;
  })
  .then((canUpdate) => {
    if (!canUpdate) {
      return res.sendStatus(404);
    }

    Task.findOneAndUpdate({
      _id: req.params.taskId,
      listId: req.params.listId
    }, {
      $set: {
        title: req.body.title
      }
    }, {new: true})
    .then((taskUpdated) => {
      return res.json(taskUpdated);
    })
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

router.delete('/:listId/tasks/:taskId', (req, res) => {
  List.findOne({
    _id: req.params.listId
  })
  .then((list) => {
    if (!list) {
      return false;
    }

    return true;
  })
  .then((canDelete) => {
    if (!canDelete) {
      return res.sendStatus(404);
    }

    Task.findOneAndRemove({
      _id: req.params.taskId,
      listId: req.params.listId
    })
    .then((removedTask) => {
      return res.json(removedTask);
    })
  })
  .catch((err) => {
    return res.status(500).json(err);
  });
});

module.exports = router;