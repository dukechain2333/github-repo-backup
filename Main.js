const shell = require('shelljs')
const {Octokit} = require("@octokit/core");
const fs = require('fs');

const auth_key = ''
const org_name = ''
const path = ''
if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
}

async function getRepoName() {
    const octokit = new Octokit({
        auth: auth_key
    })
    const result = await octokit.request(`GET /orgs/${org_name}/repos`, {
        org: 'ORG',
        per_page: 100
    })

    const repoNames = []
    for (const repo of result.data) {
        repoNames.push(repo.full_name)
    }

    return repoNames;
}

async function cloneRepo(repoName) {
    shell.cd(path)
    const command = 'git clone ' + repoName
    shell.exec(command)
}

async function updateRepo(filePath) {
    shell.cd(filePath)
    const command = 'git pull'
    shell.exec(command)
}

getRepoName().then(repos => {
    for (const repo of repos) {
        const gitName = 'https://github.com/' + repo + '.git'
        const filePath = path + '/' + repo.split('/')[1]
        if (fs.existsSync(filePath)) {
            updateRepo(filePath)
        }
        else{
            cloneRepo(gitName)
        }
    }
})