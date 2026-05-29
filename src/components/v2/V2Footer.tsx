import Link from 'next/link';

export default function V2Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v2/logo-dark.svg" alt="Bitcoin Quantum" className="footer-logo" />
            <p className="footer-blurb">
              Bitcoin for the post-quantum era. The same sound money, secured by cryptography
              built to outlast quantum computers.
            </p>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><a href="https://github.com/btq-ag/btq-core/blob/master/WHITEPAPER_INTEGRATION_DESIGN.md" target="_blank" rel="noopener noreferrer">Whitepaper</a></li>
              <li><Link href="/protocol">Protocol</Link></li>
              <li><Link href="/protocol#cryptography">Cryptography</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Network</h4>
            <ul>
              <li><Link href="/#roadmap">Roadmap</Link></li>
              <li><Link href="/testnet">Testnet</Link></li>
              <li><a href="https://explorer.bitcoinquantum.com" target="_blank" rel="noopener noreferrer">Block explorer</a></li>
              <li><a href="https://docs.bitcoinquantum.com/mining/guide" target="_blank" rel="noopener noreferrer">Run a node</a></li>
            </ul>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li><a href="https://github.com/btq-ag/btq-core" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://t.me/+bE6I4gqX4Vo1ODJh" target="_blank" rel="noopener noreferrer">Telegram</a></li>
              <li><a href="https://x.com/btc_quantum" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bitcoin Quantum. Open-source under MIT.</span>
          <span>bitcoinquantum.com</span>
        </div>
      </div>
    </footer>
  );
}
