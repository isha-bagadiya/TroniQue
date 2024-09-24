import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bitTorrent } from "wagmi/chains";

const bttcTestnet = {
  id: 1029, 
  name: 'BitTorrent Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BTT',
    symbol: 'BTT',
  },
  rpcUrls: {
    public: { http: ['https://pre-rpc.bt.io/'] },
    default: { http: ['https://pre-rpc.bt.io/'] },
  },
  blockExplorers: {
    default: { name: 'BTT Scan', url: 'https://testscan.bt.io' },
  },
}

export const config = getDefaultConfig({
  appName: "TroniQue",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [bitTorrent, bttcTestnet],
  ssr: true,
});