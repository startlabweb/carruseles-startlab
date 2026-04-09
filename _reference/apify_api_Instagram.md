# Instagram Scraper (`apify/instagram-scraper`) Actor

Scrape and download Instagram posts, profiles, places, hashtags, photos, and comments. Get data from Instagram using one or more Instagram URLs or search queries. Export scraped data, run the scraper via API, schedule and monitor runs or integrate with other tools.

- **URL**: https://apify.com/apify/instagram-scraper.md
- **Developed by:** [Apify](https://apify.com/apify) (Apify)
- **Categories:** Social media
- **Stats:** 206,193 total users, 13,988 monthly users, 99.5% runs succeeded, 3,262 bookmarks
- **User rating**: 4.67 out of 5 stars

## Pricing

from $1.50 / 1,000 results

This Actor is paid per event. You are not charged for the Apify platform usage, but only a fixed price for specific events.
Since this Actor supports Apify Store discounts, the price gets lower the higher subscription plan you have.

Learn more: https://docs.apify.com/platform/actors/running/actors-in-store#pay-per-event

## What's an Apify Actor?

Actors are a software tools running on the Apify platform, for all kinds of web data extraction and automation use cases.
In Batch mode, an Actor accepts a well-defined JSON input, performs an action which can take anything from a few seconds to a few hours,
and optionally produces a well-defined JSON output, datasets with results, or files in key-value store.
In Standby mode, an Actor provides a web server which can be used as a website, API, or an MCP server.
Actors are written with capital "A".

## How to integrate an Actor?

If asked about integration, you help developers integrate Actors into their projects.
You adapt to their stack and deliver integrations that are safe, well-documented, and production-ready.
The best way to integrate Actors is as follows.

In JavaScript/TypeScript projects, use official [JavaScript/TypeScript client](https://docs.apify.com/api/client/js.md):

```bash
npm install apify-client
```

In Python projects, use official [Python client library](https://docs.apify.com/api/client/python.md):

```bash
pip install apify-client
```

In shell scripts, use [Apify CLI](https://docs.apify.com/cli/docs.md):

````bash
# MacOS / Linux
curl -fsSL https://apify.com/install-cli.sh | bash
# Windows
irm https://apify.com/install-cli.ps1 | iex
```bash

In AI frameworks, you might use the [Apify MCP server](https://docs.apify.com/platform/integrations/mcp.md).

If your project is in a different language, use the [REST API](https://docs.apify.com/api/v2.md).

For usage examples, see the [API](#api) section below.

For more details, see Apify documentation as [Markdown index](https://docs.apify.com/llms.txt) and [Markdown full-text](https://docs.apify.com/llms-full.txt).


# README

### What does Instagram Scraper do?

Instagram Scraper allows you to scrape posts from a user's profile page, hashtag page, or place. When a link to an Instagram post is provided, it can scrape Instagram comments.

This unofficial Instagram API is designed to give you back the functionality to access public data that was removed from the Instagram API in 2020. It also enables anyone to extract public data from Instagram without imposing limits on whether you are an Instagram Business or Creator, or whether you are accessing public consumer account data.

The Instagram data scraper supports the following features:

- Scrape profiles - you can either scrape posts or get metadata from the profile.
- Scrape hashtags - query hashtags matched by search keyword - you can either scrape posts or scrape metadata from each hashtag.
- Scrape places/locations - query places matched by search keyword - you can either scrape posts or scrape metadata from each place.
- Scrape comments - you can scrape comments from any post.

### What are other Instagram scraping tools?

If you want to scrape specific Instagram data, you can use any of the dedicated scrapers with fewer settings to change and faster results. Just enter one or more Instagram usernames or URLs and click to scrape.

<table>
<tr>
<td>👤 <a href="https://apify.com/apify/instagram-profile-scraper">Instagram Profile Scraper</a></td>
<td>🎞️ <a href="https://apify.com/apify/instagram-reel-scraper">Instagram Reel Scraper</a></td>
</tr>
<tr>
<td>#️⃣ <a href="https://apify.com/apify/instagram-hashtag-scraper">Instagram Hashtag Scraper</a></td>
<td>📷 <a href="https://apify.com/apify/instagram-post-scraper">Instagram Post Scraper</a></td>
</tr>
<tr>
<td>🏷️ <a href="https://apify.com/apify/instagram-tagged-scraper">Instagram Mentions Scraper</a></td>
<td>✅ <a href="https://apify.com/apify/quick-instagram-posts-checker">Quick Instagram Posts Checker</a></td>
</tr>
<tr>
<td>👥 <a href="https://apify.com/apify/instagram-followers-count-scraper">Instagram Followers Count Scraper</a></td>
<td>💬 <a href="https://apify.com/apify/instagram-comment-scraper">Instagram Comments Scraper</a></td>
</tr>
<tr>
<td>📊 <a href="https://apify.com/apify/instagram-hashtag-stats">Instagram Hashtag Stats</a></td>
<td></td>
</tr>
</table>

### Why scrape Instagram?

Instagram has about 1 billion monthly active users and is especially popular with younger users, a demographic that can otherwise be difficult for brands to reach. With so many active users, you can imagine that there is a lot of useful data on the site.

So what can you do with that data? Here are some ideas:

- Scrape hashtags and likes to see what's becoming popular. Maybe you can get involved early or create a niche product to take advantage of short-term trends.
- Get data based on location to discover opportunities or risks that might affect your investment or business decisions.
- Scrape comments to understand how real customers see your brand or business.
- Find Instagram influencers who could help you promote your products, and track their engagement in real time.
- Collect a constantly updated dataset on your industry, city, or interests and gain insights into ongoing change.
- Carry out market or academic research that goes beyond surveys and polls.

If you want more ideas, check out our [industries pages](https://apify.com/industries) for ways web scraping is already being used in a wide range of companies.

### How to use Instagram Scraper

If you want to know more about how Instagram Scraper works, here's a detailed explanation and [step-by-step guide](https://blog.apify.com/scrape-instagram-posts-comments-and-more-21d05506aeb3/) with screenshots and examples. You can also follow this video for guidance:

https://www.youtube.com/watch?v=hz9tSv3CP6k

### How many results can you scrape with Instagram scraper?

The number of results Instagram scraper can return varies heavily based on the content you want to scrape. To get an idea you can always open the required url in an incognito window in your browser (Chrome, for example) and check what Instagram shows users who are not logged in.

You have to keep in mind that scraping Instagram is dynamic and subject to change. There’s no one-size-fits-all-use-cases number. **The maximum number of results may vary** depending on the complexity of the input, location, and other factors.

Therefore, while we regularly run Actor tests to keep the benchmarks in check, the results may also fluctuate without our knowing. The best way to know for sure for your particular use case is to do a test run yourself.

### How much will scraping Instagram cost you?

This scraper uses a pay-per-result pricing model, so costs are simple to calculate: it will cost you **$2.30 to scrape 1,000 Instagram comments**, which comes to $0.0023 per comment. With the [Apify Free plan](https://apify.com/pricing), you get $5 free usage credits each month, allowing you to **scrape over 2,100 Instagram comments for free** with those credits.

For regular data extraction, we recommend the $29/month Starter plan — this would let you **scrape over 12,600 Instagram comments every month.**

### Is it legal to scrape Instagram?

Our Instagram scrapers are ethical and do not extract any private user data, such as email addresses, gender, or location. They only extract what the user has chosen to share publicly. We therefore believe that our scrapers, when used for ethical purposes by Apify users, are safe. However, you should be aware that your results could contain personal data. Personal data is protected by the [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) in the European Union and by other regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your reason is legitimate, consult your lawyers. You can also read our blog post on the [legality of web scraping](https://blog.apify.com/is-web-scraping-legal/).

### Input parameters

The input of this scraper should be JSON containing the list of pages on Instagram that should be visited. Check the input tab for detailed list.

#### Instagram scraper input example

```json
{
    "search": "Niagara Falls",
    "searchType": "place",
    "searchLimit": 10,
    "resultsType": "posts",
    "resultsLimit": 100
}
````

### During the Actor run

During the run, the actor will output messages letting you know what's going on. Each message always contains a short label specifying which page from the provided list is currently being scraped. When items are loaded from the page, you should see a message about this event with a loaded item count and total item count for each page, in most cases.

If you provide incorrect input to the actor, it will immediately stop with a failure state and output an explanation of what is wrong.

### Instagram output format

The actor stores its results in a dataset. Each item is a separate item in the dataset.

You can manage the results in any language (Python, PHP, Node.js/NPM). See [our API reference](https://docs.apify.com/api/v2) to learn more about getting results from the Instagram Scraper.

#### Scraped Instagram posts

The structure of each item in Instagram posts when scrolling looks like this:

```json
{
  "inputUrl": "https://www.instagram.com/humansofny",
  "url": "https://www.instagram.com/p/C3TTthZLoQK/",
  "type": "Image",
  "shortCode": "C3TTthZLoQK",
  "caption": "“Biology gives you a brain. Life turns it into a mind.” Jeffrey Eugenides\n\nCongolese Refugees\n\n#congolese #congo #drc #refugee #refugees #bw #bwphotography #sony #sonyalpha #humanity #mind",
  "hashtags": [],
  "mentions": [],
  "commentsCount": 1,
  "firstComment": "We love your posts blend ! Message us to be featured! 🔥",
  "latestComments": [],
  "dimensionsHeight": 720,
  "dimensionsWidth": 1080,
  "displayUrl": "https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/426457868_1775839306212473_2684687436495806019_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=UxY2B6TAloEAX9nHKi1&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBSNWqMiaU24y8nOwL5sx-NC7TuvyXB6jzOXhs7oaNvHQ&oe=65D3DB7E&_nc_sid=2999b8",
  "images": [],
  "alt": "Photo shared by Brian René Bergeron on February 13, 2024 tagging @natgeo, @life, @people, @humansofny, @voiceofcongo, @sonyalpha, @congo_on_the_map, and @sony. May be a black-and-white image of 2 people, child and text.",
  "likesCount": 40,
  "timestamp": "2024-02-13T20:49:57.000Z",
  "childPosts": [],
  "ownerFullName": "Brian René Bergeron",
  "ownerUsername": "blend603",
  "ownerId": "5566937141",
},
```

#### Scraped Instagram comments

The structure of each item in Instagram comments looks like this:

```json
{
    "id": "17900515570488496",
    "postId": "BwrsO1Bho2N",
    "text": "When is Tesla going to make boats? It was so nice to see clear water in Venice during the covid lockdown!",
    "position": 1,
    "timestamp": "2020-06-07T12:54:20.000Z",
    "ownerId": "5319127183",
    "ownerIsVerified": false,
    "ownerUsername": "mauricepaoletti",
    "ownerProfilePicUrl": "https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-19/s150x150/84630643_482577542360727_932647097444859904_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_ohc=B3lQcy6UHX4AX8RjJKN&oh=1df825b662e1f1412eb21fc581c5db75&oe=5F0A760B"
}
```

#### Scraped Instagram profile

The structure of each user profile looks like this:

```json
{
    "id": "6622284809",
    "username": "avengers",
    "fullName": "Avengers: Endgame",
    "biography": "Marvel Studios’ \"Avengers​: Endgame” is now playing in theaters.",
    "externalUrl": "http://www.fandango.com/avengersendgame",
    "externalUrlShimmed": "https://l.instagram.com/?u=http%3A%2F%2Fwww.fandango.com%2Favengersendgame&e=ATNWJ4avEN0vwSx1YQCqQqFJst7aAFzINa-BzGZLoTVrdC6sTRTmjM9QNgWKR3URJHMxwg9x",
    "followersCount": 8212505,
    "followsCount": 4,
    "hasChannel": false,
    "highlightReelCount": 3,
    "isBusinessAccount": true,
    "joinedRecently": false,
    "businessCategoryName": "Content & Apps",
    "private": false,
    "verified": true,
    "profilePicUrl": "https://scontent-ort2-2.cdninstagram.com/vp/eaea4675dc1e937f3b449dba21ac3867/5D5DF0E0/t51.2885-19/s150x150/54446499_2222190077828037_3317168817985028096_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
    "profilePicUrlHD": "https://scontent-ort2-2.cdninstagram.com/vp/38a36006532165263f0d82c32de1d0ce/5D767E98/t51.2885-19/s320x320/54446499_2222190077828037_3317168817985028096_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
    "facebookPage": null,
    "igtvVideoCount": 5,
    "latestIgtvVideos": [
        {
            "type": "Video",
            "shortCode": "Bwr3OkpnZZ5",
            "title": "Marvel Studios’ Avengers: Endgame | “Don’t Do It”",
            "caption": "Don’t do it. #DontSpoilTheEndgame",
            "commentsCount": 115,
            "commentsDisabled": false,
            "dimensionsHeight": 1333,
            "dimensionsWidth": 750,
            "displayUrl": "https://scontent-ort2-2.cdninstagram.com/vp/1c063ea4ff0e4768a852411c74470bae/5CCD7FE3/t51.2885-15/e35/58684999_167806787545179_7836940807335402934_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
            "likesCount": 123,
            "videoDuration": 21.688,
            "videoViewCount": 77426
        }
    ],
    "postsCount": 274,
    "latestPosts": [
        {
            "type": "Video",
            "shortCode": "Bw7jACTn3tC",
            "caption": "“We need to take a stand.” Marvel Studios’ #AvengersEndgame is in theaters now. Get tickets: [link in bio]",
            "commentsCount": 1045,
            "dimensionsHeight": 750,
            "dimensionsWidth": 750,
            "displayUrl": "https://scontent-ort2-2.cdninstagram.com/vp/c336cf708e62596cd46879656f86ad70/5CCD112C/t51.2885-15/e35/57649006_653609661751971_8438348841277997450_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
            "likesCount": 142707,
            "videoViewCount": 482810,
            "timestamp": "2019-05-01T18:44:12.000Z",
            "locationName": null
        }
    ],
    "following": [],
    "followedBy": []
}
```

#### Scraped Instagram hashtag

The structure of each hashtag detail looks like this:

```json
{
  "id": "17843854051054595",
  "name": "endgame",
  "topPostsOnly": false,
  "profilePicUrl": "https://scontent-ort2-2.cdninstagram.com/vp/c3074c4492e7594fdd330ff8b81cf724/5D558BBC/t51.2885-15/e15/s150x150/58410922_577374706107933_1468173581283089454_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
  "postsCount": 1510549,
  "topPosts": [
    {
      "type": "Image",
      "shortCode": "Bw9UYRrhxfl",
      "caption": "Here is the second part😂😂 Find the first part on the page\nGuess the pictures😏\n-\n-\n-\n#marvel #mcu #dceu #worldofdc #endgame #superhero #superheros #infinitywar #batman #superman #wonderwoman #iroman #captainamerica #thor #thanos #memes #news #dc #dcuniverse #power #funny #fun" "@marvel",
      "hashtags": ["marvel", "mcu", "etc..."],
      "mentions": ["marvel"],
      "commentsCount": 9,
      "dimensionsHeight": 1326,
      "dimensionsWidth": 1080,
      "displayUrl": "https://scontent-ort2-2.cdninstagram.com/vp/4d67498d0bc033cbfdf8b666d0fce6d1/5D629B3E/t51.2885-15/e35/57216878_2119889691397544_8022105877563047858_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
      "likesCount": 2342,
      "timestamp": "2019-05-02T11:14:55.000Z",
      "locationName": null
    }
  ],
  "latestPosts": [
    {
      "type": "Sidecar",
      "shortCode": "Bw9flNKl56O",
      "caption": "Mínimo lo se mi tributo a semejante peli pero bue algo quería hacer me llore la vidaaaaa #endgame #avengersendgame #avengers #thanos #ironman #hulk #thor #makeupcomic #makeup #moviemakeup #makeupeyes #makeupfantasy #makeupavengers #makeuphero",
      "commentsCount": 0,
      "dimensionsHeight": 936,
      "dimensionsWidth": 1080,
      "displayUrl": "https://scontent-ort2-2.cdninstagram.com/vp/d97b7e434dbbb4141552c9af9c8fb05b/5D5F34FD/t51.2885-15/e35/58087917_2268263940082789_7711745336102849043_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
      "likesCount": 12312,
      "timestamp": "2019-05-02T12:52:48.000Z",
      "locationName": null
    }
  ]
}
```

#### Scraped Instagram place

The structure of each place detail looks like this:

```json
{
    "#debug": {
        "url": "https://www.instagram.com/explore/locations/1017812091/namesti-miru/"
    },
    "id": "1017812091",
    "name": "Náměstí Míru",
    "public": true,
    "lat": 50.0753325,
    "lng": 14.43769,
    "slug": "namesti-miru",
    "description": "",
    "website": "",
    "phone": "",
    "aliasOnFacebook": "",
    "addressStreetAddress": "",
    "addressZipCode": "",
    "addressCityName": "Prague, Czech Republic",
    "addressRegionName": "",
    "addressCountryCode": "CZ",
    "addressExactCityMatch": false,
    "addressExactRegionMatch": false,
    "addressExactCountryMatch": false,
    "profilePicUrl": "https://scontent-ort2-2.cdninstagram.com/vp/aa8cc8c627cbddf3df270747223f5f23/5D68CDEA/t51.2885-15/e35/s150x150/57561454_2452560724777787_307886881124344332_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
    "postsCount": 5310,
    "topPosts": [
        {
            "type": "Image",
            "shortCode": "Bw6lVVZhXXB",
            "caption": "🦋🦋🦋",
            "commentsCount": 3,
            "dimensionsHeight": 750,
            "dimensionsWidth": 750,
            "displayUrl": "https://scontent-ort2-2.cdninstagram.com/vp/03de7e9343f98fdf47513a0a944c427f/5D6656A8/t51.2885-15/e35/57561454_2452560724777787_307886881124344332_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
            "likesCount": 345,
            "timestamp": "2019-05-01T09:45:20.000Z",
            "locationName": null
        }
    ],
    "latestPosts": [
        {
            "type": "Image",
            "shortCode": "Bw9KSlIhAc-",
            "caption": "#vinohradskaprincezna #nekdotomusikontrolovat #jestezememaji #jmenujusebufinka 🐶",
            "commentsCount": 0,
            "dimensionsHeight": 1080,
            "dimensionsWidth": 1080,
            "displayUrl": "https://scontent-ort2-2.cdninstagram.com/vp/0fa17a87dee94c0c63c8973c6c0677eb/5D59EE21/t51.2885-15/e35/57506136_399700847249384_6385808161520210872_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com",
            "likesCount": 4546,
            "timestamp": "2019-05-02T09:46:45.000Z",
            "locationName": null
        }
    ]
}
```

#### Scraped Instagram post details

The structure of each post detail looks like this:

```json
{
    "type": "Sidecar",
    "shortCode": "BwrsO1Bho2N",
    "caption": "Newly upgraded Model S and X drive units rolling down the production line at Gigafactory 1 #tesla #model3 @elonmusk",
    "hashtags": ["tesla", "model3"],
    "mentions": ["elonmusk"],
    "position": 1,
    "url": "https://www.instagram.com/p/BwrsO1Bho2N",
    "commentsCount": 711,
    "latestComments": [
        {
            "ownerUsername": "mauricepaoletti",
            "text": "When is Tesla going to make boats? It was so nice to see clear water in Venice during the covid lockdown!"
        }
    ],
    "dimensionsHeight": 1350,
    "dimensionsWidth": 1080,
    "displayUrl": "https://instagram.fist4-1.fna.fbcdn.net/v/t51.2885-15/e35/57840129_308705413159630_8358160330083042716_n.jpg?_nc_ht=instagram.fist4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=g7JIBg70oHMAX_QGayb&oh=1402875349a6d1cd8693f14f2b617fd6&oe=5F0DBA1F",
    "id": "2029910590113615245",
    "firstComment": "@miszdivastatuz",
    "likesCount": 153786,
    "timestamp": "2019-04-25T14:57:01.000Z",
    "locationName": "Tesla Gigafactory 1",
    "locationId": "2172837629656184",
    "ownerFullName": "Tesla",
    "ownerUsername": "teslamotors",
    "ownerId": "297604134",
    "captionIsEdited": false,
    "hasRankedComments": false,
    "commentsDisabled": false,
    "displayResourceUrls": [
        "https://instagram.fist4-1.fna.fbcdn.net/v/t51.2885-15/e35/57840129_308705413159630_8358160330083042716_n.jpg?_nc_ht=instagram.fist4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=g7JIBg70oHMAX_QGayb&oh=1402875349a6d1cd8693f14f2b617fd6&oe=5F0DBA1F",
        "https://instagram.fist4-1.fna.fbcdn.net/v/t51.2885-15/e35/56744724_532173877312018_171181625703519178_n.jpg?_nc_ht=instagram.fist4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=_zTxcKu_hyYAX9KtDax&oh=175f7e2fceb3f6b20f84e148baf4d9f9&oe=5F0C7535"
    ],
    "childPosts": [],
    "locationSlug": "tesla-gigafactory-1",
    "isAdvertisement": false,
    "taggedUsers": [],
    "likedBy": []
}
```

### FAQ

#### Can I scrape data from both Instagram and Threads at the same time?

Since Instagram and Threads share userbase, you can scrape both Threads and Instagram profiles since they share the same usernames. By using scraping techniques, you can extract data from both platforms simultaneously and get insights into user profiles and their activities on both Meta platforms. You may want to check out our [Threads Profile Scraper](https://apify.com/apify/threads-profile-api-scraper) as well.

#### Integrations and Instagram Scraper

Last but not least, Instagram Scraper can be connected with almost any cloud service or web app thanks to <a href="https://apify.com/integrations"  target="_blank"> integrations on the Apify platform</a>. You can integrate with Make, Zapier, Slack, Airbyte, GitHub, Google Sheets, Google Drive, <a href="https://docs.apify.com/integrations"  target="_blank"> and more</a>. Or you can use <a href="https://docs.apify.com/integrations/webhooks"  target="_blank"> webhooks</a> to carry out an action whenever an event occurs, e.g. get a notification whenever Instagram Scraper successfully finishes a run.

#### Using Instagram Scraper with the Apify API

The Apify API gives you programmatic access to the Apify platform. The API is organized around RESTful HTTP endpoints that enable you to manage, schedule, and run Apify actors. The API also lets you access any datasets, monitor actor performance, fetch results, create and update versions, and more.

To access the API using Node.js, use the `apify-client` NPM package. To access the API using Python, use the `apify-client` PyPI package.

Check out the <a href="https://docs.apify.com/api/v2"  target="_blank"> Apify API reference</a> docs for full details or click on the <a href="https://apify.com/apify/instagram-scraper/api"  target="_blank"> API tab</a> for code examples.

#### Not your cup of tea? Build your own scraper

Instagram scraper doesn’t exactly do what you need? You can always build your own! We have various [scraper templates](https://apify.com/templates) in Python, JavaScript, and TypeScript to get you started. Alternatively, you can write it from scratch using our [open-source library Crawlee](https://crawlee.dev/). You can keep the scraper to yourself or make it public by adding it to Apify Store (and [find users](https://apify.com/partners/actor-developers) for it).

#### Your feedback

We’re always working on improving the performance of our Actors. So if you’ve got any technical feedback for Instagram scraper or simply found a bug, please create an issue on the Actor’s [Issues tab](https://console.apify.com/actors/shu8hvrXbJbY3Eb9W/issues) in Apify Console.

# Actor input Schema

## `directUrls` (type: `array`):

Add one or more Instagram URLs to scrape. The field is optional, but you need to either use this field or search query below.

## `resultsType` (type: `string`):

You can choose to get posts, comments or details from Instagram URLs. Comments can only be scraped from post URLs.<br>❗Please note that the stories type has been deprecated. It used to return reels data, which wasn’t aligned with its purpose. Please use reels instead.

## `resultsLimit` (type: `integer`):

How many posts or comments (max 50 comments per post) you want to scrape from each Instagram URL. If you set this to 1, you will get a single post from each page.

## `onlyPostsNewerThan` (type: `string`):

Limit how far back to the history the scraper should go. The date should be in YYYY-MM-DD or full ISO absolute format or in relative format e.g. 1 days, 2 months, 3 years. All time values are taken in UTC timezone

## `search` (type: `string`):

Provide a search query which will be used to search Instagram for profiles, hashtags or places.

## `searchType` (type: `string`):

What type of pages to search for (you can look for hashtags, profiles or places).

## `searchLimit` (type: `integer`):

How many search results (hashtags, users or places) should be returned.

## `addParentData` (type: `boolean`):

Only for feed items - add data source to results, i.e. for profile posts metadata is profile, for tag posts metadata is hashtag

## Actor input object example

```json
{
  "directUrls": [
    "https://www.instagram.com/humansofny/"
  ],
  "resultsType": "posts",
  "resultsLimit": 200,
  "searchType": "hashtag",
  "searchLimit": 1,
  "addParentData": false
}
```

# Actor output Schema

## `results` (type: `string`):

No description

# API

You can run this Actor programmatically using our API. Below are code examples in JavaScript, Python, and CLI, as well as the OpenAPI specification and MCP server setup.

## JavaScript example

```javascript
import { ApifyClient } from 'apify-client';

// Initialize the ApifyClient with your Apify API token
// Replace the '<YOUR_API_TOKEN>' with your token
const client = new ApifyClient({
    token: '<YOUR_API_TOKEN>',
});

// Prepare Actor input
const input = {
    "directUrls": [
        "https://www.instagram.com/humansofny/"
    ],
    "resultsType": "posts",
    "resultsLimit": 200,
    "searchType": "hashtag",
    "searchLimit": 1
};

// Run the Actor and wait for it to finish
const run = await client.actor("apify/instagram-scraper").call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs

```

## Python example

```python
from apify_client import ApifyClient

# Initialize the ApifyClient with your Apify API token
# Replace '<YOUR_API_TOKEN>' with your token.
client = ApifyClient("<YOUR_API_TOKEN>")

# Prepare the Actor input
run_input = {
    "directUrls": ["https://www.instagram.com/humansofny/"],
    "resultsType": "posts",
    "resultsLimit": 200,
    "searchType": "hashtag",
    "searchLimit": 1,
}

# Run the Actor and wait for it to finish
run = client.actor("apify/instagram-scraper").call(run_input=run_input)

# Fetch and print Actor results from the run's dataset (if there are any)
print("💾 Check your data here: https://console.apify.com/storage/datasets/" + run["defaultDatasetId"])
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)

# 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/python/docs/quick-start

```

## CLI example

```bash
echo '{
  "directUrls": [
    "https://www.instagram.com/humansofny/"
  ],
  "resultsType": "posts",
  "resultsLimit": 200,
  "searchType": "hashtag",
  "searchLimit": 1
}' |
apify call apify/instagram-scraper --silent --output-dataset

```

## MCP server setup

```json
{
    "mcpServers": {
        "apify": {
            "command": "npx",
            "args": [
                "mcp-remote",
                "https://mcp.apify.com/?tools=apify/instagram-scraper",
                "--header",
                "Authorization: Bearer <YOUR_API_TOKEN>"
            ]
        }
    }
}

```

## OpenAPI specification

```json
{
    "openapi": "3.0.1",
    "info": {
        "title": "Instagram Scraper",
        "description": "Scrape and download Instagram posts, profiles, places, hashtags, photos, and comments. Get data from Instagram using one or more Instagram URLs or search queries. Export scraped data, run the scraper via API, schedule and monitor runs or integrate with other tools.",
        "version": "0.0",
        "x-build-id": "NugzaQlVeVHEfcgJU"
    },
    "servers": [
        {
            "url": "https://api.apify.com/v2"
        }
    ],
    "paths": {
        "/acts/apify~instagram-scraper/run-sync-get-dataset-items": {
            "post": {
                "operationId": "run-sync-get-dataset-items-apify-instagram-scraper",
                "x-openai-isConsequential": false,
                "summary": "Executes an Actor, waits for its completion, and returns Actor's dataset items in response.",
                "tags": [
                    "Run Actor"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/inputSchema"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "token",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Enter your Apify token here"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/acts/apify~instagram-scraper/runs": {
            "post": {
                "operationId": "runs-sync-apify-instagram-scraper",
                "x-openai-isConsequential": false,
                "summary": "Executes an Actor and returns information about the initiated run in response.",
                "tags": [
                    "Run Actor"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/inputSchema"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "token",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Enter your Apify token here"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/runsResponseSchema"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/acts/apify~instagram-scraper/run-sync": {
            "post": {
                "operationId": "run-sync-apify-instagram-scraper",
                "x-openai-isConsequential": false,
                "summary": "Executes an Actor, waits for completion, and returns the OUTPUT from Key-value store in response.",
                "tags": [
                    "Run Actor"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/inputSchema"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "token",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Enter your Apify token here"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "inputSchema": {
                "type": "object",
                "properties": {
                    "directUrls": {
                        "title": "Instagram URLs you want to scrape",
                        "uniqueItems": true,
                        "type": "array",
                        "description": "Add one or more Instagram URLs to scrape. The field is optional, but you need to either use this field or search query below.",
                        "items": {
                            "type": "string"
                        }
                    },
                    "resultsType": {
                        "title": "What do you want to scrape from each page?",
                        "enum": [
                            "posts",
                            "comments",
                            "details",
                            "mentions",
                            "reels",
                            "stories"
                        ],
                        "type": "string",
                        "description": "You can choose to get posts, comments or details from Instagram URLs. Comments can only be scraped from post URLs.<br>❗Please note that the stories type has been deprecated. It used to return reels data, which wasn’t aligned with its purpose. Please use reels instead.",
                        "default": "posts"
                    },
                    "resultsLimit": {
                        "title": "Max results per URL",
                        "minimum": 1,
                        "type": "integer",
                        "description": "How many posts or comments (max 50 comments per post) you want to scrape from each Instagram URL. If you set this to 1, you will get a single post from each page."
                    },
                    "onlyPostsNewerThan": {
                        "title": "Newer than",
                        "pattern": "^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])(T[0-2]\\d:[0-5]\\d(:[0-5]\\d)?(\\.\\d+)?Z?)?$|^(\\d+)\\s*(minute|hour|day|week|month|year)s?$",
                        "type": "string",
                        "description": "Limit how far back to the history the scraper should go. The date should be in YYYY-MM-DD or full ISO absolute format or in relative format e.g. 1 days, 2 months, 3 years. All time values are taken in UTC timezone"
                    },
                    "search": {
                        "title": "Search query",
                        "type": "string",
                        "description": "Provide a search query which will be used to search Instagram for profiles, hashtags or places."
                    },
                    "searchType": {
                        "title": "Search type",
                        "enum": [
                            "user",
                            "hashtag",
                            "place"
                        ],
                        "type": "string",
                        "description": "What type of pages to search for (you can look for hashtags, profiles or places).",
                        "default": "hashtag"
                    },
                    "searchLimit": {
                        "title": "Search results limit",
                        "minimum": 1,
                        "maximum": 250,
                        "type": "integer",
                        "description": "How many search results (hashtags, users or places) should be returned."
                    },
                    "addParentData": {
                        "title": "Add metadata",
                        "type": "boolean",
                        "description": "Only for feed items - add data source to results, i.e. for profile posts metadata is profile, for tag posts metadata is hashtag",
                        "default": false
                    }
                }
            },
            "runsResponseSchema": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string"
                            },
                            "actId": {
                                "type": "string"
                            },
                            "userId": {
                                "type": "string"
                            },
                            "startedAt": {
                                "type": "string",
                                "format": "date-time",
                                "example": "2025-01-08T00:00:00.000Z"
                            },
                            "finishedAt": {
                                "type": "string",
                                "format": "date-time",
                                "example": "2025-01-08T00:00:00.000Z"
                            },
                            "status": {
                                "type": "string",
                                "example": "READY"
                            },
                            "meta": {
                                "type": "object",
                                "properties": {
                                    "origin": {
                                        "type": "string",
                                        "example": "API"
                                    },
                                    "userAgent": {
                                        "type": "string"
                                    }
                                }
                            },
                            "stats": {
                                "type": "object",
                                "properties": {
                                    "inputBodyLen": {
                                        "type": "integer",
                                        "example": 2000
                                    },
                                    "rebootCount": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "restartCount": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "resurrectCount": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "computeUnits": {
                                        "type": "integer",
                                        "example": 0
                                    }
                                }
                            },
                            "options": {
                                "type": "object",
                                "properties": {
                                    "build": {
                                        "type": "string",
                                        "example": "latest"
                                    },
                                    "timeoutSecs": {
                                        "type": "integer",
                                        "example": 300
                                    },
                                    "memoryMbytes": {
                                        "type": "integer",
                                        "example": 1024
                                    },
                                    "diskMbytes": {
                                        "type": "integer",
                                        "example": 2048
                                    }
                                }
                            },
                            "buildId": {
                                "type": "string"
                            },
                            "defaultKeyValueStoreId": {
                                "type": "string"
                            },
                            "defaultDatasetId": {
                                "type": "string"
                            },
                            "defaultRequestQueueId": {
                                "type": "string"
                            },
                            "buildNumber": {
                                "type": "string",
                                "example": "1.0.0"
                            },
                            "containerUrl": {
                                "type": "string"
                            },
                            "usage": {
                                "type": "object",
                                "properties": {
                                    "ACTOR_COMPUTE_UNITS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATASET_READS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATASET_WRITES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "KEY_VALUE_STORE_READS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "KEY_VALUE_STORE_WRITES": {
                                        "type": "integer",
                                        "example": 1
                                    },
                                    "KEY_VALUE_STORE_LISTS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "REQUEST_QUEUE_READS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "REQUEST_QUEUE_WRITES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATA_TRANSFER_INTERNAL_GBYTES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATA_TRANSFER_EXTERNAL_GBYTES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "PROXY_RESIDENTIAL_TRANSFER_GBYTES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "PROXY_SERPS": {
                                        "type": "integer",
                                        "example": 0
                                    }
                                }
                            },
                            "usageTotalUsd": {
                                "type": "number",
                                "example": 0.00005
                            },
                            "usageUsd": {
                                "type": "object",
                                "properties": {
                                    "ACTOR_COMPUTE_UNITS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATASET_READS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATASET_WRITES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "KEY_VALUE_STORE_READS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "KEY_VALUE_STORE_WRITES": {
                                        "type": "number",
                                        "example": 0.00005
                                    },
                                    "KEY_VALUE_STORE_LISTS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "REQUEST_QUEUE_READS": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "REQUEST_QUEUE_WRITES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATA_TRANSFER_INTERNAL_GBYTES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "DATA_TRANSFER_EXTERNAL_GBYTES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "PROXY_RESIDENTIAL_TRANSFER_GBYTES": {
                                        "type": "integer",
                                        "example": 0
                                    },
                                    "PROXY_SERPS": {
                                        "type": "integer",
                                        "example": 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```
