pipeline {
  agent any

  tools { nodejs 'node20' }   // configure a NodeJS 20 install named node20 in Jenkins

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Test') {
      steps { sh 'npm test' }
    }

    stage('Package') {
      steps {
        sh 'tar czf app.tgz app.js package.json'
        archiveArtifacts artifacts: 'app.tgz', fingerprint: true
      }
    }

    stage('Deploy to EC2 with Ansible') {
      steps {
        // Needs the "SSH Agent" plugin and a credential with id ec2-ssh-key
        sshagent(credentials: ['ec2-ssh-key']) {
          sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
        }
      }
    }
  }
}
