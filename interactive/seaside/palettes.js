// Architectural and accessory colors deliberately use separate pools.
export const ivory=0xfff2da;
export const buildingColors=[0xbfdce0,0xf0dbaf,0xe5bbb4,0xcbdcc1];
export const decorationColors=[0xf2c14e,0xc94d3e,0xb5cfce,0xc7d3e0,0xe4bcc7];
export const decorationPool=[decorationColors[0],decorationColors[0],decorationColors[0],decorationColors[1],decorationColors[1],decorationColors[1],...decorationColors.slice(2),ivory];
export function buildingPalette(count){return [...buildingColors.slice(0,count>6?4:3),ivory]}
const clothingColors=[0x31554a,0x344f70,0x426563,0x4e596b,0x635c66,0x72776c,0xb7d3ce,0xbacde3,0xf0e5d3,0xd8bfcf,0xc3cfa9,0xadbfd1];
export function clothingColor(u){return u<.02?decorationColors[0]:u<.04?decorationColors[1]:clothingColors[Math.min(11,Math.floor((u-.04)/.96*12))]}
