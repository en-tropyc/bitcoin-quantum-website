# BTQ Mining Guide

Complete guide for setting up BTQ wallet and connecting to mining pool.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Starting BTQ Daemon](#starting-btq-daemon)
3. [Creating a Wallet](#creating-a-wallet)
4. [Generating Mining Address](#generating-mining-address)
5. [Connecting to Mining Pool](#connecting-to-mining-pool)
6. [Monitoring Your Mining](#monitoring-your-mining)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- BTQ Core daemon (`btqd` and `btq-cli`)
- BTQ-CCMiner https://github.com/btq-ag/btq-cc-minter (`ccminer`)
- Access to a BTQ mining pool
- *Important* once you have downloaded the binary versions, proceed to change the file permissions to an executable file. These are the essential programs we'll be interacting with the BTQ blockchain and mining software to use.

### System Requirements
- Linux/WSL or UNIX environment (incuding OSX)
- NVIDIA GPU with CUDA support (for GPU mining)


###Internal Notes: GPUs for Rent
- In case you do not have a GPU on your own device, leverage the cloud GPU rental platform Vast AI to rent a GPU. Link: https://cloud.vast.ai/?gpu_option=RTX%203090
- You can rent a 3090 here for about $3 a day, but generally anything 10 series (1060, 1070, 1080) or newer is ok. We've tested with 2060s and 2090s with no problems.
- *IMPORTANT* On our own tests, we had to select machines with CUDA versions 'cuda-11.8.0-auto' to avoid compabitlity issues. To filter for this on cloud.vast.ai, click 'change template'. choose 'NVIDIA CUDA' and click 'edit', filter the 'version tag' to 11.8.0, and click 'create & use'.

---

## Starting BTQ Daemon

### 1. Create Configuration File
// this instruction creates the directory, .btq, we will be interacting with most of the time and where the required softwares are stored.

```bash
mkdir -p ~/.btq
```

Create the BTQ configuration file at `~/.btq/btq.conf`:
// config for mainnet
```bash

cat > ~/.btq/btq.conf << EOF
# RPC Settings
server=1
rpcuser=btquser
rpcpassword=btqpass123
rpcallowip=127.0.0.1
rpcbind=127.0.0.1

# Network Settings
listen=1

# Other Settings
daemon=1
EOF
```
// config for testnet, we've been testing this one for now

```bash
cat > ~/.btq/btq.conf << EOF
# BTQ Configuration File

# Global settings
server=1
daemon=1

# Testnet-specific settings
[test]
rpcuser=btquser
rpcpassword=btqpass123
rpcallowip=127.0.0.1
rpcport=18334
rpcbind=127.0.0.1
port=19333
listen=1
gen=0
maxconnections=50
EOF
```

**Security Note**: Change `rpcuser` and `rpcpassword` to strong, unique values in production!

###*Important* (SKIP if using downloaded built versions, required for GitHub unbuilt versions) 

Internal Notes: Build instructions when downloading the directory and un-built version of BTQ-Core

In directory BTQ-Core, make sure your machine and folder has necessary tools to build the daemon with autogen and configure commands

```bash
sudo apt-get update
sudo apt-get install \
  build-essential \
  libtool \
  autotools-dev \
  automake \
  pkg-config \
  libssl-dev \
  libevent-dev \
  bsdmainutils \
  python3 \
  libboost-system-dev \
  libboost-filesystem-dev \
  libboost-chrono-dev \
  libboost-test-dev \
  libboost-thread-dev \
  libsqlite3-dev

sudo apt-get install libprotobuf-dev protobuf-compiler
sudo apt-get install libqrencode-dev
sudo apt-get install libminiupnpc-dev

sudo apt update && sudo apt install libnatpmp1 libnatpmp-dev 
```
// added libnatpmp on 12/29

Build BTQ Core - UNIX BUILD (or whatever OS people are using)
To Build:
./autogen.sh
./configure
make # use "-j N" for N parallel jobs
make install # optional
```

### 2. Start BTQ Daemon

// *important* make sure the (`btqd` and `btq-cli`) files are located in the .btq folder we created above, and modify the file paths below to match your filepath to call the commands. E.g., replace ./src with the filepath you have or create a src folder in .btq to match the filepath.

**For Mainnet:**
```bash
cd ~/btq/BTQ-Core
./src/btqd -daemon
```

**For Testnet:**
```bash
./src/btqd -daemon -testnet
```

**For Regtest (Local Testing):**
```bash
./src/btqd -daemon -regtest
```

### 3. Verify Daemon is Running

```bash
# Check blockchain info
./src/btq-cli getblockchaininfo

# Check network info
./src/btq-cli getnetworkinfo

# View debug log
tail -f ~/.btq/debug.log

# testnet flag if using the BTQ testnet daemon
./src/btq-cli -testnet getblockinfo
```
// getblockinfo wasn't working for me 12/29

**Expected Output:**
```json
{
  "chain": "main",
  "blocks": 0,
  "headers": 0,
  "bestblockhash": "00004e49ccbf1f195f34f5fe088d8edb2c7d074fadcd575b46a6d445d20942a1",
  ...
}
```

---

## Creating a Wallet

### 1. Create a New Wallet

**For Mainnet:**
```bash
./src/btq-cli createwallet "my_mining_wallet"
```

**For Testnet:**
```bash
./src/btq-cli -testnet createwallet "dilithium_wallet"
```

**Expected Output:**
```json
{
  "name": "my_mining_wallet"
}
```

### 2. Verify Wallet Creation

```bash
# List all wallets
./src/btq-cli listwallets

# Get wallet info
./src/btq-cli -rpcwallet=my_mining_wallet getwalletinfo
```

### 3. Backup Your Wallet (IMPORTANT!)

```bash
# Backup wallet file
cp ~/.btq/wallets/my_mining_wallet/wallet.dat ~/wallet_backup_$(date +%Y%m%d).dat

# Or use built-in backup
./src/btq-cli -rpcwallet=my_mining_wallet backupwallet ~/wallet_backup.dat
```

**⚠️ CRITICAL**: Store this backup in a secure location. Loss of this file means loss of funds!

---

## Generating Mining Address

BTQ supports quantum-resistant Dilithium addresses. Here's how to generate them:

### Dilithium Legacy Address (Recommended for Mining)

**DWPKH, Updated 12/10:**
```bash
./btq-cli -testnet -rpcwallet=my_mining_wallet getnewdilithiumaddress
```

**For Mainnet:**
```bash
./src/btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "dilithium-legacy"
```

**For Testnet:**
```bash
./src/btq-cli -testnet -rpcwallet=dilithium_wallet getnewaddress "" "dilithium-legacy"
```

**Example Output:**
```
n5KchJ9AJaiHRkLpKF7Bx8dbjsgt1CZdC4
```

### Other Address Types

**Dilithium Bech32 (Quantum-Resistant, Modern):**
```bash
./src/btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "dilithium-bech32"
```

**Legacy (Standard Bitcoin-style):**
```bash
./src/btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "legacy"
```

**Bech32 (Native SegWit):**
```bash
./src/btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "bech32"
```

### Save Your Address

```bash
# Export to a file for safekeeping
./src/btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "dilithium-legacy" > ~/my_btq_mining_address.txt

# View your address
cat ~/my_btq_mining_address.txt
```

**Important**: This is where your mining rewards will be sent. Keep it safe!

---

## Connecting to Mining Pool

### Mining Pool Details

- **Pool Address**: `16.16.123.185`
- **Port**: `3333`

### 1. Install/Locate CCMiner

### *important* Prequiisites
- Make sure you review the permissions of the file and set this as an executable file. E.g., chmod +x ~/.btq/ccminer
- download pre-requisites to run ccminer

```bash
# change permissions to executable file
chmod +x ~/.btq/ccminer

# download any pre-requisites required, for me I had to:
apt-get update
apt-get install -y libjansson4
```

If ccminer is already built:
```bash
~/.btq/ccminer/ccminer --version
```

If not installed, build it:
```bash
cd ~/btq/ccminer
./build.sh
```

### 2. Connect to Mining Pool

**Basic Command:**
```bash
~/.btq/ccminer/ccminer -a sha256d \
  -o stratum+tcp://POOL_IP:PORT \
  -u YOUR_BTQ_ADDRESS \
  -p x
```

**Example with actual values:**
```bash
~/.btq/ccminer/ccminer -a sha256d \
  -o stratum+tcp://16.16.123.185:3333 \
  -u n5KchJ9AJaiHRkLpKF7Bx8dbjsgt1CZdC4 \
  -p x
```

### 3. Expected Output

When successfully connected:
```
*** ccminer 2.3.1 for nVidia GPUs by tpruvot@github ***
    Built with the nVidia CUDA Toolkit 11.5 64-bits

[2025-11-24 12:06:48] Starting on stratum+tcp://16.16.123.185:3333
[2025-11-24 12:06:48] NVML GPU monitoring enabled.
[2025-11-24 12:06:48] 1 miner thread started, using 'sha256d' algorithm.
[2025-11-24 12:06:49] Stratum difficulty set to 0.01
[2025-11-24 12:06:49] GPU #0: Intensity set to 25, 33554432 cuda threads
[2025-11-24 12:06:50] GPU #0: NVIDIA GeForce RTX 3090 Ti, 4196.47 MH/s
[2025-11-24 12:06:52] accepted: 1/1 (diff 2.369), 4207.80 MH/s yay!!!
```

### 4. Advanced CCMiner Options

**Set specific GPU:**
```bash
~/.btq/ccminer/ccminer -a sha256d \
  -o stratum+tcp://16.16.123.185:3333 \
  -u YOUR_ADDRESS \
  -p x \
  -d 0  # Use GPU 0
```

**Adjust intensity (0-31, higher = more intensive):**
```bash
~/.btq/ccminer/ccminer -a sha256d \
  -o stratum+tcp://16.16.123.185:3333 \
  -u YOUR_ADDRESS \
  -p x \
  -i 25  # Intensity 25
```

**Run in background:**
```bash
nohup ~/.btq/ccminer/ccminer -a sha256d \
  -o stratum+tcp://16.16.123.185:3333 \
  -u YOUR_ADDRESS \
  -p x > miner.log 2>&1 &
```

---

## Monitoring Your Mining

### Check Wallet Balance

```bash
# Check total balance
./src/btq-cli -rpcwallet=my_mining_wallet getbalance

# Check unconfirmed balance
./src/btq-cli -rpcwallet=my_mining_wallet getunconfirmedbalance

# List recent transactions
./src/btq-cli -rpcwallet=my_mining_wallet listtransactions
```

### Monitor Mining Performance

**In CCMiner output:**
- **MH/s**: Mega-hashes per second (your mining speed)
- **accepted**: Number of valid shares submitted
- **diff**: Current difficulty
- **yay!!!**: Successfully found a share/block

**Example:**
```
[2025-11-24 12:06:52] accepted: 1/1 (diff 2.369), 4207.80 MH/s yay!!! solved: 1
```

### Check Network Status

```bash
# Current block height
./src/btq-cli getblockcount

# Connection count
./src/btq-cli getconnectioncount

# Peer info
./src/btq-cli getpeerinfo
```

### View Mining Pool Stats

Most pools provide a web interface:
```
http://POOL_IP:4000/api/pools/btq-test
```

// is this supposed to work or we can view on the BTQ explorer?
---

## Troubleshooting

### Daemon Won't Start

**Problem**: `btqd` fails to start

**Solutions:**
```bash
# Check if already running
ps aux | grep btqd

# Kill existing process
killall btqd

# Check debug log for errors
tail -100 ~/.btq/debug.log

# Start with verbose logging
./src/btqd -daemon -debug
```

### Can't Connect to Mining Pool

**Problem**: CCMiner shows "Connection refused" or hangs

**Solutions:**

1. **Verify pool is running:**
```bash
# On pool server
ps aux | grep Miningcore
ss -tuln | grep 3333
```

2. **Test connectivity:**
```bash
ping 16.16.123.185
telnet 16.16.123.185 3333
```

3. **Check firewall:**
```bash
# On pool server
sudo ufw status
sudo ufw allow 3333/tcp
```

4. **AWS Security Groups:**
   - Ensure port 3333 is open in your security group
   - Add inbound rule: TCP, port 3333, source 0.0.0.0/0

### Wrong Network Mode

**Problem**: Address validation fails or wallet shows wrong chain

**Solution:**
```bash
# Check current chain
./src/btq-cli getblockchaininfo | grep chain

# Stop daemon
./src/btq-cli stop

# Start in correct mode
./src/btqd -daemon              # Mainnet
./src/btqd -daemon -testnet     # Testnet  
./src/btqd -daemon -regtest     # Regtest
```

### RPC Authentication Errors

**Problem**: "Authorization failed: Incorrect rpcuser or rpcpassword"

**Solution:**
```bash
# Stop daemon
./src/btq-cli stop

# Edit config
nano ~/.btq/btq.conf

# Restart with explicit credentials
./src/btqd -daemon -rpcuser=btquser -rpcpassword=btqpass123
```

### Low Mining Performance

**Problem**: Hash rate is very low

**Solutions:**

1. **Check GPU usage:**
```bash
nvidia-smi
```

2. **Increase intensity:**
```bash
~/.btq/ccminer/ccminer -a sha256d -o ... -i 28
```

3. **Check thermal throttling:**
```bash
nvidia-smi -q -d TEMPERATURE
```

4. **Ensure proper drivers:**
```bash
nvidia-smi --query-gpu=driver_version --format=csv
```

### Wallet Issues

**Problem**: Can't access wallet or see balance

**Solutions:**

1. **List available wallets:**
```bash
./src/btq-cli listwallets
```

2. **Load wallet if not loaded:**
```bash
./src/btq-cli loadwallet "my_mining_wallet"
```

3. **Verify address belongs to wallet:**
```bash
./src/btq-cli -rpcwallet=my_mining_wallet getaddressinfo YOUR_ADDRESS
```

---

## Network-Specific Ports

| Network  | RPC Port | P2P Port | Address Prefix |
|----------|----------|----------|----------------|
| Mainnet  | 8334     | 9333     | b, D, dbtc     |
| Testnet  | 18334    | 19333    | n, tdbt        |
| Regtest  | 18443    | 19444    | n, rdbt        |

---

## Quick Reference Commands

### Wallet Operations
```bash
# Create wallet
./src/btq-cli createwallet "wallet_name"

# Generate dilithium address
./src/btq-cli -rpcwallet=wallet_name getnewaddress "" "dilithium-legacy"

# Check balance
./src/btq-cli -rpcwallet=wallet_name getbalance

# List transactions
./src/btq-cli -rpcwallet=wallet_name listtransactions

# Backup wallet
./src/btq-cli -rpcwallet=wallet_name backupwallet ~/backup.dat
```

### Mining Operations
```bash
# Start mining
~/.btq/ccminer/ccminer -a sha256d -o stratum+tcp://POOL:3333 -u ADDRESS -p x

# Mine in background
nohup ~/.btq/ccminer/ccminer -a sha256d -o stratum+tcp://POOL:3333 -u ADDRESS -p x > miner.log 2>&1 &

# Check mining log
tail -f miner.log

# Stop background miner
pkill ccminer
```

### Node Operations
```bash
# Start daemon
./src/btqd -daemon

# Stop daemon
./src/btq-cli stop

# Get blockchain info
./src/btq-cli getblockchaininfo

# Get network info
./src/btq-cli getnetworkinfo

# View log
tail -f ~/.btq/debug.log
```

---

## Security Best Practices

1. **Backup Your Wallet**: Always keep encrypted backups in multiple locations
2. **Secure RPC**: Use strong passwords and restrict RPC access to localhost
3. **Firewall**: Only open necessary ports (pool ports, P2P if running full node)
4. **Keep Private Keys Secure**: Never share wallet.dat or private keys
5. **Update Regularly**: Keep BTQ Core and mining software up to date
6. **Use Hardware Wallets**: For large amounts, consider hardware wallet integration
7. **Monitor Access**: Regularly check logs for unauthorized access attempts

---

## Additional Resources

- **BTQ Core Documentation**: `/btq/BTQ-Core/doc/`
- **Mining Pool Setup**: `/btq/miningcore/START_BTQ_POOL.md`
- **CCMiner Documentation**: `/btq/ccminer/README.md`

---

## Getting Help

If you encounter issues not covered in this guide:

1. Check debug logs: `~/.btq/debug.log`
2. Check mining pool logs
3. Verify network connectivity
4. Ensure all services are running
5. Check BTQ Core issue tracker
6. Join BTQ community channels

---

**Happy Mining! 🚀**


