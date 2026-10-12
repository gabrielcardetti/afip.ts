import { Agent } from "https";

/**
 * TLS ciphers for ARCA's web services.
 *
 * WSFE (servicios1.afip.gov.ar) negotiates TLS with a 1024-bit Diffie-Hellman key. OpenSSL 3.5 (Node 24+)
 * rejects it at its default security level with "dh key too small", so every request fails before reaching
 * the service. Security level 1 accepts it, matching what Node 20 and 22 did by default.
 */
export const ARCA_TLS_CIPHERS = "DEFAULT@SECLEVEL=1";

let sharedAgent: Agent | undefined;

/**
 * HTTPS agent used for every request the library makes to ARCA. It is the library's own agent: the host
 * application's global agent and its other connections are not affected.
 */
export const getArcaHttpsAgent = (): Agent => {
  if (!sharedAgent) {
    sharedAgent = new Agent({ keepAlive: true, ciphers: ARCA_TLS_CIPHERS });
  }
  return sharedAgent;
};
