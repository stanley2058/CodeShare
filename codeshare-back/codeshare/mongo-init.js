db.createUser(
    {
        user: "codeshareroot",
        pwd: "codeshareroot",
        roles: [
            {
                role: "readWrite",
                db: "CodeShare"
            }
        ]
    }
);