# Add Migration

Once you have properly configured CLI config file you are ready to create your first migration. It's as simple as executing a simple command.

We will use model:generate command. This command requires two options:

name: the name of the model;
attributes: the list of model attributes.
Let's create a model named User.

-   npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

-   This will:
    Create a model file user in models folder;
    Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder.

# Undoing Migrations

Now our table has been created and saved in database. With migration you can revert to old state by just running a command.

You can use db:migrate:undo, this command will revert most recent migration.

-   npx sequelize-cli db:migrate:undo

You can revert back to initial state by undoing all migrations with db:migrate:undo:all command. You can also revert back to a specific migration by passing its name in --to option.

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
