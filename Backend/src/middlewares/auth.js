

const authFoodPartnerMiddleware = async (req, res, next) => {
    try {
        const token = res.cookie.token;
        
        if (!token) {
            return res.status(400).json({message: "Token is Invalid!", success: false});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({message: "Something went wrong!", success: false});
    }
}