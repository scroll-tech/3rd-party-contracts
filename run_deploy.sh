#!/bin/bash
set -uex

function init_config_file() {
  if [ ! -f ".env" ]; then
    echo "the file .env does not exist"
    exit 1
  fi
  source .env
  export $(cut -d= -f1 .env | grep -v '^\s*#')
}

function deploy_uni_v3_contracts() {
  pushd ./uniswap-v3
  yarn install
  mkdir -p ../output
  OUTPUT_FILE="../output/uniswap_v3_deploy.txt"
  export DEPLOY_RESULT=$(yarn start --private-key 0x$PRIVATE_KEY --json-rpc $RPC_URL --weth9-address $WETH9_ADDRESS --native-currency-label ETH --owner-address $OWNER_ADDRESS --confirmations 1 > $OUTPUT_FILE)
  popd
}

function deploy_uni_v2_contracts() {
  pushd ./uniswap-v2
  yarn install
  mkdir -p ../output
  OUTPUT_FILE="../output/uniswap_v2_deploy.txt"
  export DEPLOY_RESULT=$(npx hardhat run scripts/deploy_uniswap_v2.js > $OUTPUT_FILE)
  popd
}

init_config_file
deploy_uni_v3_contracts
deploy_uni_v2_contracts
