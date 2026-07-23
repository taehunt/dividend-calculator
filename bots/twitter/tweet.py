import os
import random
import tweepy

# Twitter API 인증 정보 (GitHub Secrets에서 가져옴)
API_KEY = os.environ.get("TWITTER_API_KEY")
API_SECRET = os.environ.get("TWITTER_API_SECRET")
ACCESS_TOKEN = os.environ.get("TWITTER_ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")

def get_twitter_client():
    client = tweepy.Client(
        consumer_key=API_KEY,
        consumer_secret=API_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET
    )
    return client

def generate_tweet():
    tickers = ["$O", "$SCHD", "$KO", "$PEP", "$JNJ", "$AAPL", "$MSFT", "$PG", "$ABBV", "$VIG"]
    
    templates = [
        "Wondering how much {ticker} you need to retire? 🏖️\n\nCompound interest and DRIP can accelerate your FIRE journey. Calculate your exact dividend snowball here 👇\n\n#DividendInvesting #FIRE #Stocks\nhttps://www.yieldgrower.com",
        
        "If you invest $500/month in {ticker} and reinvest the dividends (DRIP), where will you be in 10 years? 📈\n\nStop guessing. Visualize your portfolio growth with our free calculator 👇\n\n#Dividends #Investing #PassiveIncome\nhttps://www.yieldgrower.com",
        
        "High Yield vs Dividend Growth? 🤔\n\nTest different scenarios for {ticker} and see how the magic of compound interest works over decades. Free DRIP calculator 👇\n\n#StockMarket #FinancialFreedom #Wealth\nhttps://www.yieldgrower.com",
        
        "Building a passive income machine with {ticker}? 💸\n\nSee exactly when your dividend income will cross over your living expenses. Try the YieldGrower calculator 👇\n\n#DividendStocks #Money #Investing\nhttps://www.yieldgrower.com"
    ]
    
    ticker = random.choice(tickers)
    template = random.choice(templates)
    
    return template.format(ticker=ticker)

def main():
    if not all([API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET]):
        print("Error: Missing Twitter API credentials.")
        return

    client = get_twitter_client()
    tweet_text = generate_tweet()
    
    try:
        response = client.create_tweet(text=tweet_text)
        print(f"Successfully posted tweet: {response.data}")
    except Exception as e:
        print(f"Error posting tweet: {e}")

if __name__ == "__main__":
    main()
