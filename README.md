# Node.js CI/CD with Jenkins, GitHub Webhooks and Ansible

Every `git push` triggers Jenkins, which installs, tests, packages and deploys the app to an AWS EC2 server using Ansible.

    git push -> GitHub webhook -> Jenkins (install, test, package) -> Ansible -> EC2 (systemd service)

## Run locally first
    npm install
    npm test
    npm start          # http://localhost:3000

## Set up the servers
1. Launch two Ubuntu 22.04 EC2 instances: one for **Jenkins**, one as the **app server** (open ports 22, 8080 for Jenkins, 3000 for the app in the security groups).
2. On the Jenkins server install Jenkins, Ansible and the Jenkins plugins: NodeJS, SSH Agent, GitHub.
3. In Jenkins -> Tools, add a NodeJS installation named `node20`.
4. In Jenkins -> Credentials, add your EC2 private key (SSH Username with private key) with id `ec2-ssh-key`.
5. Copy `ansible/inventory.ini.example` to `ansible/inventory.ini` and put in the app server's public IP.
   (Do not commit inventory with real IPs if you prefer; it is not in .gitignore, so decide deliberately.)
6. Install the extra Ansible collection on the Jenkins server: `ansible-galaxy collection install community.general`

## Create the pipeline
1. Jenkins -> New Item -> Pipeline -> "Pipeline script from SCM" -> Git -> your repo URL.
2. Tick "GitHub hook trigger for GITScm polling".

## Add the GitHub webhook (this is the "automatic" part)
GitHub repo -> Settings -> Webhooks -> Add webhook
- Payload URL: `http://<jenkins-public-ip>:8080/github-webhook/`
- Content type: `application/json`
- Events: just the push event

## Prove it works
Change the text in `app.js`, commit and push. Jenkins starts a build by itself and the page at
`http://<app-server-ip>:3000` shows your change a minute later.

## What you will learn
Jenkins declarative pipelines, webhooks, running tests in CI, artifact archiving, Ansible playbooks and systemd services.
