import * as CryptoJS from 'crypto-js';
import { Block } from './block';
import { addBlock, createNewBlock } from './utils';

const genesisBlock: Block = new Block(
  0,
  '202020202020202020',
  '',
  'Hello11',
  345636
);

let blockChain: Block[] = [genesisBlock];

addBlock(blockChain, createNewBlock(blockChain, 'test'));
addBlock(blockChain, createNewBlock(blockChain, 'test2'));

export {};
