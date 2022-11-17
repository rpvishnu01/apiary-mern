const express = require("express");
const {
  register,
  activateAccount,
  login,
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  unfriend,
  deleteRequest,
  acceptRequest,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  getFriendsPageInfos,
  getUser,
  getAllUsers

} = require("../controllers/user");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/getProfile/:username",authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateCover", authUser, updateCover);
router.put("/updateDetails", authUser, updateDetails);

router.put("/addFriend/:id", authUser, addFriend);
router.put("/cancelRequest/:id", authUser, cancelRequest);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.put("/acceptRequest/:id", authUser, acceptRequest);
router.put("/unfriend/:id", authUser, unfriend);
router.put("/deleteRequest/:id", authUser, deleteRequest);

router.post("/search/:searchTerm", authUser, search);
router.put("/addToSearchHistory", authUser, addToSearchHistory);
router.get("/getSearchHistory", authUser, getSearchHistory);
router.put("/removeFromSearch", authUser, removeFromSearch);
router.get("/getFriendsPageInfos", authUser, getFriendsPageInfos);


router.get("/getUser/:userId", getUser);
router.get("/users", getAllUsers);


module.exports = router;
