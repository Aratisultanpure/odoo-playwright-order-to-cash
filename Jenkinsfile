pipeline {
    agent any

    environment {
        ODOO_USERNAME = credentials('ODOO_USERNAME')
        ODOO_PASSWORD = credentials('ODOO_PASSWORD')
    }

    stages {

        stage('Verify Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Execute Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
}