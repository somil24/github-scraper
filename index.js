const express =require('express')
const axios= require('axios');
const cheerio=require('cheerio');
const { data } = require('cheerio/lib/api/attributes');
const app =express();

const PORT=process.env.PORT || 5000;

//app.use(express.json());


const url="https://github.com/kunal-kushwaha/DSA-Bootcamp-Java/tree/main/assignments";

app.get('/',(req,res)=>{
    res.send("Welcome to Assignment Scrapper");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});


app.get('/assignment', (req, res) => {
   
    const data=[];
    axios.get(url)
    .then(response=>{
        const $=cheerio.load(response.data);
        $('.Box-row span.css-truncate a.Link--primary').each((i,ele)=>{
            data.push({
                title:$(ele).text(),
                link:$(ele).attr('href').split('/')[6]
            })
        })
        res.send(data);
    })
    .catch(error=>{
        res.status(500).send(`There is some internal server error Error Message is - ${error}`)
    })
});

