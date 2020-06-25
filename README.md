# instagram-cleaner
Mass unliker and unsaver for Instagram. (unfinished)
### How it works
Instagram has a rate limit of 200 requests per hour. Therefore mass unlike unlikes 21 posts every 400s (~6.7 minutes) or 189 posts per hour.
### How to use
1. Clone this repository
2. (Optional) Create a `.env` looking with your Instagram credentials like this:
```
IG_USER=<username>
IG_PASS=<password>
```
3. run `node app` or use a service like `pm2` on a server to run the program forever. If you've skipped step 2 add `IG_USER=<username> IG_PASS=<password>` to your command 
### License
[MIT](LICENSE)
