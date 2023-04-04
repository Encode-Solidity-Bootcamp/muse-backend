/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractJson from './assets/MyContract.json';
import * as dotenv from "dotenv";
import {ItemDTO } from './dtos/getItemList.dto';
dotenv.config();

const MP_CONTRACT_ADDRESS = "0x6DF894Ce09c882cdf0cB5E9B0B970B4e87423BCB";

@Injectable()
export class AppService {

  mpContract: ethers.Contract;
  provider: ethers.providers.Provider;
  constructor(){
    this.provider = new ethers.providers.InfuraProvider('sepolia', process.env.INFURA_API_KEY);
    this.mpContract = new ethers.Contract(
    MP_CONTRACT_ADDRESS,
    contractJson.abi,
    );
    console.log('construct success!')
  }
  async itemsList(): Promise<ItemDTO[]> {

    //retrieve the list of all items in the marketplace

    const count = await this.mpContract.itemCount();
    const countNumber = count.toNumber();
    const itemsArray = [];
    
    console.log(countNumber)
    for(let i = 1; i <= countNumber; i++ ){
        const [nftContract, tokenId, amount, name, price, seller, sold] = await this.mpContract.items(i);
        console.log("The items should follow");
        itemsArray.push({
          address: nftContract,
          tokenId: tokenId.toNumber,
          amount: amount.toNumber,
          name: name,
          price: price.toNumber, 
          seller: seller,
          sold: sold,
        })
        console.log("End of loop")
    }

    return itemsArray;
  }
  
}
