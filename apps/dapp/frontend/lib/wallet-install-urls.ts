/**
 * Chrome Web Store / direct install URLs for Stellar wallets.
 * Falls back to the wallet's homepage if no direct store URL is known.
 */
const CHROME_STORE_URLS: Record<string, string> = {
    freighter:
        "https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk",
    lobstr: "https://chromewebstore.google.com/detail/lobstr-signer-extension/ldiagbjmlmjiieclmdkagfopphkkhmkl",
    xbull: "https://chromewebstore.google.com/detail/xbull-wallet/hcnlegagnpfobmncgojollnoidjgdei",
    hana: "https://chromewebstore.google.com/detail/hana-wallet/jfdlamikmbghhapbgfoogdffldioobgl",
    rabet: "https://chromewebstore.google.com/detail/rabet/hidlcnlcpelkhdkoglfmcnfbnnafmlno",
};

export function getInstallUrl(walletId: string, fallbackUrl: string): string {
    return CHROME_STORE_URLS[walletId] || fallbackUrl;
}
