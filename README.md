# Nails by Phobia
Fork of @LearnWebCode's web scraper. This is a NodeJS app utilizing Puppeteer to automate information gathering by scraping the given domain. Grab text, pictures, and more.

Installation, and use steps:

1: cd into dir you wish to store the code

    cd /pathto/dir

2: Clone the repo

    git clone https://github.com/PhobiaGH/Nails

3: Install nvm (Alterantively you can just install node directly from your distros repo if you don't care about being able to manage multiple node installs. This program uses node 19.9.0. If you skip installing nvm you may go right to step 8.)

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

4: In your terminal type,

    nvm -v

5: If you get "command nvm not found" type the following codes into your terminal, otherwise skip to step 6

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    touch ~/.bash_profile
    
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
    
    . ~/.bash_profile

    nvm -v

6: Install Node Version Manager
    
    nvm install

7: Use installed node version
    
    nvm use

8: cd into Nails dir

    cd /path/to/dir

9: Install node dependencies
    
    npm install

10: To use Nails on Windows, open CMD in the Nails directory, and enter
    
    npm start https://www.url-you-wish-to-use.com/ 

11: Linux users open your terminal in the Nails directory, and enter

    ./nails.sh

That's it! Once the page has been scraped, all of the extracted data will be added to the Scraped folder.
