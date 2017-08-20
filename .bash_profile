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
    function parse_git_dirty {
      [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit (working directory clean)" ]] && echo "*"
    }

    function parse_git_branch {
      git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* (.*)/[1$(parse_git_dirty)]/"
    }

    if [ -f $(brew --prefix)/etc/bash_completion ]; then
      . $(brew --prefix)/etc/bash_completion
    fi

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

cd() { builtin cd "$@"; ls -a; }               # Always list directory contents upon 'cd'

alias cd..='cd ../'                         # Go back 1 directory level (for fast typers)
alias ..='cd ../'                           # Go back 1 directory level
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 directory levels
alias edit='atom'                           # edit: Opens any file in Atom
alias f='open -a Finder ./'                 # f:    Opens current directory in Finder
alias ~="cd ~"                              # ~:    Go Home
alias ghb='cd ~/Developer/GitHub'           # Go to 'GitHub' directory
alias lcl='cd ~/Developer/Localhost'        # Go to 'Localhost' directory
alias gs='git status'                       # Shortcut for 'git status'
alias gl='git log -10 -oneline'             # Shortcut for a readable 'git log'


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
export PATH="~/anaconda/bin:$PATH"
