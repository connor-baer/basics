source ~/.profile

#  ---------------------------------------------------------------------------
#
#  Description:  This file holds all my BASH configurations and aliases.
#                Much of this was originally copied from:
#                https://gist.github.com/stephenll/8762279
#
#  Sections:
#  1.   Environment Configuration
#  2.   Make Terminal Better (remapping defaults and adding functionality)
#  3.   File and Folder Management
#  4.   Networking
#  5.   System Operations & Information
#
#  ---------------------------------------------------------------------------

#   -------------------------------
#   1.  ENVIRONMENT CONFIGURATION
#   -------------------------------

#   Get the Git branch
#   ------------------------------------------------------------
    parse_git_branch() {
        git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
    }

#   Custom Bash Prompt
#   ------------------------------------------------------------

#   Custom bash prompt with custom character for the prompt, path, and Git branch name.
#   Source: kirsle.net/wizards/ps1.html
    export PS1="\n\[$(tput bold)\]\[$(tput setaf 5)\]➜ \[$(tput setaf 6)\]\w\[$(tput setaf 3)\]\$(parse_git_branch) \[$(tput sgr0)\]"
    export PATH=/opt/local/bin:/opt/local/sbin:${PATH}

#   Set Paths
#   ------------------------------------------------------------
    export PATH="$PATH:/usr/bin/"
    export PATH="$PATH:/usr/local/bin/"
    export PATH="$PATH:$HOME/.composer/vendor/bin"
    export PATH="$PATH:$HOME/.yarn/bin"
    export PATH="$HOME/.rvm/bin:$PATH" # Add RVM to PATH for scripting
    export PATH="$HOME/.rvm/gems/ruby-2.3.0/bin:$PATH"
    [[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

#   Set Default Editor (change 'sublime' to the editor of your choice)
#   ------------------------------------------------------------
    export EDITOR=/usr/local/bin/atom


#   -----------------------------
#   2.  MAKE TERMINAL BETTER
#   -----------------------------

eval "$(thefuck --alias fuck)"              # Fix previous command
cd() { builtin cd "$@"; ls; }               # Always list directory contents upon 'cd'

alias cd..='cd ../'                         # Go back 1 directory level (for fast typers)
alias ..='cd ../'                           # Go back 1 directory level
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 directory levels
alias edit='subl'                           # edit:   Opens any file in sublime editor
alias f='open -a Finder ./'                 # f:      Opens current directory in MacOS Finder
alias ~="cd ~"                              # ~:      Go Home
alias ghb='cd /Users/connorbaer/Development/GitHub'              # Go to 'GitHub' directory
alias mbc='cd /Users/connorbaer/Development/GitHub/madebyconnor' # Go to 'GitHub' directory
alias uwc='cd /Users/connorbaer/Development/GitHub/uwc'          # Go to 'GitHub' directory
alias gu='gulp'                                                   # Shortcut for 'gulp'
alias gs='gulp setup'                                            # Shortcut for 'gulp setup'
alias gd='gulp dist'                                             # Shortcut for 'gulp dist'

#   MAMP Variables
#   ------------------------------------------------------
alias php='/Applications/MAMP/bin/php/php7.0.12/bin/php'
alias pear='/Applications/MAMP/bin/php/php7.0.12/bin/pear'
alias pecl='/Applications/MAMP/bin/php/php7.0.12/bin/pecl'

#   Project Variables
#   ------------------------------------------------------
    alias uwcwk='ssh principal@46.101.203.64'           # Access Waterford's server
    alias uwcde='ssh connor_baer@91.90.146.160'         # Access UWC Deutschland's server
    alias connorbaer='ssh connorbaer@46.101.210.217'    # Access my personal server


#   -------------------------------
#   3.  FILE AND FOLDER MANAGEMENT
#   -------------------------------

#   extract:  Extract most know archives with one command
#   ---------------------------------------------------------
    extract () {
        if [ -f $1 ] ; then
          case $1 in
            *.tar.bz2)   tar xjf $1     ;;
            *.tar.gz)    tar xzf $1     ;;
            *.bz2)       bunzip2 $1     ;;
            *.rar)       unrar e $1     ;;
            *.gz)        gunzip $1      ;;
            *.tar)       tar xf $1      ;;
            *.tbz2)      tar xjf $1     ;;
            *.tgz)       tar xzf $1     ;;
            *.zip)       unzip $1       ;;
            *.Z)         uncompress $1  ;;
            *.7z)        7z x $1        ;;
            *)     echo "'$1' cannot be extracted via extract()" ;;
             esac
         else
             echo "'$1' is not a valid file"
         fi
    }


#   ---------------------------
#   4.  NETWORKING
#   ---------------------------

alias myip='curl ip.appspot.com'                    # myip:         Public facing IP Address
alias flushDNS='dscacheutil -flushcache'            # flushDNS:     Flush out the DNS Cache

#   ii:  display useful host related informaton
#   -------------------------------------------------------------------
    ii() {
        echo -e "\nYou are logged on ${RED}$HOST"
        echo -e "\nAdditionnal information:$NC " ; uname -a
        echo -e "\n${RED}Users logged on:$NC " ; w -h
        echo -e "\n${RED}Current date :$NC " ; date
        echo -e "\n${RED}Machine stats :$NC " ; uptime
        echo -e "\n${RED}Current network location :$NC " ; scselect
        echo -e "\n${RED}Public facing IP Address :$NC " ;myip
        #echo -e "\n${RED}DNS Configuration:$NC " ; scutil --dns
        echo
    }


#   ---------------------------------------
#   5.  SYSTEMS OPERATIONS & INFORMATION
#   ---------------------------------------

#   finderShowHidden:   Show hidden files in Finder
#   finderHideHidden:   Hide hidden files in Finder
#   -------------------------------------------------------------------
    alias finderShowHidden='defaults write com.apple.finder ShowAllFiles TRUE'
    alias finderHideHidden='defaults write com.apple.finder ShowAllFiles FALSE'
