import jwt from 'jsonwebtoken'
import User from '../models/User.js'

//generate jwt token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "7d",
    })
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check existing user
        const userExist = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (userExist) {
            return res.status(400).json({
                success: false,
                error:
                    userExist.email === email
                        ? "Email already exists"
                        : "Username already taken",
                statusCode: 400,
            });
        }

        // create user
        const user = await User.create({
            username,
            email,
            password,
        });

        // generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileimage: user.profileimage,
                    createdAt: user.createdAt,
                },
            },
            message: "User registered successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
            statusCode: 500,
        });
    }
};


export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
                statusCode: 400
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials",
                statusCode: 401
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials",
                statusCode: 401
            })
        }

        const token = generateToken(user._id)

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileimage: user.profileimage,
            },
            token,
            message: "Login successful"
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message,
            statusCode: 500
        })
    }
}


export const getProfile = async (req, res,next) => {
try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success:true,
        data:{
            id:user._id,
            username:user.username,
            email:user.email,
            profileimage:user.profileimage,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt

        }
    })
} catch (error) {
    next(error)
}
}



export const updateProfile = async  (req, res,next) => {
try {
    const {username , email , profileimage} = req.body;
    const user = await User.findById(req.user._id);

    if(userrname) user.username = username;
    if(email) user.email = email;
    if(profileimage) user.profileimage = profileimage;

    await user.save();
    res.status(200).json({
        success:true,
        data:{
            id:user._id,
             username:user.username,
            email:user.email,
            profileimage:user.profileimage,

        },
        message:"profile updated successfully"
    })

} catch (error) {
    next(error) 
}
}

export const changePassword = async  (req, res,next) => {
    try {
        const {currentpassword , newpassword} = req.body;
        if(!currentpassword || !newpassword){
            return res.status(400).json({
                success:false,
                error:"please privide password",

            })
        }
        const userr = await User.findById(req.user._id).select("+password");
        const isMatch = await user.matchPassword(currentPassword);

        if(!isMatch) { 
            return res.status(401).json({
                success:false,
                error:"current password is incorrect",
            })
        }
        user.password=newpassword;
        await user.save();
        res.status(200).json({
            success:true,
            message:"password changed successfully"
        })

    } catch (error) {
        next(error)
    }

}