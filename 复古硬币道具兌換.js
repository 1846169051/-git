let materials = [
    [
        {id:2023265,name:"紅色靈魂結晶碎片", reqNum:1},
        {id:2023266,name:"黃色靈魂結晶碎片", reqNum:1},
        {id:2023267,name:"藍色靈魂結晶碎片", reqNum:1}
    ],
    [
        {id:4310153,name:"M.I.B紀念币", reqNum:1},
        {id:4001889,name:"太初水滴石", reqNum:1},
        {id:4001890,name:"蛛網水滴石", reqNum:1}
    ],
    [
        {id:1,name:"點券", reqNum:1000}
    ],
    [
        {id:4310258,name:"復古硬幣", reqNum:1}
    ]
]
let item = [
    {id:2022663,name:"溫暖冬季箱",index:0, rwdNum:1},
    {id:2436501,name:"特殊禮物箱",index:1, rwdNum:1},
    {id:4310258,name:"復古硬幣",index:2, rwdNum:1},
    {id:1,name:"點券",index:3, rwdNum:900}
]
// 控制範圍
let range = {
    askNumber:{min:1,max:99999,def:1},
};

let text = {
    // 標題
    title: "道具兌換",

}

let sorryTxt = "不好意思，您的數量不足。";
start();

function start() {
    var txt;
    txt = "\t\t\t\t道具兌換\r\n";
    txt += "請選擇您需要兌換的物品\r\n";
    for(let i = 0;i<item.length;i++){
        if(item[i].id != 1){
            txt += "\t#d"  + 
            "#i" + item[i].id + "#" + 
            "#L" + item[i].index + "# " + item[i].name + "#l" +
            "\r\n";
        }
        else{
            txt += "\t#d"  +
            "#L" + item[i].index + "# " + item[i].name + "#l" +
            "\r\n";
        }
    }
    itemIndex = npc.askMenu(txt);
    
    switch (itemIndex) {
        case parseInt(item[0].index):{
            let index = parseInt(item[0].index);
            txt = "\t\t需求材料\r\n";
            let playerMaterials = [];
            for(let i = 0;i < materials[index].length;i++){
                playerMaterials.push(player.getAmountOfItem(materials[index][i].id));
                txt += "#i" + materials[index][i].id + "#";
                if(playerMaterials[i] < materials[index][i].reqNum){
                    txt += "數量：" + "#r" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                else{
                    txt += "數量：" + "#g" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
            }
            txt += "\r\n";
            txt += "請輸入兌換數量：";
            let num = npc.askNumber(txt, range.askNumber.def, range.askNumber.min, range.askNumber.max);
            let isFullNum = true;
            for(let i = 0;i < playerMaterials.length; i++){
                if(!isFullChange(playerMaterials[i],1,num)){
                    isFullNum = false;
                    break;
                }
            }

            // 判斷進行交易
            if(isFullNum){
                for(let i = 0 ;i<materials[index].length;i++){
                    player.loseItem(materials[index][i].id, num);
                }
                player.gainItem(item[index].id, num);
            }
            else{
                npc.say(sorryTxt);
            }
            break;
        }


        case parseInt(item[1].index):{
            let index = parseInt(item[1].index);
            txt = "\t\t需求材料\r\n";
            let playerMaterials = [];
            for(let i = 0;i < materials[index].length;i++){
                playerMaterials.push(player.getAmountOfItem(materials[index][i].id));
                txt += "#i" + materials[index][i].id + "#";
                if(playerMaterials[i] < materials[index][i].reqNum){
                    txt += "數量：" + "#r" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                else{
                    txt += "數量：" + "#g" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
            }
            txt += "\r\n";
            txt += "請輸入兌換數量：";
            let num = npc.askNumber(txt, range.askNumber.def, range.askNumber.min, range.askNumber.max);
            let isFullNum = true;
            for(let i = 0;i < playerMaterials.length; i++){
                if(!isFullChange(playerMaterials[i],1,num)){
                    isFullNum = false;
                    break;
                }
            }

            // 判斷進行交易
            if(isFullNum){
                for(let i = 0 ;i<materials[index].length;i++){
                    player.loseItem(materials[index][i].id, num);
                }
                player.gainItem(item[index].id, num);
            }
            else{
                npc.say(sorryTxt);
            }
            break;
        }
        // 點券兌換復古硬幣1000 : 1
        case parseInt(item[2].index):
            // 作爲下標訪問材料單
            let index = 2;
            let cash = player.getCashShopCurrency(1);
            txt = "\t\t需求材料\r\n";
            for(let i = 0;i < materials[index].length;i++){
                txt += "點券";
                if(cash < materials[index][i].reqNum){
                    txt += "數量：" + "#r" + cash + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                else{
                    txt += "數量：" + "#g" + cash + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                "\r\n";
            }
            txt += "請輸入兌換數量：";
            let num = npc.askNumber(txt, range.askNumber.def, range.askNumber.min, range.askNumber.max);
            // 如果輸入小於0
            if(num <= 0) break;
            let requireCash = num * 1000;
            if(cash >= requireCash){
                player.modifyCashShopCurrency(1, -requireCash);
                player.gainItem(item[index].id, num);
            }
            else{
                txt = "不好意思，您的點券數量不足。";
                npc.say(txt);
            }
            break;

        // 復古硬幣兌換點券1 ：900
        case parseInt(item[3].index):{
            let index = 3;
            // 作爲下標訪問材料單
            txt = "\t\t需求材料\r\n";
            let playerMaterials = [];
            for(let i = 0;i < materials[index].length;i++){
                playerMaterials.push(player.getAmountOfItem(materials[index][i].id));
                txt += "#i" + materials[index][i].id + "#";
                if(playerMaterials[i] < materials[index][i].reqNum){
                    txt += "數量：" + "#r" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                else{
                    txt += "數量：" + "#g" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
            }
            txt += "\r\n";
            txt += "請輸入兌換數量：";
            let num = npc.askNumber(txt, range.askNumber.def, range.askNumber.min, range.askNumber.max);
            let isFullNum = true;
            for(let i = 0;i < playerMaterials.length; i++){
                if(!isFullChange(playerMaterials[i],1,num)){
                    isFullNum = false;
                    break;
                }
            }

            // 判斷進行交易
            if(isFullNum){
                for(let i = 0 ;i<materials[index].length;i++){
                    player.loseItem(materials[index][i].id, num);
                }
                player.modifyCashShopCurrency(1, num * 900);
            }
            else{
                npc.say(sorryTxt);
            }
            break;
        }
        default:
            break;
    }
}

function isFullChange(playerNum, rate, inputNum){
    if(playerNum < inputNum * rate){
        return false;
    }
    else{
        return true;
    }
}