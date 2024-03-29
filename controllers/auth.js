// import User from "../Models/user";
// import { hashPassword, comparePassword } from "../helpers/auth";
// import jwt from "jsonwebtoken";

// export const register = async(req, res) => {
//     //  console.log("REGISTER ENDPOINT => ", req.body);
//     const { name, email, password, secret } = req.body;
//     // validation
//     if (!name) return res.status(400).send("Name is required");
//     if (!password || password.length < 6)
//         return res
//             .status(400)
//             .send("Password is required and should be 6 characters long");
//     if (!secret) return res.status(400).send("Answer is required");
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).send("Email is taken");
//     // hash password
//     const hashedPassword = await hashPassword(password);

//     const user = new User({ name, email, password: hashedPassword, secret });
//     try {
//         await user.save();
//         console.log("REGISTERED USE => ", user);
//         return res.json({
//             ok: true,
//         });
//     } catch (err) {
//         console.log("REGISTER FAILED => ", err);
//         return res.status(400).send("Error. Try again.");
//     }
// };

// export const login = async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         // validation
//         const user = await User.findOne({ email })
//         if (!user) return res.status(400).send("User not found");
//         const match = await comparePassword(password, user.password);
//         if (!match) return res.status(400).send("Wrong Password entered");
//         const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//         user.password = undefined;
//         user.secret = undefined;
//         res.json({
//             token,
//             user
//         })
//     } catch (err) {
//         console.log("REGISTER FAILED => ", err);
//         return res.status(400).send("Error. Try again.");
//     }
// }