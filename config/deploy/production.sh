#! /bin/bash
$(date +%s)

RELEASE=current
ARCHIVE_NAME=project.tar.gz

DOMAIN_NAME=dashboard.enolahelp.com
USER_ROLE=app
APP_PATH=/var/www/apps/dashboard

branch=main

while getopts "b:" flag; do
  case ${flag} in
    b) branch="${OPTARG}" ;;
  esac
done

echo "Deploying release: $RELEASE";
echo "Archive: $ARCHIVE_NAME";
echo "Branch: $branch";

# create project archive
echo "Archiving the project: git archive --format=tar.gz --remote=$(git remote get-url --push origin) --output=$ARCHIVE_NAME $branch ..."
git archive --format=tar.gz --remote=$(git remote get-url --push origin) --output=$ARCHIVE_NAME $branch

# copy to enola server
echo "Copying $ARCHIVE_NAME to the server: scp $ARCHIVE_NAME $USER_ROLE@$DOMAIN_NAME:$APP_PATH/$RELEASE ..."
scp $ARCHIVE_NAME $USER_ROLE@$DOMAIN_NAME:$APP_PATH/$RELEASE

# # clean up old releases
# echo "Deleting the project to $ARCHIVE_NAME ..."
# ssh $USER_ROLE@$DOMAIN_NAME 'rm -rf /home/nextProjects/dashboardNext/src'

# unarchive file remotely
echo "Unarchiving the project: tar -C $APP_PATH/$RELEASE -xzf $APP_PATH/$RELEASE/$ARCHIVE_NAME ..."
ssh $USER_ROLE@$DOMAIN_NAME "tar -C $APP_PATH/$RELEASE -xzf $APP_PATH/$RELEASE/$ARCHIVE_NAME"

# delete file remotely
echo "Deleting $ARCHIVE_NAME from the server ..."
ssh $USER_ROLE@$DOMAIN_NAME "rm $APP_PATH/$RELEASE/$ARCHIVE_NAME"

# delete file locally
echo "Deleting $ARCHIVE_NAME from the local machine ..."
rm $ARCHIVE_NAME

# off docker container
echo "Stoping the old app version ..."
ssh $USER_ROLE@$DOMAIN_NAME "cd $APP_PATH/$RELEASE && docker compose down"

# up new version
echo "Starting the new app version ..."
ssh $USER_ROLE@$DOMAIN_NAME "cd $APP_PATH/$RELEASE && docker compose up -d --build production"

# clear none images
ssh $USER_ROLE@$DOMAIN_NAME 'docker image prune -af'