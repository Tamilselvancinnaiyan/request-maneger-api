const userService = require("../services/user.Service");

exports.list = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;

    const users = await userService.getUserList(currentUserId);

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};


