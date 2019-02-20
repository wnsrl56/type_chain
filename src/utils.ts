import * as CryptoJS from 'crypto-js';
import { Block } from './block';

const reduce = <T extends any>(fn: Function, acc: any, iter?: any): any => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const item of iter) {
    acc = fn(acc, item);
  }
  return acc;
};

const go = (...args) => reduce((v, fn) => fn(v), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const curry = f => (iter, ..._) =>
  _.length ? f(iter, ..._) : (..._) => f(iter, ..._);

const getItemList = <T extends any>(list: T[]): T[] => list;
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const getBlockChain = (iter: Block[]): Block[] =>
  iter ? getItemList(iter) : [];

const getLastetBlock = (iter: Block[]): Block => {
  const bc = getBlockChain(iter);
  return bc[bc.length - 1];
};

const addBlock = (iter: Block[], candidateBlock: Block): void => {
  const bc = getBlockChain(iter);
  if (isBlockValid(candidateBlock, getLastetBlock(iter)))
    bc.push(candidateBlock);
};

const calculateBlockHash = <T extends string | number>(rest: T[]): string => {
  return CryptoJS.SHA256(
    rest.map(v => String(v)).reduce((a, c) => a + c)
  ).toString();
};

const validateStructure = (aBlock: Block): boolean => {
  const { index, hash, prevHash, data, timestamp } = aBlock;
  return (
    typeof index === 'number' &&
    typeof hash === 'string' &&
    typeof prevHash === 'string' &&
    typeof data === 'string' &&
    typeof timestamp === 'number'
  );
};

const createNewBlock = (iter: Block[], data: string): Block => {
  const { index: prevIndex, hash: prevHash } = getLastetBlock(iter);
  const newIndex: number = prevIndex + 1;
  const nextTimestamp: number = getNewTimeStamp();
  const newHash: string = calculateBlockHash([
    newIndex,
    prevHash,
    nextTimestamp,
    data
  ]);
  return new Block(newIndex, newHash, prevHash, data, nextTimestamp);
};

const getHashforBlock = (aBlock: Block): string => {
  const { index, prevHash, timestamp, data } = aBlock;
  return calculateBlockHash([index, prevHash, timestamp, data]);
};

const isBlockValid = (candidateBlock: Block, prevBlock: Block): boolean => {
  const {
    index: candidateBlockIndex,
    hash: candidateBlockHash,
    prevHash: candidateBlockPrevHash
  } = candidateBlock;
  const { index: prevBlockIndex, hash: prevBlockHash } = prevBlock;

  return (
    validateStructure(candidateBlock) &&
    candidateBlockIndex === prevBlockIndex + 1 &&
    prevBlockHash === candidateBlockPrevHash &&
    getHashforBlock(candidateBlock) === candidateBlockHash
  );
};

export { createNewBlock, addBlock };
