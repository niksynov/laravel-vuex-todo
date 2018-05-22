node {
        stage('repository_pull') {
            sh 'env | sort'
            git branch: 'master', url: 'https://github.com/NickSynev/laravel-vuex-todo.git'
        }
        stage('tests') {
            sh 'vendor/bin/phpunt'
        }
}