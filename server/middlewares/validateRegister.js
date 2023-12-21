export async function validateRegister(req,res,next){
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required." });
        }

        next();
    } catch (err) {
        res.status(400).json({
            msg: `The mail is already registered. Log in or create another account with other mail`,
            err
        });
    }
}