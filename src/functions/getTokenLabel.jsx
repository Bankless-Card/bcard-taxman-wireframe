import { possibleAssetsObj } from "../data/possibleAssets";
// Description: This function returns the label for a given token symbol
export function getTokenLabel(asset){

  if(possibleAssetsObj[asset]){
    return possibleAssetsObj[asset].tokenLabel;
  }

  return asset;
}  


