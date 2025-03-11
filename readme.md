# Lab Guy REST API

## Installation

1. Create/add variables in `.env` file in root directory.
   ```js
   DIRECT_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" # db
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" #db
   DATABASE_SHADOW_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" #db
   ADMIN_EMAIL="abcd@gmail.com" # Email
   ADMIN_EMAIL_PASSWORD="abcd abcd abcd abcd" # Email
   CLD_CLOUD_NAME="abcd" # Images
   CLD_API_KEY="12345" # Images
   CLD_API_SECRET="1a2b3c4d" # Images
   CLD_PRESET_NAME="abcd"  Images
   YT_API_KEY="1a2b3c4d" # Youtube Video data
   DASHBOARD_ADMIN_PATH="admin" # Reset Password Link
   IP="127.0.0.1" # server
   VIMEO_ID="b3747ed69ddb778c6e816d1bf074a5b3d015797d"  # vimeo
   VIMEO_SECRET="BVMacJ+4SUCEa+Pntt/6NMnP95PnsYNghcMOwqU0k9ADaR9uew8gx3Le8Yjk0knc3eWNG1PwwCT/XhxF/aDDQ2UmYZD6HilFFk/3i/HfOLhSKTbC7HqRobKB6AbGf23U" # vimeo
   VIMEO_TOKEN="z5801b1ba30652319f6a9934e7ga2d45" # vimeo
   ```
2. `npm i`

3. You are good to go!

## Deployment

1. Shared hosting (cheap)

   1. Connect to the server via SSH.
   2. Navigate to the root directory using `cd ~`
   3. Follow the steps in the [Installation](#installation) section.
   4. Create .htaccess file if necessary

      create .htaccess file:

      ```DirectoryIndex disabled
      DirectoryIndex disabled
      RewriteEngine On
      RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule ^(.\*)$ http://127.0.0.1:3000/$1 [P,L]
      ```

      \*You need to replace`127.0.0.1`with your machine's IP.

   5. Execute:

      ```
      mkdir ~/.npm-global
      npm config set prefix '~/.npm-global'
      echo 'export PATH=~/.npm-global/bin:~/bin:$PATH ' >> $HOME/.bash_profile && source $HOME/.bash_profile
      ```

   6. `npm i pm2 -g`
   7. `pm2 start bin/www`
   8. `pm2 save`
   9. Application should be running in the background now.
  
2. VPS
   1. Connect to the server via SSH.
   2. Navigate to the root directory using `cd ~`
   3. Install nodejs via nvm.
   4. Install MariaDB and configure database and user for the REST API.
   5. Clone `vps` branch.
   6. Create `.env` file
   7. `npm i`
   8. Setup pm2
   9. Setup ngnix
       
## Auto-updates
:warning: **CAUTION** it will synchronize your commit history.

1. Create classic Personal Access Token (PAT) with **repo** and **workflow** permissions enabled
2. Add secrets to the forked repo:
   ```
   PAT
   SERVER_SSH_KEY
   SERVER_HOST
   SERVER_USERNAME
   SERVER_PORT
   ```
3. Go to Actions and enable all available actions.
   
## Todo

Planned future features:

- Portfolio generator
