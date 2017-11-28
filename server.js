const fs = require('fs')
const path = require('path');

const logger = require('koa-logger');
const serve = require('koa-static');
const router = require('koa-router')();
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Koa = require('koa')
const app = new Koa()

const _ = require('underscore')
app.use(cors());
app.use(logger())
app.use(koaBody())
router.get('/one', one)
    .post('/two', two)
    .get('/three', three)
    .post('/addAai.do', addApi)
    .post('/deletApi.do', deletApi)
    .post('/showApi.do', showApi)
    .post('/itfer-hdqd/rest/activity/addActivity', addActivity)
    .post('/itfer-hdqd/rest/user/saveUserInfo', saveUserInfo)
    .post('/itfer-hdqd/rest/activity/getConfigure', getConfigure)
    .post('/itfer-hdqd/rest/activity/getOrganization', getOrganization)
    .post('/itfer-hdqd/rest/activity/getActivitySignRecord', getActivitySignRecord)
    .post('/itfer-hdqd/rest/excel/createExcel', createExcel)
    .post('/itfer-hdqd/rest/excel/postExcel', postExcel)
    .post('/itfer-hdqd/rest/activity/getActivityQRcode', getActivityQRcode)
    .post('/itfer-hdqd/rest/activity/updateActivityQRcode', updateActivityQRcode)
    .post('/itfer-hdqd/rest/activity/getPowerActivitySquare', getPowerActivitySquare)
app.use(router.routes())

// serve files from ./public

app.use(serve(path.join(__dirname, './public')));

async function one(ctx) {
    ctx.body = {
        name: 'lgn'
    }
}
async function two(ctx) {
    const body = ctx.request.body
    console.log(body)
    ctx.body = {
        name: 'ddd'
    }
}
async function three(ctx) {
    ctx.body = {
        name: '2222'
    }
}

let api = require('./api.json')
async function addApi(ctx) {
    const body = ctx.request.body

    let isRepetition = _.find(api, (ao) => {
        return ao.id == body.id
    })
    if (isRepetition) {
        ctx.body = {
            result: 'id重复了'
        }
    } else {
        api.push(body)
        fs.writeFile('api.json', `${JSON.stringify(api)}`, (err) => {
            if (err) throw err
            console.log('The "data to append" was appended to file!')
        })
        ctx.body = api
    }
}
async function deletApi(ctx) {
    const body = ctx.request.body
    api = api.filter(value => {
        return value.id != body.id
    })
    fs.writeFile('api.json', `${JSON.stringify(api)}`, (err) => {
        if (err) throw err
        console.log('The "data to append" was appended to file!')
    })
    ctx.body = api
}
async function showApi(ctx) {
    api = _.sortBy(api, (ao) => {
        return ao.id
    })
    ctx.body = api
}
async function addActivity(ctx) {
    ctx.body = {
        msg: "添加数据成功",
        status: 0
    }
}
async function saveUserInfo(ctx) {
    ctx.body = {
        "status": 0,
        "result": {
            "power": 0 //不是是管理员 那么就是普通学生 进入学生页面
        },
        "msg": "已确认身份信息"
    }
}
async function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};
async function getOrganization(ctx) {
    const body = ctx.request.body
    console.log(body)
    console.log(body.superId)
    if (body.superId === '100') {
        ctx.body = {
            "msg": "获取数据成功",
            "result": [{
                    "ORGANIZATION_ID": "3", //组织机构ID
                    "ORGANIZATION_NAME": "苑区", //组织名字
                    "SUPER_ID": "3", //上级单位编号
                    "ENDLESS": 0 //是否存在下级单位 0 有 -1没有
                },
                {
                    "ORGANIZATION_ID": "4", //组织机构ID
                    "ORGANIZATION_NAME": "苑区2", //组织名字
                    "SUPER_ID": "3", //上级单位编号
                    "ENDLESS": 0 //是否存在下级单位 0 有 -1没有
                },
                {
                    "ORGANIZATION_ID": "5", //组织机构ID
                    "ORGANIZATION_NAME": "苑区1", //组织名字
                    "SUPER_ID": "3", //上级单位编号
                    "ENDLESS": 0 //是否存在下级单位 0 有 -1没有
                }
            ],
            "status": 0
        }
    } else {
        ctx.body = {
            "msg": "获取数据成功",
            "result": [{
                    "ORGANIZATION_ID": "3", //组织机构ID
                    "ORGANIZATION_NAME": "苑区3", //组织名字
                    "SUPER_ID": "4", //上级单位编号
                    "ENDLESS": 0 //是否存在下级单位 0 有 -1没有
                },
                {
                    "ORGANIZATION_ID": "4", //组织机构ID
                    "ORGANIZATION_NAME": "苑区4", //组织名字
                    "SUPER_ID": "4", //上级单位编号
                    "ENDLESS": 0 //是否存在下级单位 0 有 -1没有
                },
                {
                    "ORGANIZATION_ID": "5", //组织机构ID
                    "ORGANIZATION_NAME": "苑区5", //组织名字
                    "SUPER_ID": "4", //上级单位编号
                    "ENDLESS": 0 //是否存在下级单位 0 有 -1没有
                }
            ],
            "status": 0
        }
    }
}
async function getConfigure(ctx) {
    ctx.body = {
        "msg": "获取数据成功",
        "result": {
            "level": [{
                    "LEVEL_ID": 100, //活动等级中的 id
                    "LEVEL_NAME": "所有"
                },
                {
                    "LEVEL_ID": 0, //活动等级中的 id
                    "LEVEL_NAME": "班级"
                },
                {
                    "LEVEL_ID": 1,
                    "LEVEL_NAME": "区级"
                },
                {
                    "LEVEL_ID": 2,
                    "LEVEL_NAME": "校级"
                },
                {
                    "LEVEL_ID": 3,
                    "LEVEL_NAME": "市级"
                }
            ],
            "region": [{
                    "REGION_ID": 1,
                    "REGION_NAME": "绵阳校区"
                },
                {
                    "REGION_ID": 2,
                    "REGION_NAME": "成都东区"
                },
                {
                    "REGION_ID": 3,
                    "REGION_NAME": "成都西区"
                },
            ],
            "time": {
                "START_TIME": "0:15",
                "END_TIME": "20:00",
            }
        },
        "status": 0
    }
}

async function getActivitySignRecord(ctx) {
    const body = ctx.request.body
    await delay(1000)
    if (body.page >= 4) {
        ctx.body = {
            "msg": "获取数据成功",
            "result": {
                "data": [{
                    "JOIN_ID": "爱的味道", //参与编号
                    "USER_NAME": "李锐", //参与者名字 
                    "KEY_ID": "41200876", //参与者关键号
                    "USER_ID": "adw151365", //参与者user_id
                    "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                    "CREATE_TIME": "2017-11-28 14:22:59" // 签到时间
                }],
                "count": "165" //单位 人 （签到总人数）
            },
            "status": 1
        }
    } else {
        ctx.body = {
            "msg": "获取数据成功",
            "result": {
                "data": [{
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                    {
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                    {
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                    {
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                    {
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                    {
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                    {
                        "JOIN_ID": "爱的味道", //参与编号
                        "USER_NAME": "李锐", //参与者名字 
                        "KEY_ID": "41200876", //参与者关键号
                        "USER_ID": "adw151365", //参与者user_id
                        "USER_IMG": "http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0", //参与者头像
                        "CREATE_TIME": "2017-11-28 14:22:59" //签到时间
                    },
                ],
                "count": "165" //单位 人 （签到总人数）
            },
            "status": 0
        }
    }
}
async function createExcel(ctx) {
    ctx.body = {
        "msg": "生成excel成功",
        "result": {
            "FILE_NAME": "asda.exl"
        },
        "status": 0
    }
}
async function postExcel(ctx) {
    ctx.body = {
        "msg": "发送excel成功",
        "status": 0
    }
}
async function getActivityQRcode(ctx) {
    await delay(1000)
    ctx.body = {
        "msg":"获取数据成功",
        "result":
            {
                "LAST_TIME":"", //二维码失效时间
                "LAST_TIME_STAMP":"", //二维码失效时间戳
                "IMG":"http://micapi.tfswufe.edu.cn/itfer/rest/files/pictures/201707251449364790.jpg/1/0"
            },
        "status":0
    }
}
async function updateActivityQRcode(ctx) {
    await delay(1000)
    ctx.body = {
        "msg":"获取数据成功",
        "result":
            {
                "LAST_TIME":"", //二维码失效时间
                "LAST_TIME_STAMP":"", //二维码失效时间戳
                "IMG":"http://m.jpg/1/0"
            },
        "status":0
    }
}
async function getPowerActivitySquare(ctx) {
    await delay(1000)
    ctx.body = {
        "msg":"获取数据成功",
        "result":[
            {
                "ACTIVITITY_ID":"Z0001", //活动编号
                "LEVEL_ID":0,
                "LEVEL_NAME":"级别中文",
                "ORGANIZATION_ID":"组织单位代码 英文逗号分割",
                "ORGANIZATION_NAME":"组织单位名称 英文逗号分割",
                "ACTIVITITY_STATUS":0,//-1已删除 0未开始 1进行中 2已结束
                "ACTIVITITY_STATUS_NAME":"未开始",//-1已删除 0未开始 1进行中 2已结束
                "START_TIME":"2017-11-19 21:28:41",//开始时间 年月日时分秒
                "START_TIME_STAMP":"", //开始时间 时间戳 年月日时分秒
                "REGION_NAME":"校区名",
                "ADDRESS":"地点",
                "TITLE":"活动名称",
                "MONTH":"10", //月
                "DAY":"21",  //日
                "SHOW_TIME":"下午 18:00" //"展示时间"
            }
        ],
        "status":0
    }
}
app.listen(9080)