import { getDefaultProvider, Wallet, utils } from 'ethers'; // ethers v5
import { Provider, TransactionResponse } from '@ethersproject/providers'; // ethers v5
import { ERC721Client } from '@imtbl/contracts';

const CONTRACT_ADDRESS = '0xdd68d31e0214a65c43c0dca08e5412685554e026';
const PRIVATE_KEY = 'my-private-key';
const TOKEN_ID1 = 1;
const TOKEN_ID2 = 2;
const TOKEN_ID3 = 3;

const provider = getDefaultProvider('https://rpc.testnet.immutable.com');

const mint = async (provider: Provider): Promise<TransactionResponse> => {
  // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  console.log('Contract instance created with address:', CONTRACT_ADDRESS);

  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  const requests = [
    {
      to: '0x59379B09118aD4E493dD1C469Bdd482e2f0B0AF8',
      tokenIds: [TOKEN_ID1, TOKEN_ID2, TOKEN_ID3],
    },
  ];

  const gasOverrides = {
    maxPriorityFeePerGas: 100e9, // 100 Gwei
    maxFeePerGas: 150e9,
    gasLimit: 200000,
  };

  const populatedTransaction = await contract.populateMintBatch(
    requests,
    gasOverrides
  );

  const result = await wallet.sendTransaction(populatedTransaction);
  console.log('Transaction sent, result:', result); // To get the TransactionResponse value
  return result;
};

mint(provider);
