pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'vendor/bin/phpunt'
            }
        }
    }
}