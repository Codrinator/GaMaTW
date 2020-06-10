const tokenUtils = require("../Utils/authorizationTokenUtils");

const pathsToAuthorize = [
    "/admin/registerGame", //de adaugat la request de pe front: request.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem("token")); --session sau local
    "/tournaments/join",
    "/tournaments/isInTournament",
    "/tournaments/createTournament",
    "/tournaments/leaveTournament",
    "/admin/deleteGame",
    "/tournaments/declareMatchWinner",
];

const checkAuthorization = async function(req,res,next){
    if (pathsToAuthorize.includes(req.url)){
        try{
            const token = await tokenUtils.getTokenFromHeader(req);
            if (token.length > 10){
                try{
                    req.user = await tokenUtils.verifyToken(token);
                    return next();
                } catch (err) {
                    res.statusCode = 401;
                    res.end(JSON.stringify({
                        success : false,
                        status : 'Invalid token... try to relog'
                    }));
                }
            } else {
                res.statusCode = 401;
                res.end(JSON.stringify({
                    success : false,
                    status : 'Register or Login to use this feature'
                }));
            }

        } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                success : false,
                status : 'Server error'
            }));
        }
    } else {
        return next();
    }
};

module.exports = {checkAuthorization};