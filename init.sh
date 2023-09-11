#!/bin/bash

nodeInstalled="false"
pnpmInstalled="false"
npmInstalled="false"
psqlInstalled="false"

if ! command -v npm > /dev/null;
then
	echo " npm installation not found "
	exit
else 
	npmInstalled="true"
fi


if ! command -v node > /dev/null;
then
	echo " node installation not found "
	exit
else 
	nodeInstalled="true"
fi


if ! command -v pnpm > /dev/null;
then
	echo " pnpm installation not found "
	exit
else 
	pnpmInstalled="true"
fi


if ! command -v psql > /dev/null;
then
	echo " postgres installation not found "
	exit
else 
	psqlInstalled="true"
fi



if nodeInstalled=="true" && pnpmInstalled=="true" && npmInstalled=="true"
then
	cd bakkari/ && npm install 

	cd ..

    node bakkari/ &  
	cd ts_info/ && pnpm tauri dev
fi