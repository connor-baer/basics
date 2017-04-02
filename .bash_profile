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

#   Search History
#   ____________________________________________________________

#   Search command history using the up and down arrow keys.
#    Pasting this code might not work. If so, replace ^[[A/^[[B by pressing Escape-V to enter Verbatim Input mode. Then press the Up Arrow (or Down Arrow, depending on the line).

    bind '"[A":history-search-backward'
    bind '"[B":history-search-forward'

#   Set Paths
#   ------------------------------------------------------------
    export PATH="$PATH:/usr/bin/"
    export PATH="$PATH:/usr/local/bin/"
    # export PATH="$PATH:$HOME/.composer/vendor/bin"
    export PATH="$PATH:$HOME/.yarn/bin"
#    export DYLD_LIBRARY_PATH=`/usr/local/cuda/lib`:$DYLD_LIBRARY_PATH

#   Set Default Editor (change 'sublime' to the editor of your choice)
#   ------------------------------------------------------------
    export EDITOR=/usr/local/bin/atom


#   -----------------------------
#   2.  MAKE TERMINAL BETTER
#   -----------------------------

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
alias ghb='cd /Users/connorbaer/Developer/GitHub'              # Go to 'GitHub' directory
alias lcl='cd /Users/connorbaer/Developer/Localhost'           # Go to 'Localhost' directory
alias mbc='cd /Users/connorbaer/Developer/GitHub/madebyconnor' # Go to 'GitHub/madebyconnor' subdirectory
alias uwc='cd /Users/connorbaer/Developer/GitHub/uwc'          # Go to 'GitHub/uwc' subdirectory
alias gu='gulp'                                                  # Shortcut for 'gulp'
alias gs='gulp setup'                                            # Shortcut for 'gulp setup'
alias gd='gulp dist'                                             # Shortcut for 'gulp dist'

#   Project Variables
#   ------------------------------------------------------
    alias uwcwk='ssh principal@46.101.203.64'           # Access Waterford's server
    alias clients1='ssh root@46.101.68.85'              # Access clients1 server


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

# added by Anaconda3 4.3.0 installer
export PATH="/Users/connorbaer/anaconda/bin:$PATH"
