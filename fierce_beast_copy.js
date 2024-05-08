    // 固定獎勵
    let rewords = [    
        {id:2435153,name:"神秘寶石箱",rate:1,num:1},
        {id:2430016,name:"保溫箱",rate:1,num:1},
        {id:2430051,name:"被封印的箱子",rate:1,num:1},
        {id:2436711,name:"慶典的箱子",rate:1,num:1},
        // {id:2614074,name:"1億突破石",rate:1,num:1},
        // {id:2614087,name:"五千萬突破石",rate:1,num:1},
    ];
    // 隨機獎勵
    let randomRewords = [
        // {id:2614074,name:"1億突破石",rate:1,num:1},
        // {id:2614077,name:"5億突破石",rate:1,num:1},
        {id:2022336,name:"秘密箱子",rate:1,num:1},
        {id:2430456,name:"傳說幸運箱",rate:1,num:1},
        {id:4009507,name:"未知加工石",rate:1,num:1},
        {id:4020010,name:"被封印的勇者之石",rate:1,num:1},
        {id:4020011,name:"被封印的賢者之石",rate:1,num:1},
        {id:4020012,name:"被封印的聖者之石",rate:1,num:1},
        {id:5062026,name:"唯一魔方",rate:1,num:1},
        {id:2644006,name:"1星追加 23星 30%",rate:1,num:1},
        {id:2644007,name:"1星追加 23星 50%",rate:1,num:1},
        {id:2644008,name:"1星追加 23星 100%",rate:1,num:1},
        // {id:2644009,name:"1星追加 24星 30%",rate:1,num:1},
        // {id:2644010,name:"1星追加 24星 50%",rate:1,num:1},
        // {id:2644011,name:"1星追加 24星 100%",rate:1,num:1}
    ];

    let rewordsDef = {
        randomNum: 2,
    };

    let mapId = 749050400;
    let map_1;
    let members;
    let deadMob;
    let def = {
        powNum:{
            numM: Math.pow(10, 6)
        },
        exitMap: 180000000
    }
    let stage = 1;
    let startTime;
    let monster = {
        mushroom:{
            id: 9410779,
            hp: 6900 * 1000000,
            x: 22,
            y: 0,
            log: "running-mushroom",
            position:[0,1000]
        },
        snowman:{
            id: 9410778,
            hp: 9600 * 1000000,
            x: 33,
            y: 0,
            log: "running-snowman",
            position:[0,1000]
        }
    }
    
    let killed = {
        mushroom: 0,
        snowman: 0
    }

    let configuration = {
        // 副本次數限制
        dungeonsTimes: 2,
        // 隨機範圍
        position:[0, 500]
    }

    
    function init(attachment){
        [party] = attachment;
        members = party.getLocalMembers();//得到队伍里所有的人
        map_1 = event.getMap(mapId);
        map_1.reset();
    
        party.changeMap(mapId, "st00");
        event.getMap(mapId).showTimer(60 * 60);
    
        event.startTimer("kick", 60 * 60 * 1000);
        startTime = new Date().getTime();
        endTime = startTime + 30 * 60 * 1000;

        var mushroom1 = map_1.makeMob(monster.mushroom.id);
        mushroom1.changeBaseHp(monster.mushroom.hp);
    
        var mushroom2 = map_1.makeMob(monster.mushroom.id);
        mushroom2.changeBaseHp(monster.mushroom.hp);
        
        map_1.spawnMob(mushroom1, monster.mushroom.x + getRandomInt(configuration.position[0], configuration.position[1]) , monster.mushroom.y);
        map_1.spawnMob(mushroom2, monster.mushroom.x + getRandomInt(configuration.position[0], configuration.position[1]), monster.mushroom.y);
    
        // event.getMap(mapId).clearMobs();
        event.setVariable("members", members);
        event.setVariable("deadMob", deadMob);
        event.setVariable("map_1", map_1);
        for (let i = 0; i < members.length; i++) {
            members[i].showSystemMessage('開始戰鬥');//只在本地图内给单个玩家单独发消息
            members[i].setEvent(event); //设置玩家事件
            members[i].setDeathCount(1); //设置玩家死亡次数
        }
    }
    
    
    //整个事件是有循环机制会自己监听并出发相应的事件，这里只需要监听boss死亡事件
    function mobDied(mob) {//mob实例
        deadMob = mob;
        switch (mob.getDataId()) {
            // 蘑菇死亡
            case monster.mushroom.id:{
                killed.mushroom++;
                for (let i = 0; i < members.length; i++) {
                    members[i].showSystemMessage('需要在5s同時擊殺,否則怪物將會復活！');//只在本地图内给单个玩家单独发消
                }
                
                if(killed.mushroom === 2){
                    event.getMap(mapId).clearMobs();
                    for (let i = 0; i < members.length; i++) {
                        members[i].showSystemMessage('擊殺完畢進入下一階段');//只在本地图内给单个玩家单独发消
                    }
                    // 第二階段入口
                    event.startTimer("stageSecond", 5 * 1000);
                }
                else{
                    event.startTimer("revived", 5 * 1000);
                }
                break;
            }

            // 雪人死亡
            case monster.snowman.id:{
                killed.snowman++;
                for (let i = 0; i < members.length; i++) {
                    members[i].showSystemMessage('需要在5s同時擊殺,否則怪物將會復活！');//只在本地图内给单个玩家单独发消
                }
                
                if(killed.snowman === 2){
                    event.getMap(mapId).clearMobs();
                    for (let i = 0; i < members.length; i++) {
                        // 增加副本完成數量
                        members[i].addEventValue("凶獸副本參加次數");
                    }
                    // 發放獎勵
                    rewordsDistribution();
                    // 三秒后踢出副本
                    event.startTimer("kick", 3 * 1000);
                }
                else{
                    event.startTimer("revived", 5 * 1000);
                }
                break;
            }
        }
    }
    
    // 由id判斷怪物種類，聯立自定義參數
    function monsterKind(id){
        for(let item in monster){
            if(monster[item].id === id){
                return item;
            }
        }
    }
    
    // 復活怪物邏輯
    function revived(){
        let mstId = deadMob.getDataId();
        var monsterMob = map_1.makeMob(mstId);
        let monsterItem = monsterKind(mstId);
        monsterMob.changeBaseHp(monster[monsterItem].hp);
        if(killed[monsterItem] != 2){
            map_1.spawnMob(monsterMob, monster[monsterItem].x + getRandomInt(monster[monsterItem].position[0], monster[monsterItem].position[1]), monster[monsterItem].y);
            killed[monsterItem]--;
        }
    }
    
    // 二階段刷新新怪物
    function stageSecond(){
        let monsterItem = monster.snowman;
        var snowman1 = map_1.makeMob(monsterItem.id);
        snowman1.changeBaseHp(monsterItem.hp);
    
        var snowman2 = map_1.makeMob(monsterItem.id);
        snowman2.changeBaseHp(monsterItem.hp);
        
        map_1.spawnMob(snowman1, monsterItem.x + getRandomInt(0, 1000), monsterItem.y);
        map_1.spawnMob(snowman2, monsterItem.x + getRandomInt(0, 1000), monsterItem.y);
    }

    function rewordsDistribution(){
        for(let item of rewords){
            for (let i = 0; i < members.length; i++) {
                members[i].gainItem(item.id, item.num);
            }
        }

        // 發放隨機獎勵 
        for (let i = 0; i < members.length; i++) {
            for(let num = 0;num<rewordsDef.randomNum;num++){
                let index = getRandomInt(0, randomRewords.length - 1);
                members[i].showSystemMessage("發放隨機獎勵：" + randomRewords[index].name);
                let timeDiff = (new Date()).getTime() - (new Date(startTime)).getTime();
                let timeDiffSecond = Math.floor(timeDiff / 1000);
                event.broadcastNoticeWithoutPrefix("玩家" + members[i].getName() +"所用時間" + timeDiffSecond  +"秒 兇獸複製體 獲得" + randomRewords[index].name +"獎勵");
                members[i].gainItem(randomRewords[index].id, randomRewords[index].num);
            }
        }


        
    }
    
    //根据设置的时间自动触发函数
    function timerExpired(key) {
        switch (key) {
            case "revived":{
                revived();
                break;
            }    
            case "kick":{
                kick();
                break;
            }
            case "stageSecond":{
                stageSecond();
                break;
            }
        }
    }

    function kick() {
        for (const member of members) {
          member.setDeathCount(-1);
          member.setEvent(null);
          member.changeMap(def.exitMap);
        }
        event.destroyEvent();
      }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }