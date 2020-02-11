#!/bin/bash
BLUE='\033[0;34m'
BBLUE='\033[1;34m' #BOLD
PURPLE='\033[0;35m'
RED='\033[0;31m'
BRED='\033[1;31m' #BOLD
GREEN='\033[0;32m'
BGREEN='\033[1;32m' #BOLD
GRAY='\033[1;30m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building components...${NC}"
cd ./components
yarn build
cd ..

echo -en "${BLUE}Creating new folder in node_modules...${NC}"
rm -rf "./demos/showcase/node_modules/@pxblue/react-native-components"
mkdir -p "./demos/showcase/node_modules/@pxblue/react-native-components"
rm -rf "./demos/storybook/node_modules/@pxblue/react-native-components"
mkdir -p "./demos/storybook/node_modules/@pxblue/react-native-components"
rm -rf "./demos/api/node_modules/@pxblue/react-native-components"
mkdir -p "./demos/api/node_modules/@pxblue/react-native-components"
echo -e "${GREEN}Done${NC}"

echo -en "${BLUE}Copying build output into node_modules...${NC}";
cp -r ./package.json ./demos/showcase/node_modules/@pxblue/react-native-components/package.json
cp -r ./core ./demos/showcase/node_modules/@pxblue/react-native-components/core
cp -r ./package.json ./demos/storybook/node_modules/@pxblue/react-native-components/package.json
cp -r ./core ./demos/storybook/node_modules/@pxblue/react-native-components/core
cp -r ./package.json ./demos/api/node_modules/@pxblue/react-native-components/package.json
cp -r ./core ./demos/api/node_modules/@pxblue/react-native-components/core
echo -e "${GREEN}Done${NC}"

echo -en "\r\n${BRED}Linking Components: ${NC}"
if [ ! -f ./demos/showcase/node_modules/@pxblue/react-native-components/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./demos/showcase/node_modules/@pxblue/react-native-components/core ];
    then
        if [ ! -f ./demos/showcase/node_modules/@pxblue/react-native-components/core/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1; 
        fi;
fi
if [ ! -f ./demos/storybook/node_modules/@pxblue/react-native-components/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./demos/storybook/node_modules/@pxblue/react-native-components/core ];
    then
        if [ ! -f ./demos/storybook/node_modules/@pxblue/react-native-components/core/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1;
        fi;
fi
if [ ! -f ./demos/api/node_modules/@pxblue/react-native-components/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./demos/api/node_modules/@pxblue/react-native-components/core ];
    then
        if [ ! -f ./demos/api/node_modules/@pxblue/react-native-components/core/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1;
        fi;
fi
echo -e "${GRAY}Complete${NC}\r\n"
