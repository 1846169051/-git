let dianquanNum = 500000 // 開通當月通行證需要消耗的點券
let yueNum = 500 // 開通高級通行證需要消耗的餘額
let jiangliList = [// 通行證獎勵列錶
    {
        dengji: 1,// 等級
        diji: [[4000288, 1000], [4000625, 1000]],// 普通通行證獎勵
        gaoji: [[4000001, 2000], [4000022, 2000]],// 高級通行證獎勵
    },
    {
        dengji: 2,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 3,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 4,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 5,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 6,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 7,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 8,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 9,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    },
    {
        dengji: 10,
        diji: [[4000288, 1000], [4000625, 1000]],
        gaoji: [[4000001, 2000], [4000022, 2000]],
    }
]
let Num8NeedItem = [4000288, 500000] // 第八個任務（當月蒐集XXX道具 500000個 1次）需要提交的材料的【id，數量】

// 以上是需要填寫的數據↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
let TXZJY = 'X通行證經驗'
const daysRemaining = daysUntilNextMonth();
let dijiTXZ = getYearAndMonth() + '月通行證'// 普通通行證Name
let gaojiTXZ = getYearAndMonth() + '月高級通行證'// 高級通行證Name
let oneMonth240To20 = "當月簽到240分鐘20次" + getYearAndMonth()
let renwuList = [
    /**
     * name:任務名稱
     * num:完成後的經驗數量
     * logname:日誌名稱
     * lognum:需要完成的日誌數量
     */
    { name: '狩獵200LV以上 怪物 1000000隻', num: 5, logName: '通行狩獵怪物', logNum: 1000000 },
    { name: '怪物公園通關20次', num: 20, logName: '通行怪物公園'+getYearAndMonth(), logNum: 20 },
    { name: 'BOSS討伐數量 50隻', num: 10, logName: '通行BOSS討伐'+getYearAndMonth(), logNum: 50 },
    { name: '上線纍計時間 480 H', num: 20, logName: '通行纍計時間', logNum: 480 },
    { name: '等級上升150LV ', num: 5, logName: '通行等級上升', logNum: 150 },
    { name: '當月簽到240分鐘20次', num: 10, logName: oneMonth240To20, logNum: 20 },
    { name: '當月儲值金額達500', num: 10, logName: '通行月儲值', logNum: 500 },
    { name: '完成每日活動 50 次 ', num: 10, logName: '通行每日活動', logNum: 50 },
    { name: '當月蒐集XXX道具 500000個 1次', num: 5, logName: '通行道具收集', logNum: 1 },
    { name: '當月點卷使用達 10W', num: 5, logName: '通行點券使用', logNum: 100000 },
]
start()
var todayMoney = getRMB();// 當前現金點
function start() {
    let text = '通行證\r\n'
    text += '#L1#領取通行證獎勵#l   '
    text += '#L2#開通通行證#l\r\n'
    text += '#L3#查看並驗證通行證任務#l\r\n'
    text += '#L4#查看通行證每一級獎勵#l\r\n'
    let xuan = npc.askMenu(text)
    if (xuan == 1) {
        let jingyan = player.getEventValue(TXZJY)// 通行證經驗
        let ttt = '當前通行證經驗:' + jingyan + '\r\n'
        // jingyan/10嚮下取整
        let dengjiLv = Math.floor(jingyan / 10)
        if (player.getEventValue(dijiTXZ) >= 1) {
            ttt += '已開通普通通行證:\r\n'
            for (let i = 0; i < jiangliList.length; i++) {
                if (jiangliList[i].dengji <= dengjiLv) {
                    ttt += '#L' + i + '#' + jiangliList[i].dengji + '獎勵'
                    let logName = '通行證' + i + '領取' + getYearAndMonth()
                    if (player.getEventValue(logName) > 0) {
                        ttt += '  (已領取)#l\r\n'
                    } else {
                        ttt += '  (未領取)#l\r\n'
                    }
                    for (let j = 0; j < jiangliList[i].diji.length; j++) {
                        ttt += '#v' + jiangliList[i].diji[j][0] + '#' + jiangliList[i].diji[j][0]+ '個   '
                    }
                    ttt += '\r\n--------------------------------------\r\n'
                }
            }
        }
        if (player.getEventValue(gaojiTXZ) >= 1) {
            ttt += '已開通高級通行證:\r\n'
            for (let i = 0; i < jiangliList.length; i++) {
                if (jiangliList[i].dengji <= dengjiLv) {
                    ttt += '#L' + (i + 100) + '#' + jiangliList[i].dengji + '獎勵'
                    let logName = '高通證' + i + '領取' + getYearAndMonth()
                    if (player.getEventValue(logName) > 0) {
                        ttt += '  (已領取)#l\r\n'
                    } else {
                        ttt += '  (未領取)#l\r\n'
                    }
                    for (let j = 0; j < jiangliList[i].gaoji.length; j++) {
                        ttt += '#v' + jiangliList[i].gaoji[j][0] + '#' + jiangliList[i].gaoji[j][0]+ '個   '
                    }
                    ttt += '\r\n--------------------------------------\r\n'
                }
            }
        }
        if(jingyan<10){
            ttt+='\r\n您未滿足條件，無法領取獎勵\r\n'
            ttt+= '                   #L999#返回#l\r\n'
        }
        if (ttt == '當前通行證經驗:' + jingyan + '\r\n') {
            ttt = '#L999#未開通通行證   返回#l\r\n'
        }
        let lingqu = npc.askMenu(ttt)
        if (lingqu < 100) {
            let logName = '通行證' + lingqu + '領取' + getYearAndMonth()
            if (player.getEventValue(logName) > 0) {
                npc.say('您已領取過該獎勵了')
                return
            }
            let saysay = (lingqu + 1) + '級通行證獎勵領取:\r\n'
            for (let i = 0; i < jiangliList[lingqu].diji.length; i++) {
                // 發放獎勵
                let itemid = jiangliList[lingqu].diji[i][0]
                let num = jiangliList[lingqu].diji[i][1]
                player.gainItem(itemid, num)
                saysay += '#v' + itemid + '#' + num + '個   '
            }
            saysay += '領取成功'
            player.addEventValue(logName, 1, daysRemaining)
            npc.say(saysay)
        } else if (lingqu >= 100 && lingqu < 200) {
            let logName = '高通證' + (lingqu-100) + '領取' + getYearAndMonth()
            if (player.getEventValue(logName) > 0) {
                npc.say('您已領取過該獎勵了')
                return
            }
            let saysay = (lingqu - 99) + '級通行證獎勵領取:\r\n'
            for (let i = 0; i < jiangliList[lingqu - 100].gaoji.length; i++) {
                // 發放獎勵
                let itemid = jiangliList[lingqu - 100].gaoji[i][0]
                let num = jiangliList[lingqu - 100].gaoji[i][1]
                player.gainItem(itemid, num)
                saysay += '#v' + itemid + '#' + num + '個   '
            }
            saysay += '領取成功'
            player.addEventValue(logName, 1, daysRemaining)
            npc.say(saysay)
        } else if (lingqu == 999) {
            start()
        }
    } else if (xuan == 2) {
        let txt = '#L1#開通通行證(' + dianquanNum + '點券)#l\r\n'
        txt += '#L2#開通高級通行證(' + yueNum + '餘額)#l\r\n'
        let fukuan = npc.askMenu(txt)
        if (fukuan == 1) {
            let YorN = npc.askYesNo('開通通行證需要消耗' + dianquanNum + '點券您確認開通嗎？')
            if (YorN) {
                if (player.getCashShopCurrency(1) < dianquanNum) {
                    npc.say('點券不足:' + dianquanNum)
                    return
                }
                player.modifyCashShopCurrency(1, -dianquanNum);
                player.addEventValue(dijiTXZ, 1, daysRemaining)
                npc.say('通行證開通成功')
            } else {
                npc.say('您取消了開通通行證的操作')
                return
            }
        } else if (fukuan == 2) {
            let YorN = npc.askYesNo('開通高級通行證需要消耗' + yueNum + '餘額您確認開通嗎？')
            if (YorN) {
                if (todayMoney < yueNum) {
                    npc.say('餘額不足:' + yueNum)
                    return
                }
                loseRMB(-yueNum);
                player.addEventValue(gaojiTXZ, 1, daysRemaining)
                npc.say('高級通行證開通成功')
            }
        }
    } else if (xuan == 3) {
        let text = "通行證任務列錶：\r\n"
        for (let i = 0; i < renwuList.length; i++) {
            let item = renwuList[i];
            text += '#L' + i + '#' + item.name + '\r\n          可獲取' + item.num + '點通行證經驗'
            if (player.getEventValue(item.logName) >= item.logNum) {
                let logName = getYearAndMonth() + '通行證任務' + i
                if (player.getEventValue(logName) > 0) {
                    text += '  (已完成驗證)#l\r\n'
                } else {
                    text += '  (前往驗證)#l\r\n'
                }
            } else {
                text += '  (不滿足條件)#l\r\n'
            }
        }
        let renwuItem = npc.askMenu(text)
        if (renwuItem == 6) {
            let data = renwuList[renwuItem];
            getAndAddChongzhiLog(data.logName)
        }
        if (renwuItem == 8) {
            let logName = getYearAndMonth() + '通行證任務' + renwuItem
            if (player.getEventValue(logName) > 0) {
                npc.say('您已驗證過該任務了')
                return
            }
            let YorN = npc.askYesNo('您確認要提交#v' + Num8NeedItem[0] + '#' + Num8NeedItem[1] + '個嗎？')
            if (YorN) {
                // 道具是否充足
                let itemid = Num8NeedItem[0]
                let num = Num8NeedItem[1]
                if (player.getAmountOfItem(itemid) < num) {
                    npc.say('道具不足')
                    return
                } else {
                    let data = renwuList[renwuItem];
                    player.loseItem(itemid, num)
                    player.addEventValue(logName, 1, daysRemaining)
                    player.addEventValue(data.logName, 1, daysRemaining)
                    player.addEventValue(TXZJY, data.num, daysRemaining)
                    npc.say('恭喜您已通過驗證了獲得' + data.num + '點通行證經驗')
                    return
                }
            }
            return
        }
        let data = renwuList[renwuItem];
        let jingyan = player.getEventValue(data.logName);
        if (jingyan >= data.logNum) {
            let logName = getYearAndMonth() + '通行證任務' + renwuItem
            if (player.getEventValue(logName) > 0) {
                npc.say('您已驗證過該任務了')
                return
            } else {
                player.addEventValue(logName, 1, daysRemaining)
                player.addEventValue(TXZJY, data.num, daysRemaining)
                npc.say('您已通過驗證了獲得' + data.num + '點通行證經驗')
                return
            }
        } else {
            npc.say('您未滿足條件，無法驗證\r\n當前進度#r' + (jingyan<0?0:jingyan) + '/' + data.logNum)
            return
        }
    }else if(xuan==4){
        let text = "通行證獎勵列錶：\r\n"
        for (let i = 0; i < jiangliList.length; i++) {
            let item = jiangliList[i];
            text+='通行證經驗達到'+(item.dengji*10)+'點可領取#l\r\n'
            text+='\r\n基礎獎勵：'
            for (let j = 0; j < item.diji.length; j++) {
                text += '#v' + item.diji[j][0] + '#' + item.diji[j][1] + '個   '
            }
            text+='\r\n高級獎勵：'
            for (let j = 0; j < item.gaoji.length; j++) {
                text += '#v' + item.gaoji[j][0] + '#' + item.gaoji[j][1] + '個   '
            }
            text+='\r\n------------------------------\r\n'
        }
        npc.say(text)
    }
}




// 輔助函數========================================================================================
function getYearAndMonth() {
    var today = new Date();
    var year = today.getFullYear(); // 獲取年份
    var month = today.getMonth() + 1; // 獲取月份，註意月份是從 0 開始的，所以要加 1
    return year + "-" + month
}
// 扣現金點
function loseRMB(rmb) {
    var myAccountName = getAccountName();
    let sql = `UPDATE hypay SET pay = pay + ${rmb} WHERE accname = '${myAccountName}'`;
    player.customSqlUpdate(sql);
}
// 獲取現金點
function getRMB() {
    var myAccountName = getAccountName();
    let sql = `SELECT pay FROM hypay WHERE accname = '${myAccountName}'`;
    let result = player.customSqlResult(sql);
    if (result) {
        return result;
    }
}
function getAccountName() {
    var sql = "select name,id from accounts where id=" + player.getAccountId() + " order by name limit 1;";
    var push = player.customSqlResult(sql);
    if (push.size() > 0) {
        var result = push.get(0);
        var name = result.get("name");
    }
    return name;
}
// 當月充值記錄獲取並對比
function getAndAddChongzhiLog(logName) {
    let chongzhiLog = player.getEventValue(logName);
    // player.addEventValue(logName, 500, daysRemaining)
    if(chongzhiLog>0){
        let time=getYearAndMonth()+'-01 00:00:01'
        let myAccountName=getAccountName()
        // npc.say(time+'\r\n'+myAccountName)
        let sql=`SELECT SUM(war) FROM hypay_chongzhi WHERE time > '${time}' AND aname = '${myAccountName}';`
        let result = player.customSqlResult(sql);
        if(result){
            let chongzhiNum=result.get(0)
            let value=chongzhiNum-chongzhiLog
            if(value>0){
                player.addEventValue(logName,value, daysRemaining)
            }
        }
    }
}
function daysUntilNextMonth() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let nextMonth;
    let nextYear;

    if (currentMonth === 11) {
        nextMonth = 0;
        nextYear = currentYear + 1;
    } else {
        nextMonth = currentMonth + 1;
        nextYear = currentYear;
    }

    const nextMonthFirstDay = new Date(nextYear, nextMonth, 1);
    const timeDiff = nextMonthFirstDay.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysRemaining;
}

// 使用示例
