import { ConnectButton } from "@rainbow-me/rainbowkit";
export const GetStarted = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (() => {
          if (!connected) {
            return (
              <button onClick={openConnectModal} type="button" className="z-20 relative rounded-full w-full h-full bg-gradient-to-b from-[#621d1d52] to-[#DE082D4D] font-light">
                Get Started
              </button>
            );
          }

          return;
        })();
      }}
    </ConnectButton.Custom>
  );
};

export default GetStarted;
