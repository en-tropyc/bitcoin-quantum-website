import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const tableOfContents = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'starting-daemon', title: 'Starting BTQ Daemon' },
  { id: 'creating-wallet', title: 'Creating a Wallet' },
  { id: 'generating-address', title: 'Generating Mining Address' },
  { id: 'connecting-pool', title: 'Connecting to Mining Pool' },
  { id: 'monitoring', title: 'Monitoring Your Mining' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
  { id: 'quick-reference', title: 'Quick Reference' },
];

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-4">
      {title && (
        <div className="bg-[#1a2234] border border-[rgba(0,240,255,0.1)] border-b-0 rounded-t-lg px-4 py-2 text-sm text-white/60 font-dm-mono">
          {title}
        </div>
      )}
      <pre className={`bg-[#0a0e14] border border-[rgba(0,240,255,0.1)] ${title ? 'rounded-b-lg' : 'rounded-lg'} p-4 overflow-x-auto`}>
        <code className="text-sm font-dm-mono text-[#00f0ff]/90 whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mb-6 pt-8 border-t border-[rgba(0,240,255,0.1)] mt-12 first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl font-semibold mb-4 mt-8 text-white/90">
      {children}
    </h3>
  );
}

function Note({ type = 'info', children }: { type?: 'info' | 'warning' | 'critical'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-[rgba(0,240,255,0.08)] border-[rgba(0,240,255,0.2)] text-[#00f0ff]',
    warning: 'bg-[rgba(255,200,0,0.08)] border-[rgba(255,200,0,0.2)] text-yellow-400',
    critical: 'bg-[rgba(255,100,100,0.08)] border-[rgba(255,100,100,0.2)] text-red-400',
  };
  const icons = {
    info: 'i',
    warning: '!',
    critical: '!!',
  };

  return (
    <div className={`${styles[type]} border rounded-lg p-4 my-4 flex gap-3`}>
      <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
        {icons[type]}
      </span>
      <div className="text-sm text-white/80">{children}</div>
    </div>
  );
}

export default function MiningGuide() {
  const leftColumnCount = Math.ceil(tableOfContents.length / 2);
  const leftColumnItems = tableOfContents.slice(0, leftColumnCount);
  const rightColumnItems = tableOfContents.slice(leftColumnCount);

  return (
    <div className="min-h-screen bg-[#06080c] flex flex-col relative">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <header className="py-16 md:py-24 text-center">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] px-4 py-2 rounded-full font-dm-mono text-xs text-[#00f0ff] mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full" />
              Documentation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5">
              BTQ{' '}
              <span className="bg-gradient-to-r from-[#00f0ff] to-[#a78bfa] bg-clip-text text-transparent">
                Mining Guide
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10">
              Complete guide for setting up your BTQ wallet, running a node, and connecting to the mining pool.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/btq-ag/BTQ-Core/releases/tag/v0.1.0-testnet"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-3 bg-[#00f0ff] text-[#06080c] px-7 py-3.5 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3),0_0_60px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 transition-all"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span className="flex flex-col items-start leading-tight">
                  <span>Download Binaries</span>
                  <span className="text-xs font-normal opacity-70">Available for Windows & Linux</span>
                </span>
              </a>
              <Link
                href="/testnet"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-[rgba(0,240,255,0.1)] px-7 py-3.5 rounded-lg font-semibold hover:border-[rgba(0,240,255,0.25)] hover:bg-[#0c1017] transition-all"
              >
                Back to Testnet
              </Link>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <section className="py-8">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  {leftColumnItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-3 text-white/70 hover:text-[#00f0ff] transition-colors py-1"
                    >
                      <span className="text-[#00f0ff]/50 font-dm-mono text-sm">{index + 1}.</span>
                      <span className="text-sm">{item.title}</span>
                    </a>
                  ))}
                </div>
                {rightColumnItems.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {rightColumnItems.map((item, index) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-3 text-white/70 hover:text-[#00f0ff] transition-colors py-1"
                      >
                        <span className="text-[#00f0ff]/50 font-dm-mono text-sm">
                          {leftColumnCount + index + 1}.
                        </span>
                        <span className="text-sm">{item.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-[900px] mx-auto px-6">

            {/* Prerequisites */}
            <SectionHeading id="prerequisites">Prerequisites</SectionHeading>

            <SubHeading>Required Software</SubHeading>
            <ul className="list-disc list-inside space-y-2 text-white/70 mb-6">
              <li>BTQ Core daemon (<code className="text-[#00f0ff] bg-[#0a0e14] px-1.5 py-0.5 rounded">btqd</code> and <code className="text-[#00f0ff] bg-[#0a0e14] px-1.5 py-0.5 rounded">btq-cli</code>)</li>
              <li>BTQ-CCMiner (<code className="text-[#00f0ff] bg-[#0a0e14] px-1.5 py-0.5 rounded">ccminer</code>)</li>
              <li>Access to a <a href="https://pool.bitcoinquantum.com" className="text-[#00f0ff] hover:underline" target="_blank" rel="noopener noreferrer">BTQ mining pool</a></li>
            </ul>

            <Note type="info">
              After downloading the binaries, you must change the file permissions to make them executable using <code className="text-[#00f0ff]">chmod +x</code>.
            </Note>

            <SubHeading>System Requirements</SubHeading>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Linux/WSL or UNIX environment (including macOS)</li>
              <li>NVIDIA GPU with CUDA 11 support (for GPU mining)</li>
            </ul>

            {/* Starting BTQ Daemon */}
            <SectionHeading id="starting-daemon">Starting BTQ Daemon</SectionHeading>

            <SubHeading>1. Create Configuration Directory</SubHeading>
            <p className="text-white/70 mb-4">Create the BTQ data directory where configuration and blockchain data will be stored:</p>
            <CodeBlock>mkdir -p ~/.btq</CodeBlock>

            <SubHeading>2. Create Configuration File</SubHeading>
            <p className="text-white/70 mb-4">Create the BTQ configuration file at <code className="text-[#00f0ff] bg-[#0a0e14] px-1.5 py-0.5 rounded">~/.btq/btq.conf</code>:</p>

            <CodeBlock title="Testnet Configuration (Recommended for Testing)">{`cat > ~/.btq/btq.conf << EOF
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
addnode=13.53.68.231:19333
EOF`}</CodeBlock>

            <CodeBlock title="Mainnet Configuration">{`cat > ~/.btq/btq.conf << EOF
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
EOF`}</CodeBlock>

            <Note type="warning">
              <strong>Security Note:</strong> Change <code className="text-[#00f0ff]">rpcuser</code> and <code className="text-[#00f0ff]">rpcpassword</code> to strong, unique values in production!
            </Note>

            <SubHeading>3. Start BTQ Daemon</SubHeading>
            <p className="text-white/70 mb-4">Navigate to your BTQ Core directory and start the daemon:</p>

            <CodeBlock title="For Testnet">{`./btqd -daemon -testnet`}</CodeBlock>
            <CodeBlock title="For Mainnet">{`./btqd -daemon`}</CodeBlock>
            <CodeBlock title="For Regtest (Local Testing)">{`./btqd -daemon -regtest`}</CodeBlock>

            <SubHeading>4. Verify Daemon is Running</SubHeading>
            <CodeBlock>{`# Check blockchain info
./btq-cli -testnet getblockchaininfo

# Check network info
./btq-cli -testnet getnetworkinfo

# View debug log
tail -f ~/.btq/testnet3/debug.log`}</CodeBlock>

            {/* Creating a Wallet */}
            <SectionHeading id="creating-wallet">Creating a Wallet</SectionHeading>

            <SubHeading>1. Create a New Wallet</SubHeading>
            <CodeBlock title="For Testnet">{`./btq-cli -testnet createwallet "dilithium_wallet"`}</CodeBlock>
            <CodeBlock title="For Mainnet">{`./btq-cli createwallet "my_mining_wallet"`}</CodeBlock>

            <p className="text-white/70 my-4">Expected output:</p>
            <CodeBlock>{`{
  "name": "dilithium_wallet"
}`}</CodeBlock>

            <SubHeading>2. Verify Wallet Creation</SubHeading>
            <CodeBlock>{`# List all wallets
./btq-cli -testnet listwallets

# Get wallet info
./btq-cli -testnet -rpcwallet=dilithium_wallet getwalletinfo`}</CodeBlock>

            <SubHeading>3. Backup Your Wallet</SubHeading>
            <CodeBlock>{`# Backup wallet file
cp ~/.btq/testnet3/wallets/dilithium_wallet/wallet.dat ~/wallet_backup_$(date +%Y%m%d).dat

# Or use built-in backup
./btq-cli -testnet -rpcwallet=dilithium_wallet backupwallet ~/wallet_backup.dat`}</CodeBlock>

            <Note type="critical">
              <strong>CRITICAL:</strong> Store this backup in a secure location. Loss of this file means loss of funds!
            </Note>

            {/* Generating Mining Address */}
            <SectionHeading id="generating-address">Generating Mining Address</SectionHeading>
            <p className="text-white/70 mb-6">BTQ supports quantum-resistant Dilithium addresses. These are recommended for mining.</p>

            <SubHeading>Dilithium Address (Recommended for Mining)</SubHeading>
            <CodeBlock title="For Testnet">{`./btq-cli -testnet -rpcwallet=dilithium_wallet getnewdilithiumaddress`}</CodeBlock>
            <CodeBlock title="For Mainnet">{`./btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "dilithium-legacy"`}</CodeBlock>

            <p className="text-white/70 my-4">Example output:</p>
            <CodeBlock>n5KchJ9AJaiHRkLpKF7Bx8dbjsgt1CZdC4</CodeBlock>

            <SubHeading>Other Address Types</SubHeading>
            <CodeBlock title="Dilithium Bech32 (Quantum-Resistant, Modern)">{`./btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "dilithium-bech32"`}</CodeBlock>
            <CodeBlock title="Legacy (Standard Bitcoin-style)">{`./btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "legacy"`}</CodeBlock>
            <CodeBlock title="Bech32 (Native SegWit)">{`./btq-cli -rpcwallet=my_mining_wallet getnewaddress "" "bech32"`}</CodeBlock>

            <SubHeading>Save Your Address</SubHeading>
            <CodeBlock>{`# Export to a file for safekeeping
./btq-cli -testnet -rpcwallet=dilithium_wallet getnewdilithiumaddress > ~/my_btq_mining_address.txt

# View your address
cat ~/my_btq_mining_address.txt`}</CodeBlock>

            <Note type="info">
              This is where your mining rewards will be sent. Keep it safe!
            </Note>

            {/* Connecting to Mining Pool */}
            <SectionHeading id="connecting-pool">Connecting to Mining Pool</SectionHeading>

            <div className="bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Mining Pool Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/50">Pool Address:</span>
                  <span className="ml-2 font-dm-mono text-[#00f0ff]">16.16.123.185</span>
                </div>
                <div>
                  <span className="text-white/50">Port:</span>
                  <span className="ml-2 font-dm-mono text-[#00f0ff]">3333</span>
                </div>
              </div>
            </div>

            <SubHeading>1. Prepare CCMiner</SubHeading>
            <CodeBlock>{`# Change permissions to executable
chmod +x ~/.btq/ccminer

# Install prerequisites (if needed)
sudo apt-get update
sudo apt-get install -y libjansson4`}</CodeBlock>

            <SubHeading>2. Connect to Mining Pool</SubHeading>
            <CodeBlock title="Basic Command">{`./ccminer -a sha256d \\
  -o stratum+tcp://POOL_IP:PORT \\
  -u YOUR_BTQ_ADDRESS \\
  -p x`}</CodeBlock>

            <CodeBlock title="Example with Actual Values">{`./ccminer -a sha256d \\
  -o stratum+tcp://16.16.123.185:3333 \\
  -u n5KchJ9AJaiHRkLpKF7Bx8dbjsgt1CZdC4 \\
  -p x`}</CodeBlock>

            <SubHeading>3. Expected Output</SubHeading>
            <p className="text-white/70 mb-4">When successfully connected, you should see:</p>
            <CodeBlock>{`*** ccminer 2.3.1 for nVidia GPUs by tpruvot@github ***
    Built with the nVidia CUDA Toolkit 11.5 64-bits

[2025-11-24 12:06:48] Starting on stratum+tcp://16.16.123.185:3333
[2025-11-24 12:06:48] NVML GPU monitoring enabled.
[2025-11-24 12:06:48] 1 miner thread started, using 'sha256d' algorithm.
[2025-11-24 12:06:49] Stratum difficulty set to 0.01
[2025-11-24 12:06:49] GPU #0: Intensity set to 25, 33554432 cuda threads
[2025-11-24 12:06:50] GPU #0: NVIDIA GeForce RTX 3090 Ti, 4196.47 MH/s
[2025-11-24 12:06:52] accepted: 1/1 (diff 2.369), 4207.80 MH/s yay!!!`}</CodeBlock>

            <SubHeading>4. Advanced CCMiner Options</SubHeading>
            <CodeBlock title="Use Specific GPU">{`./ccminer -a sha256d \\
  -o stratum+tcp://16.16.123.185:3333 \\
  -u YOUR_ADDRESS \\
  -p x \\
  -d 0  # Use GPU 0`}</CodeBlock>

            <CodeBlock title="Adjust Intensity (0-31)">{`./ccminer -a sha256d \\
  -o stratum+tcp://16.16.123.185:3333 \\
  -u YOUR_ADDRESS \\
  -p x \\
  -i 25  # Intensity 25`}</CodeBlock>

            <CodeBlock title="Run in Background">{`nohup ./ccminer -a sha256d \\
  -o stratum+tcp://16.16.123.185:3333 \\
  -u YOUR_ADDRESS \\
  -p x > miner.log 2>&1 &`}</CodeBlock>

            {/* Monitoring Your Mining */}
            <SectionHeading id="monitoring">Monitoring Your Mining</SectionHeading>

            <SubHeading>Check Wallet Balance</SubHeading>
            <CodeBlock>{`# Check total balance
./btq-cli -testnet -rpcwallet=dilithium_wallet getbalance

# Check unconfirmed balance
./btq-cli -testnet -rpcwallet=dilithium_wallet getunconfirmedbalance

# List recent transactions
./btq-cli -testnet -rpcwallet=dilithium_wallet listtransactions`}</CodeBlock>

            <SubHeading>Understanding Mining Output</SubHeading>
            <div className="bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-xl p-6 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <code className="text-[#00f0ff] font-dm-mono w-24">MH/s</code>
                  <span className="text-white/70">Mega-hashes per second (your mining speed)</span>
                </div>
                <div className="flex gap-4">
                  <code className="text-[#00f0ff] font-dm-mono w-24">accepted</code>
                  <span className="text-white/70">Number of valid shares submitted</span>
                </div>
                <div className="flex gap-4">
                  <code className="text-[#00f0ff] font-dm-mono w-24">diff</code>
                  <span className="text-white/70">Current difficulty level</span>
                </div>
                <div className="flex gap-4">
                  <code className="text-[#00f0ff] font-dm-mono w-24">yay!!!</code>
                  <span className="text-white/70">Successfully found a share/block</span>
                </div>
              </div>
            </div>

            <SubHeading>Check Network Status</SubHeading>
            <CodeBlock>{`# Current block height
./btq-cli -testnet getblockcount

# Connection count
./btq-cli -testnet getconnectioncount

# Peer info
./btq-cli -testnet getpeerinfo`}</CodeBlock>

            {/* Troubleshooting */}
            <SectionHeading id="troubleshooting">Troubleshooting</SectionHeading>

            <SubHeading>Daemon Won&apos;t Start</SubHeading>
            <CodeBlock>{`# Check if already running
ps aux | grep btqd

# Kill existing process
killall btqd

# Check debug log for errors
tail -100 ~/.btq/debug.log

# Start with verbose logging
./btqd -daemon -debug`}</CodeBlock>

            <SubHeading>Can&apos;t Connect to Mining Pool</SubHeading>
            <CodeBlock>{`# Test connectivity
ping 16.16.123.185
telnet 16.16.123.185 3333

# Check firewall (if running pool)
sudo ufw status
sudo ufw allow 3333/tcp`}</CodeBlock>

            <SubHeading>Wrong Network Mode</SubHeading>
            <CodeBlock>{`# Check current chain
./btq-cli getblockchaininfo | grep chain

# Stop daemon
./btq-cli stop

# Start in correct mode
./btqd -daemon              # Mainnet
./btqd -daemon -testnet     # Testnet
./btqd -daemon -regtest     # Regtest`}</CodeBlock>

            <SubHeading>RPC Authentication Errors</SubHeading>
            <CodeBlock>{`# Stop daemon
./btq-cli stop

# Edit config and fix credentials
nano ~/.btq/btq.conf

# Restart with explicit credentials
./btqd -daemon -rpcuser=btquser -rpcpassword=btqpass123`}</CodeBlock>

            <SubHeading>Low Mining Performance</SubHeading>
            <CodeBlock>{`# Check GPU usage
nvidia-smi

# Check thermal throttling
nvidia-smi -q -d TEMPERATURE

# Increase intensity (try 25-28)
./ccminer -a sha256d -o ... -i 28`}</CodeBlock>

            {/* Quick Reference */}
            <SectionHeading id="quick-reference">Quick Reference</SectionHeading>

            <SubHeading>Network Ports</SubHeading>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(0,240,255,0.1)]">
                    <th className="text-left py-3 px-4 text-white/50 font-medium">Network</th>
                    <th className="text-left py-3 px-4 text-white/50 font-medium">RPC Port</th>
                    <th className="text-left py-3 px-4 text-white/50 font-medium">P2P Port</th>
                    <th className="text-left py-3 px-4 text-white/50 font-medium">Address Prefix</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-[rgba(0,240,255,0.05)]">
                    <td className="py-3 px-4">Mainnet</td>
                    <td className="py-3 px-4 font-dm-mono text-[#00f0ff]">8334</td>
                    <td className="py-3 px-4 font-dm-mono text-[#00f0ff]">9333</td>
                    <td className="py-3 px-4 font-dm-mono">b, D, dbtc</td>
                  </tr>
                  <tr className="border-b border-[rgba(0,240,255,0.05)]">
                    <td className="py-3 px-4">Testnet</td>
                    <td className="py-3 px-4 font-dm-mono text-[#00f0ff]">18334</td>
                    <td className="py-3 px-4 font-dm-mono text-[#00f0ff]">19333</td>
                    <td className="py-3 px-4 font-dm-mono">n, tdbt</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Regtest</td>
                    <td className="py-3 px-4 font-dm-mono text-[#00f0ff]">18443</td>
                    <td className="py-3 px-4 font-dm-mono text-[#00f0ff]">19444</td>
                    <td className="py-3 px-4 font-dm-mono">n, rdbt</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SubHeading>Common Commands</SubHeading>
            <CodeBlock title="Wallet Operations">{`# Create wallet
./btq-cli -testnet createwallet "wallet_name"

# Generate dilithium address
./btq-cli -testnet -rpcwallet=wallet_name getnewdilithiumaddress

# Check balance
./btq-cli -testnet -rpcwallet=wallet_name getbalance

# List transactions
./btq-cli -testnet -rpcwallet=wallet_name listtransactions

# Backup wallet
./btq-cli -testnet -rpcwallet=wallet_name backupwallet ~/backup.dat`}</CodeBlock>

            <CodeBlock title="Mining Operations">{`# Start mining
./ccminer -a sha256d -o stratum+tcp://POOL:3333 -u ADDRESS -p x

# Mine in background
nohup ./ccminer -a sha256d -o stratum+tcp://POOL:3333 -u ADDRESS -p x > miner.log 2>&1 &

# Check mining log
tail -f miner.log

# Stop background miner
pkill ccminer`}</CodeBlock>

            <CodeBlock title="Node Operations">{`# Start daemon
./btqd -daemon -testnet

# Stop daemon
./btq-cli -testnet stop

# Get blockchain info
./btq-cli -testnet getblockchaininfo

# Get network info
./btq-cli -testnet getnetworkinfo

# View log
tail -f ~/.btq/testnet3/debug.log`}</CodeBlock>

            {/* Security Best Practices */}
            <div className="bg-gradient-to-br from-[rgba(0,240,255,0.08)] to-[rgba(167,139,250,0.08)] border border-[rgba(0,240,255,0.1)] rounded-2xl p-8 mt-12">
              <h3 className="text-xl font-bold mb-6">Security Best Practices</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex gap-3">
                  <span className="text-[#00f0ff]">1.</span>
                  <span><strong className="text-white">Backup Your Wallet:</strong> Always keep encrypted backups in multiple locations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00f0ff]">2.</span>
                  <span><strong className="text-white">Secure RPC:</strong> Use strong passwords and restrict RPC access to localhost</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00f0ff]">3.</span>
                  <span><strong className="text-white">Firewall:</strong> Only open necessary ports (pool ports, P2P if running full node)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00f0ff]">4.</span>
                  <span><strong className="text-white">Keep Private Keys Secure:</strong> Never share wallet.dat or private keys</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00f0ff]">5.</span>
                  <span><strong className="text-white">Update Regularly:</strong> Keep BTQ Core and mining software up to date</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00f0ff]">6.</span>
                  <span><strong className="text-white">Monitor Access:</strong> Regularly check logs for unauthorized access attempts</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Help CTA */}
        <section className="py-20">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-2xl p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Need Help?</h2>
              <p className="text-white/60 text-lg max-w-lg mx-auto mb-8">
                Join our Telegram community to get support, report bugs, and connect with other miners.
              </p>
              <a
                href="https://t.me/+bE6I4gqX4Vo1ODJh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00f0ff] text-[#06080c] px-7 py-3.5 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3),0_0_60px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 transition-all"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
