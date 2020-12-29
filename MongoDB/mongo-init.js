db.createUser(
    {
        user: "codeshareroot",
        pwd: "codeshare2020",
        roles: [
            {
                role: "readWrite",
                db: "CodeShare"
            }
        ]
    }
);
