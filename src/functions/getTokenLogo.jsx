import { possibleAssetsObj } from "../data/possibleAssets";
export function getTokenLogo(asset) {

  if( possibleAssetsObj[asset] ) {
    return possibleAssetsObj[asset].tokenLogoIndex;
  }

  return possibleAssetsObj["ETH"].tokenLogoIndex;

}