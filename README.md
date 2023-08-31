# Nails by Phobia
Fork of @LearnWebCode's web scraper. This is a NodeJS app utilizing Puppeteer to automate information gathering by scraping the given domain. Grab text, pictures, and more.

# Installation, and use steps:

1: Clone the repo:

    git clone https://github.com/PhobiaGH/Nails

2: cd into the Nails directory:

    cd ~/Nails

3: Type this command, hit enter, and follow the prompts:

    ./install.sh

4: Reload (close and reopen) your terminal to load npm

5: Type nails into your terminal to start Nails:

    nails

That's it! Once the page has been scraped, all of the extracted data will be added to a folder named
as your systems current date and time in the Nails directory.

# Manual installation, and use steps:

1: Clone the repo:

    git clone https://github.com/PhobiaGH/Nails

2: Install nvm (Alterantively you can just install node directly from your distros repo if you don't care about being able to manage multiple node installs. This program uses node 19.9.0. If you skip installing nvm you may go right to step 7.)

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

3: In your terminal type,

    nvm -v

4: If you get "command nvm not found" type the following codes into your terminal, otherwise skip to step 5
    
    touch ~/.bashrc
    
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
    
    . ~/.bashrc

    nvm -v

5: Install Node Version Manager
    
    nvm install

6: Use installed node version
    
    nvm use

7: Install node dependencies
    
    npm install

8: To use Nails on Windows, open CMD in the Nails directory, and enter
    
    npm start https://www.url-you-wish-to-use.com/ 

9: Linux users open your terminal in the Nails directory, and enter

    ./nails.sh

    
That's it! Once the page has been scraped, all of the extracted data will be added to a folder named
as your systems current date and time in the Nails directory.
