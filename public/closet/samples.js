const catalog = [
  ["hat",14,"olive-beanie","올리브 비니"], ["hat",14,"blue-cap","블루 볼캡"],
  ["top",1,"stripe-tee","스트라이프 티셔츠"], ["top",1,"brick-tee","브릭 티셔츠"],
  ["bottom",6,"jeans","인디고 데님"], ["bottom",7,"sand-shorts","베이지 반바지"],
  ["outer",4,"chore-jacket","올리브 워크 재킷"], ["outer",4,"denim-jacket","블루 데님 재킷"],
  ["socks",22,"charcoal-sock","차콜 골지 양말"], ["socks",22,"stripe-sock","버건디 줄무늬 양말"],
  ["shoes",23,"sneaker","아이보리 스니커즈"], ["shoes",23,"loafer","브라운 로퍼"],
  ["gloves",17,"leather-glove","브라운 가죽 장갑"], ["gloves",17,"knit-glove","머스터드 니트 장갑"]
];
// Front neckline measurements on each product photo, excluding the label and back facing.
const collars={
  "stripe-tee":{radius:.126,depth:.123,power:2},
  "brick-tee":{radius:.12,depth:.117,power:2},
  "chore-jacket":{radius:.087,depth:.156,power:1},
  "denim-jacket":{radius:.076,depth:.163,power:1}
};
export const samples = catalog.map(([category,kind,slug,name]) => ({
  id:"sample:"+slug, category, kind, name, sample:true, cut:true, split:0,
  collar:collars[slug], url:new URL("samples/"+slug+".webp",import.meta.url).href
}));
