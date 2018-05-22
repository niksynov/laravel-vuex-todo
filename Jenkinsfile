node {
        stage('repository_pull') {
            sh 'env | sort'
            git branch: 'master', url: 'https://github.com/NickSynev/laravel-vuex-todo.git'
        }
        stage("composer_install") {
              sh 'composer install'
            }
        stage('tests') {
            sh 'vendor/bin/phpunit'
        }
        stage('cleanup') {
            deleteDir()
        }
}