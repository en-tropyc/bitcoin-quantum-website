/**
 * The "Under the hood / Cryptography" dark band — shown on the home
 * page and on /protocol. Both surfaces want exactly the same content,
 * so it lives in one place. Pass an `id` so each host page can keep
 * its own anchor (e.g. "under" on home, "cryptography" on /protocol).
 */
const code = [
  '<span class="cm"># Generate a quantum-safe Dilithium address</span>',
  '<span class="cm"># and sign a testnet transaction.</span>',
  '',
  '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="fn">createwallet</span> <span class="st">&quot;main&quot;</span>',
  '{ <span class="st">&quot;name&quot;</span>: <span class="st">&quot;main&quot;</span> }',
  '',
  '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="kw">-rpcwallet=main</span> \\',
  '    <span class="fn">getnewdilithiumaddress</span>',
  '<span class="nm">tdbt1qk4xv…q7n</span>        <span class="cm"># Dilithium-bech32</span>',
  '',
  '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="kw">-rpcwallet=main</span> \\',
  '    <span class="fn">sendtoaddress</span> <span class="st">&quot;tdbt1qk4xv…q7n&quot;</span> <span class="nm">0.50</span>',
  '<span class="nm">8a7f…e2c1</span>',
  '',
  '<span class="cm"># Every spend signed with ML-DSA — quantum-safe.</span>',
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12 5 5L20 6" />
    </svg>
  );
}

export default function CryptographySection({ id = 'under' }: { id?: string }) {
  return (
    <section className="under section" id={id}>
      <div className="wrap">
        <div className="under-grid">
          <div className="reveal">
            <span className="eyebrow">Under the hood</span>
            <h2 className="h2">Cryptography that outlasts the quantum threat.</h2>
            <p className="lead">
              Every address is generated and spent with NIST-standardized post-quantum
              primitives — verifiable today, secure against the computers of tomorrow.
            </p>
            <ul>
              <li><CheckIcon /> CRYSTALS-Dilithium (ML-DSA, NIST FIPS&nbsp;204) signatures replace ECDSA</li>
              <li><CheckIcon /> Native <code>dilithium-bech32</code> and <code>dilithium-legacy</code> address formats</li>
              <li><CheckIcon /> Cryptographic agility — ready to adopt new NIST PQC standards</li>
            </ul>
          </div>
          <div className="code reveal d1">
            <div className="code-bar">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="fname">shell · btq-cli testnet</span>
            </div>
            <div className="code-body">
              {code.map((line, i) => (
                <span
                  key={i}
                  className="ln"
                  dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
