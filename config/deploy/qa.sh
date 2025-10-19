#! /bin/bash

# create project archive
tar -czf project.tar.gz --exclude='node_modules' --exclude='._.DS_Store' --exclude='.DS_Store' --exclude='.next' --exclude='.git' --exclude='project.tar.gz' .

# copy to enola server
scp project.tar.gz app@qa.enolahelp.com:/home/nextProjects/dashboardNext

# delete src remotely
ssh app@qa.enolahelp.com 'rm -rf /home/nextProjects/dashboardNext/src'

# unarchive file remotely
ssh app@qa.enolahelp.com 'tar -xzf /home/nextProjects/dashboardNext/project.tar.gz -C /home/nextProjects/dashboardNext'

# delete file remotely
ssh app@qa.enolahelp.com 'rm /home/nextProjects/dashboardNext/project.tar.gz'

# delete file locally
rm project.tar.gz

# off docker container

ssh app@qa.enolahelp.com  'cd /home/nextProjects/dashboardNext && docker compose down'

# up new version
ssh app@qa.enolahelp.com  'cd /home/nextProjects/dashboardNext && docker compose up -d --build qa'

# clear none images
ssh app@qa.enolahelp.com  'docker image prune -af'