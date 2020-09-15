@echo off
set os=%1
set mode=%2
set type=%3

if %mode% == "i" (
    if "%os%" == "linux" (
        npm i discord.js fs ascii-table ytdl-core @discordjs/opus simple-youtube-api
    ) else if "%os%" == "windows" (
        echo oof
    )
) else if "%mode%" == "u" (
    echo hi
) else if "%mode%" == "s" (
    if "%type%" == "" (
       :start
          node .
    ) else if "%type%" == "dev" (
       nodemon .
    )
)