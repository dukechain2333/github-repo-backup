# github-repo-backup

A simple script to backup all your GitHub organization repositories.

## Usage
1. Clone this repository to your local directory. Then run the following command to install the dependencies:

    ```bash
    npm install
    ```

2. Create a new [Github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

3. Fill in the `Main.js` file with your Github personal access token, the name of the organization you want to backup and the backup directory.

    | Parameters |         Description          |
    | :--------: | :--------------------------: |
    |  Auth_key  | Github personal access token |
    |  org_name  | The name of the organization |
    |    path    |       Backup directory       |

4. Run the following command to start the process, the process will automatically be excuted every hour. You may also find logs in your backup directory.

    ```bash
    node Main.js
    ``` 

