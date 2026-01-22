import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi';
import { metaMask, walletConnect } from '@wagmi/connectors';

export const useWallet = () => {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({ address });
  const chainId = useChainId();

  const connectMetaMask = () => {
    const metaMaskConnector = connectors.find(
      (connector) => connector.id === 'metaMask'
    );
    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector });
    }
  };

  const connectWalletConnect = () => {
    const wcConnector = connectors.find(
      (connector) => connector.id === 'walletConnect'
    );
    if (wcConnector) {
      connect({ connector: wcConnector });
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  const formatBalance = (value: bigint | undefined): string => {
    if (!value) return '0';
    return (Number(value) / 1e18).toFixed(4);
  };

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isPending,
    isDisconnected,
    balance: formatBalance(balanceData?.value),
    chainId,
    connectMetaMask,
    connectWalletConnect,
    disconnectWallet,
  };
};
