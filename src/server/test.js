const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./api/data.json');
const a = true;

// 解決Vue跨域問題
app.use(cors());

app.all('/api/data', (req, res)=>{
    if(a == false){
        res.status(200);
        res.send(`查無資料！`);
        return
    }
    res.json(data);
})

app.listen(3000, ()=>{
    console.log('express服務端口8080開啟成功！')
})
