const requestService = require("../services/request.service");

exports.create = async (req, res, next) => {
  try {
    const request = await requestService.create({
      userId: req.user.id,
      payload: req.body,
    });
    res.status(201).json({ request });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const requests = await requestService.listForUser(req.user);
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

exports.all = async (req, res, next) => {
  try {
    const requests = await requestService.listForManager(req.user);
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

exports.approve = async (req, res, next) => {
  try {
    const request = await requestService.approve({
      userId: req.user.id,
      requestId: req.params.id,
    });
    res.json({ request });
  } catch (err) {
    next(err);
  }
};

exports.reject = async (req, res, next) => {
  try {
    const request = await requestService.reject({
      userId: req.user.id,
      requestId: req.params.id,
    });
    res.json({ request });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const request = await requestService.close({
      userId: req.user.id,
      requestId: req.params.id,
    });
    res.json({ request });
  } catch (err) {
    next(err);
  }
};

exports.assigned = async (req, res, next) => {
   try {
    const requests = await requestService.assigned(req.user);
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};
