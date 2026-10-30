pipeline {
    agent any
    environment {
        ODOO_USERNAME = credentials('ODOO_USERNAME')
        ODOO_PASSWORD = credentials('ODOO_PASSWORD')
        BASE_URL = 'https://testyantra.odoo.com'
    }

    options {
        timestamps()
    }

    stages {
        stage('Playwright Shards') {
            parallel {
                stage('Shard 1') {
                    agent any

                    steps {
                        catchError(
                            buildResult: 'FAILURE',
                            stageResult: 'FAILURE'
                        ) {
                            checkout scm
                            bat 'npm ci'
                            bat 'npx playwright install chromium'
                            bat 'npx playwright test --shard=1/4'
                        }
                    }

                    post {
                        always {
                            stash(
                                name: 'shard1-blob',
                                includes: 'blob-report/**',
                                allowEmpty: true
                            )
                        }
                    }
                }

                stage('Shard 2') {
                    agent any

                    steps {
                        catchError(
                            buildResult: 'FAILURE',
                            stageResult: 'FAILURE'
                        ) {
                            checkout scm
                            bat 'npm ci'
                            bat 'npx playwright install chromium'
                            bat 'npx playwright test --shard=2/4'
                        }
                    }

                    post {
                        always {
                            stash(
                                name: 'shard2-blob',
                                includes: 'blob-report/**',
                                allowEmpty: true
                            )
                        }
                    }
                }

                stage('Shard 3') {
                    agent any

                    steps {
                        catchError(
                            buildResult: 'FAILURE',
                            stageResult: 'FAILURE'
                        ) {
                            checkout scm
                            bat 'npm ci'
                            bat 'npx playwright install chromium'
                            bat 'npx playwright test --shard=3/4'
                        }
                    }

                    post {
                        always {
                            stash(
                                name: 'shard3-blob',
                                includes: 'blob-report/**',
                                allowEmpty: true
                            )
                        }
                    }
                }

                stage('Shard 4') {
                    agent any

                    steps {
                        catchError(
                            buildResult: 'FAILURE',
                            stageResult: 'FAILURE'
                        ) {
                            checkout scm
                            bat 'npm ci'
                            bat 'npx playwright install chromium'
                            bat 'npx playwright test --shard=4/4'
                        }
                    }

                    post {
                        always {
                            stash(
                                name: 'shard4-blob',
                                includes: 'blob-report/**',
                                allowEmpty: true
                            )
                        }
                    }
                }
            }
        }

        stage('Merge Reports') {
            agent any

            steps {
                checkout scm
                bat 'npm ci'

                // Collect reports from all four shards.
                unstash 'shard1-blob'
                unstash 'shard2-blob'
                unstash 'shard3-blob'
                unstash 'shard4-blob'

                // Merge available Blob reports into HTML.
                bat '''
                    if exist blob-report\\*.zip (
                        npx playwright merge-reports --reporter html blob-report
                    ) else (
                        echo No Blob reports were generated.
                    )
                '''
            }

            post {
                always {
                    archiveArtifacts(
                        artifacts: 'blob-report/**,playwright-report/**',
                        allowEmptyArchive: true
                    )

                    publishHTML(target: [
                        reportName: 'Playwright Combined Report',
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: true
                    ])
                }
            }
        }
    }
}