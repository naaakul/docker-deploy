pipeline {
  agent none
  
  triggers {
    githubPush()
  }

  stages {
    stage('Build & Deploy on VM') {
      agent { label 'node' }

      environment {
        APP_DIR = "/home/ubuntu/docker-deploy"
        REPO = "git@github.com:naaakul/docker-deploy.git"
        IMAGE = "docker-deploy-image"
        CONTAINER = "docker-deploy-container"
        PORT = "3000"
      }

      stages {

        stage('Install Dependencies') {
          steps {
            sh 'sudo apt update && sudo apt install -y docker.io nginx git'
          }
        }

        stage('Clone or Update Repo') {
          steps {
            sh '''
            mkdir -p $APP_DIR
            if [ ! -d "$APP_DIR/.git" ]; then
              git clone $REPO $APP_DIR
            else
              cd $APP_DIR && git pull
            fi
            '''
          }
        }

        stage('Build Docker Image') {
          steps {
            sh 'cd $APP_DIR/app && docker build -t $IMAGE .'
          }
        }

        stage('Restart Container') {
          steps {
            sh 'docker stop $CONTAINER || true'
            sh 'docker rm $CONTAINER || true'
            sh 'docker run -d -p $PORT:3000 --name $CONTAINER --restart always $IMAGE'
          }
        }

        stage('Configure Nginx') {
          steps {
            sh '''
            sudo cp $APP_DIR/nginx.conf /etc/nginx/sites-available/docker-deploy
            sudo ln -sf /etc/nginx/sites-available/docker-deploy /etc/nginx/sites-enabled/docker-deploy

            sudo nginx -t
            sudo systemctl reload nginx
            '''
          }
        }

      }
    }
  }
}
