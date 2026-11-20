const { readFile, writeFile } = require("fs/promises");
const { dirname, join } = require("path");
const { generateId } = require("../utils/generateId");
const { isEmailTaken } = require("../validators/userValidators");
const { passwordValidation } = require("../validators/passwordValidation");
const JSON_HEADER = { 'Content-Type': 'application/json' };

const signup = async (req, res) => {
    try {
        const root = dirname(__dirname);
        const allUsersPath = join(root, 'database', 'users', 'usersDB.json');
        const allStoresPath = join(root, 'database', 'stores');
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const { storeName, email, password } = JSON.parse(body);
            const newUser = {
                id: generateId(),
                storeName: storeName,
                email: email,
                password: password
            };
            const validatePassword = passwordValidation(newUser.password);

            const newStore = {
                storeId: generateId(),
                userId: newUser.id,
                storeName: storeName,
                products: []
            };
            const storeFileName = newUser.id.slice(0, 3);
            const newStorePath = join(allStoresPath, `${storeName.split(' ').join('_') + '-' + storeFileName}.json`);
            const allUsers = await readFile(allUsersPath, 'utf-8');
            const parsedAllUsers = JSON.parse(allUsers);
            const takenEmail = isEmailTaken(parsedAllUsers.users, newUser.email);

            if (takenEmail) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    error: 'Email is already taken'
                }))
            };

            if (!validatePassword.isValid) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    error: true,
                    field: 'Password',
                    message: validatePassword.error
                }));
            };

            parsedAllUsers.users.push(newUser);

            try {
                await writeFile(allUsersPath, JSON.stringify(parsedAllUsers, null, 4));

                await writeFile(newStorePath, JSON.stringify(newStore, null, 2));

                res.writeHead(200, JSON_HEADER);

                return res.end(JSON.stringify({
                    success: true,
                    newUser: newUser
                }));
            } catch (error) {
                console.error(error);

                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    error: true,
                    errorMsg: 'Something went wrong'
                }));
            };
        });
    } catch (error) {
        console.error(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not responding'
        }));
    };
};

module.exports = { signup };