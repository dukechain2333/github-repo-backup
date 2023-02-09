const shell = require('shelljs')
const {Octokit} = require("@octokit/core");
const fs = require('fs');

const auth_key = ''
const org_name = ''
const path = ''
if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true})
}

function addLog(log) {
    const time = new Date().toLocaleString('cn', {hour12: false})
    const content = time + ' ' + log
    console.log(content)
    fs.writeFile(path + '/log.txt', content+'\n', {flag: 'a'}, function (err) {
        if (err) {
            console.log(err)
        }
    })
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

function cloneRepo(repoName) {
    addLog("Starting clone repo: " + repoName)
    shell.cd(path)
    const command = 'git clone ' + repoName
    shell.exec(command)
    addLog(repoName + " clone complete.")
}

function updateRepo(filePath) {
    addLog("Starting update repo: " + filePath)
    shell.cd(filePath)
    const command = 'git pull'
    shell.exec(command)
    addLog(filePath + " update complete.")
}

function main() {
    addLog('Starting process...')
    getRepoName().then(repos => {
        for (const repo of repos) {
            const gitName = 'https://github.com/' + repo + '.git'
            const filePath = path + '/' + repo.split('/')[1]
            if (fs.existsSync(filePath)) {
                updateRepo(filePath)
            } else {
                cloneRepo(gitName)
            }
        }
    })
}

main()
setInterval(main, 1000 * 60 * 60)

