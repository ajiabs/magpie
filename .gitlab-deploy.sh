set -f
string=$DEPLOY_SERVER
array="${string//,/ }"
for i in "${!array[@]}"; do
  echo "Deploying information to EC2 and Gitlab"
  echo "Deploy project on server ${array[i]}"
  ssh -o "StrictHostKeyChecking=no" "magpie@${array[i]}" "cd  /home/magpie/public_html/ && git pull origin staging"
done
