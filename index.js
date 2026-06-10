import axios from 'axios';
import express from 'express';

const app=express();
const port=3000;

app.use(express.static("public"));

const URL="https://api.coingecko.com/api/v3";
const API_KEY=process.env.COINGECKO_API_KEY;

async function getcointable() {
    try{
        console.log("Requesting data to coingecko");
        const response=await axios.get(URL+"/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10",{
            headers:{
                'x-cg-demo-api-key': API_KEY
            }
            
        });
            /*console.log("Success! Here are your top 10 coins:");
            console.table(response.data.map(coin => ({
            Rank: coin.market_cap_rank,
            Name: coin.name,
            Price: `$${coin.current_price}`,
            "24h Change": `${coin.price_change_percentage_24h.toFixed(2)}%`*/
            const cleanedData = response.data.map(coin => {
            return {
                ...coin,
                price_change_percentage_24h: coin.price_change_percentage_24h ?? 0,
                current_price: coin.current_price ?? 0,
                market_cap : coin.market_cap ?? 0
            }
});
            return cleanedData;
        }
    catch(error){
        console.error("Oops! Something went wrong fetching data.");
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(`Status Code: ${error.response.status}`);
      console.error("Message:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }

}

app.get("/",async (req,res)=>{
    try{
        const crytodata=await getcointable();
        const response=await axios.get(URL+"/global",{
        headers : {
                'x-cg-demo-api-key': API_KEY
        }  
        })
        const topGainers = crytodata
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 5);
        const topLosers= crytodata
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 5);
        res.render("index.ejs",{coins : crytodata, marketData : response.data.data, topGainers : topGainers, topLosers : topLosers});
    }
    catch(error){
        console.log("Error Msg : ",error);
        res.sendStatus(500).send("Something went wrong");
    }
});

app.get("/search",async (req,res)=>{
    try {
        const response=await axios.get(URL+"/search?query="+req.query.coin,{
            headers : {
                'x-cg-demo-api-key': API_KEY
            }
        })
        //console.log(req.query);
        //console.log(response.data);
        res.render("search.ejs",{coins : response.data.coins});
    } 
    catch (error) {
         console.log("Error Msg : ",error);
        res.sendStatus(500).send("Something went wrong");
    }
});

app.get("/coins/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const response=await axios.get(URL+"/coins/"+id,{
            headers : {
                'x-cg-demo-api-key': API_KEY
            }
        })
            //console.log(response.data.description.en);
            res.render("coins.ejs",{coins : response.data});
    } catch (error) {
        console.log("Error Msg : ",error);
        res.sendStatus(500).send("Something went wrong");
    }
});


app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});