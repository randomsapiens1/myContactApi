 
//@desc Register a user
//@route POST /api/user/register
//@acess public

const registerUser = asyncHandler(async(req, res) => {

    res.json({message: "Register the user"});
});

//@desc login a user
//@route POST /api/user/login
//@acess public

const loginUser = asyncHandler(async(req, res) => {

    res.json({message: "Login user"});
});

module.exports = { registerUser, loginUser }

