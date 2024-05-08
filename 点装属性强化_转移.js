let lists = [
    //这是可转移列表
    1042437, //	永恆海盜大衣
    1042436, //	永恆盜賊上衣
    1042435, //	永恆弓箭手連帽衫
    1042434, //	永恆法師長袍
    1042433, //	永恆劍士鎧甲
    1062289, //	永恆海盜褲
    1062288, //	永恆盜賊褲
    1062287, //	永恆弓箭手褲
    1062286, //	永恆法師褲
    1062285, //	永恆劍士褲
    1042437, //	永恆海盜大衣
    1042436, //	永恆盜賊上衣
    1042435, //	永恆弓箭手連帽衫
    1042434, //	永恆法師長袍
    1042433, //	永恆劍士鎧甲
    1062289, //	永恆海盜褲
    1062288, //	永恆盜賊褲
    1062287, //	永恆弓箭手褲
    1062286, //	永恆法師褲
    1062285, //	永恆劍士褲

    1312004
];

let lists2 = [
    //这是可转移列表
    1042437, //	永恆海盜大衣
    1042436, //	永恆盜賊上衣
    1042435, //	永恆弓箭手連帽衫
    1042434, //	永恆法師長袍
    1042433, //	永恆劍士鎧甲
    1062289, //	永恆海盜褲
    1062288, //	永恆盜賊褲
    1062287, //	永恆弓箭手褲
    1062286, //	永恆法師褲
    1062285, //	永恆劍士褲
    1042437, //	永恆海盜大衣
    1042436, //	永恆盜賊上衣
    1042435, //	永恆弓箭手連帽衫
    1042434, //	永恆法師長袍
    1042433, //	永恆劍士鎧甲
    1062289, //	永恆海盜褲
    1062288, //	永恆盜賊褲
    1062287, //	永恆弓箭手褲
    1062286, //	永恆法師褲
    1062285, //	永恆劍士褲

    1312004
];

let materials = [
    [
        {id:4310235, name:"精靈硬幣", reqNum:1},
        {id:4310258, name:"復古硬幣", reqNum:1},
        {id:1, name:"點券", reqNum:100000}
    ],
    [
        {id:4036657, name:"里斯托尼亞銀幣", reqNum:1},
        {id:4310258, name:"復古硬幣", reqNum:1},
        {id:1, name:"點券", reqNum:200000},
    ]
];
    
let titleR = "永恆系列";
let titleE = "永恆系列";
let titleG = "永恆系列";
let allAp = 10;
let limit = 0;
let equipmentProp = {
    maxLevel: 20,
    range: {
        max: 20,
        min: 10
    }
}

let item = [4310235, 1]
let money = 100000//10w点券
let maxNum = 20 // 单件最大使用次数
let float = [10, 20]//浮动数值
let txt;

// 记录参数
let toDrop;
let toDropID;
let toDrop1;
let toDrop2;
let myPlayer;

let equipLevel;
let equipMaxLevel;
let equipId;


start()
function start() {
    var sel = "\t#e點狀屬性強化_轉移#k#n\r\n"
    sel += ""
    sel += "可以把裝備欄位第一格的裝備的屬性轉移到裝備欄位第二格。轉移後，被轉移的道具將會被刪除。\r\n"
    sel += "#b#L0#點裝強化\r\n"
    sel += "#b#L1#點裝轉移\r\n"

    let str = npc.askMenu(sel);
    toDrop1 = player.getInventorySlot(1, 1);
    toDrop2 = player.getInventorySlot(1, 2);
    myPlayer = player;
    // 装备强化
    if(str == 0){
        toDrop = player.getInventorySlot(1, 1);
        if(toDrop == null){
            npc.say("請將您的裝備放到第一格！");
        }
        else {
            toDropID = toDrop.getDataId();
            player.showSystemMessage("裝備唯一id：" +  toDrop.getOnlyId());
            var flag = false;
            for(let i = 0;i<lists.length;i++){
                if(toDropID == lists[i]){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                npc.say("#b請檢查裝備欄第一個位置是否爲#r" + titleR);
            }
            else {
                // 獲取裝備階段
                
                equipId = toDrop.getOnlyId();

                let res = getEquipLevel(toDrop.getOnlyId());
                if(res === -1){
                    addEquipLevel(equipId, 0, equipmentProp.maxLevel);
                    equipLevel = 0;
                    equipMaxLevel = equipmentProp.maxLevel;
                }
                else{
                    equipMaxLevel = res.level_max;
                    equipLevel = res.level;
                }
                
                let playerMaterials = [];
                let index = 0;
                let cash = 0;
                txt = "";

                for(let i = 0;i < materials[index].length;i++){
                    if(materials[index][i].id != 1){
                        playerMaterials.push(player.getAmountOfItem(materials[index][i].id));
                        txt += "#i" + materials[index][i].id + "#" ;
                        if(playerMaterials[i] < materials[index][i].reqNum){
                            txt += "數量：" + "#r" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                        }
                        else{
                            txt += "數量：" + "#g" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                        }
                    }
                    else{
                        cash = player.getCashShopCurrency(1);
                        if(cash < materials[index][i].reqNum){
                            txt += "點券:" + "#r" + cash + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                        }
                        else{
                            txt += "點券:" + "#g" + cash + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                        }
                    } 
                }

                txt +="您要使用上述材料用於強化裝備嗎？" +
                    "\r\n";
                
                let ans = npc.askYesNoS(txt);
                let num = 1;

                if (ans == 1) {
                    let isFullNum = true;
                    for(let i = 0;i < playerMaterials.length; i++){
                        if(!isFullChange(playerMaterials[i],1,num)){
                            isFullNum = false;
                            break;
                        }
                    }
                    // 判斷進行交易
                    if(isFullNum){
                        if(equipLevel + 1 > equipMaxLevel){
                            npc.say("裝備強化達到上限，無法繼續強化。");
                        }
                        else{
                            for(let i = 0 ;i<materials[index].length;i++){
                                if(materials[index][i].id != 1){
                                    player.loseItem(materials[index][i].id, num);
                                }
                                else{
                                    player.modifyCashShopCurrency(1,  -(num * 100000));
                                }
                                
                            }
                            makeEquip(0);
                        }
                    }
                    else{
                        npc.say("不好意思，您的數量不足。");
                    }
                    
                }
            }
        }
    }
    // 裝備轉移
    else if (str == 1) {
        let pos1 = getItemType(toDrop1.getItemId());
        let pos2 = getItemTYpe(toDrop2.getItemId());
        if (!toDrop1 || !toDrop2) {
            npc.say("您的背包前倆格有空")
            return
        }
        if (!lists.includes(toDrop1.getItemId())) {
            npc.say("您的背包欄第一格物品不允許轉移")
            return
        }
        if (!lists2.includes(toDrop2.getItemId())) {
            npc.say("您的背包欄第二格物品不允許被繼承")
            return
        }
        if(pos1 !== pos2){
            npc.say("您的裝備不屬於同一部位！");
            return
        }
        let playerMaterials = [];
        let index = 1;
        let cash = 0;
        txt = "";

        for(let i = 0;i < materials[index].length;i++){
            if(materials[index][i].id != 1){
                playerMaterials.push(player.getAmountOfItem(materials[index][i].id));
                txt += "#i" + materials[index][i].id + "#" ;
                if(playerMaterials[i] < materials[index][i].reqNum){
                    txt += "數量：" + "#r" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                else{
                    txt += "數量：" + "#g" + playerMaterials[i] + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
            }
            else{
                cash = player.getCashShopCurrency(1);
                if(cash < materials[index][i].reqNum){
                    txt += "點券:" + "#r" + cash + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
                else{
                    txt += "點券:" + "#g" + cash + "/" + materials[index][i].reqNum + "#k#n" + "\r\n";
                }
            } 
        }
        txt+="您要將#v" + toDrop1.getItemId() + "#轉移給#v" + toDrop2.getItemId() + "#嗎?";
        var yeno = npc.askYesNoS(txt);
        if (yeno == 1) {

            let isFullNum = true;
            let num = 1;

            for(let i = 0;i < playerMaterials.length; i++){
                if(!isFullChange(playerMaterials[i],1,num)){
                    isFullNum = false;
                    break;
                }
            }
            // 判斷進行交易
            if(isFullNum){
                for(let i = 0 ;i<materials[index].length;i++){
                    if(materials[index][i].id != 1){
                        player.loseItem(materials[index][i].id, materials[index][i].reqNum);
                    }
                    else{
                        player.modifyCashShopCurrency(1,  -(materials[index][i].reqNum));
                    }
                    
                }
                let res = getEquipLevel(toDrop1.getOnlyId());
                if(res === -1){
                    addEquipLevel(toDrop1.getOnlyId(), 0, equipmentProp.maxLevel);
                    equipLevel = 0;
                    equipMaxLevel = equipmentProp.maxLevel;
                }
                else{
                    equipMaxLevel = res.level_max;
                    equipLevel = res.level;
                }

                let res2 = getEquipLevel(toDrop2.getOnlyId());
                if(res2 === -1){
                    addEquipLevel(toDrop2.getOnlyId(), 0, equipmentProp.maxLevel);
                }

                makeEquip(1);
                npc.say("#r恭喜你，轉移成功！#k");
            }
            else{
                npc.say("不好意思，您的數量不足。");
            }
            
        }
    }   
}

function makeEquip(flag) {
    if(flag === 0) {
        let upper = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        player.showSystemMessage("強化隨即點數為：" +  upper);
        // 装备强化是否过最高等级限制

        toDrop.setStr(toDrop.getStr() + upper); //装备力量
        toDrop.setDex(toDrop.getDex() + upper); //装备敏捷
        toDrop.setInt(toDrop.getInt() + upper); //装备智力
        toDrop.setLuk(toDrop.getLuk() + upper); //装备运气
        toDrop.setTitle(titleE + "+" +(parseInt(equipLevel) + 1));
        equipEnhance(equipId);
        myPlayer.updateItem(1, toDrop);
    }
    else if(flag === 1) {
        toDrop2.setStr(toDrop1.getStr()); //装备力量
        toDrop2.setDex(toDrop1.getDex()); //装备敏捷
        toDrop2.setInt(toDrop1.getInt()); //装备智力
        toDrop2.setLuk(toDrop1.getLuk()); //装备运气

        toDrop2.setMad(toDrop1.getMad());
        toDrop2.setPad(toDrop1.getPad());

        toDrop2.setStatR(toDrop1.getStatR());// 所有属性
        toDrop2.setBossDamageR(toDrop1.getBossDamageR());// BOSS伤
        toDrop2.setIgnorePDR(toDrop1.getIgnorePDR());// 无视防御
        toDrop2.setDamR(toDrop1.getDamR()); //总伤害
        toDrop2.setMaxMp(toDrop1.getMaxMp());
        toDrop2.setLimitBreak(toDrop1.getLimitBreak());//破功

        toDrop2.setTitle(titleG + "+" + parseInt(equipLevel));
        setEquipLevel(toDrop2.getOnlyId(), equipLevel, equipMaxLevel);
        myPlayer.updateItem(1, toDrop2);
        myPlayer.loseItem(toDrop1.getDataId(), 1);
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

function equipEnhance(id){
    let sql = "UPDATE equipment_enhancement SET " + "level=" + (equipLevel+1) + 
    " WHERE equipment_id=" + id +
    ";";
    player.customSqlUpdate(sql);
}

function getEquipLevel(id){
    let sql = "SELECT * FROM equipment_enhancement WHERE equipment_id = " + id +";";
    let res = player.customSqlResult(sql);
    return res.length === 0 ? -1:res[0];
}


function setEquipLevel(id, level, maxLevel){
    let sql = "UPDATE equipment_enhancement SET " + "level_max=" + maxLevel +
        ", level=" + level +
        " WHERE equipment_id=" + id +
        ";";
    let res = player.customSqlUpdate(sql);
    return res;
}

function addEquipLevel(id, level, maxLevel){
    let sql = "INSERT INTO equipment_enhancement(equipment_id, level, level_max)" +
        "VALUES(" + id + "," + level + "," + maxLevel + ");";
    let res = player.customSqlInsert(sql);
    return res;
}

function getItemType(itemid) {
    var type = Math.floor(itemid / 10000);
    npc.say(type)
    switch (type) {
        case 100:
            return 1; //帽子 面具 头巾 礼帽
        case 104:
            return 2; // 上衣
        case 105:
            return 3999; // 套装
        case 106:
            return 4; // 裤子
        case 107:
            return 5; // 鞋子
        case 108:
            return 6; //手套
        case 108:
            return 66; // 副武器
        case 110:
            return 7; //披风
        case 115:
            return 8; //
        case 112:
            return 9; //
        case 111:
            return 10; //
        case 102:
            return 11; //
        case 103:
            return 22; //
        case 101:
            return 23; //
        case 113:
            return 24; //
        case 167:
            return 25; //
        case 135:
            return 66; //副武器
        default:
            if (type == 120) return -1; //图腾
            if (type == 135) return -1; //副手
            var type = Math.floor(type / 10);
            if (type == 12 || type == 13 || type == 14 || type == 15 || type == 17) {
                return 3; //武器
            }
            return -1;
    }
}