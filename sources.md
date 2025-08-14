Ahskenaz:
Request URL
https://www.venuepilot.co/graphql
Request Method
POST
Status Code
200 OK
Remote Address
75.2.97.79:443
Referrer Policy
strict-origin-when-cross-origin
access-control-allow-methods
GET, POST, OPTIONS
access-control-allow-origin
*
access-control-expose-headers
access-control-max-age
7200
cache-control
max-age=0, private, must-revalidate
content-length
88222
content-security-policy
content-type
application/json; charset=utf-8
date
Thu, 24 Jul 2025 19:49:20 GMT
etag
W/"35b1eeccfebfac76f03852add10cbbeb"
nel
{"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}
referrer-policy
strict-origin-when-cross-origin
report-to
{"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=aDvEEfll%2BaTzBBAJMe8LIWGR628nI5kBYOIpI7zrPsk%3D\u0026sid=c46efe9b-d3d2-4a0c-8c76-bfafa16c5add\u0026ts=1753386560"}],"max_age":3600}
reporting-endpoints
heroku-nel="https://nel.heroku.com/reports?s=aDvEEfll%2BaTzBBAJMe8LIWGR628nI5kBYOIpI7zrPsk%3D&sid=c46efe9b-d3d2-4a0c-8c76-bfafa16c5add&ts=1753386560"
server
Heroku
strict-transport-security
max-age=63072000; includeSubDomains
vary
Accept, Origin
via
2.0 heroku-router
x-content-type-options
nosniff
x-download-options
noopen
x-frame-options
SAMEORIGIN
x-permitted-cross-domain-policies
none

x-request-id
20aed951-88c9-7db5-82fd-e4baa79d894d
x-runtime
0.160784
x-xss-protection
1; mode=block
:authority
www.venuepilot.co
:method
POST
:path
/graphql
:scheme
https
accept
*/*
accept-encoding
gzip, deflate, br, zstd
accept-language
en-US,en;q=0.9
content-length
1647
content-type
application/json
origin
https://www.ashkenaz.com
priority
u=1, i
referer
https://www.ashkenaz.com/
sec-ch-ua
"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"
sec-ch-ua-mobile
?0
sec-ch-ua-platform
"Windows"
sec-fetch-dest
empty
sec-fetch-mode
cors
sec-fetch-site
cross-site
user-agent
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0


https://www.venuepilot.co/graphql
{"operationName":null,"variables":{"accountIds":[1228],"startDate":"2025-07-24","endDate":null,"search":"","searchScope":"","page":1},"query":"query ($accountIds: [Int!]!, $startDate: String!, $endDate: String, $search: String, $searchScope: String, $limit: Int, $page: Int) {\n  paginatedEvents(arguments: {accountIds: $accountIds, startDate: $startDate, endDate: $endDate, search: $search, searchScope: $searchScope, limit: $limit, page: $page}) {\n    collection {\n      id\n      name\n      date\n      doorTime\n      startTime\n      endTime\n      minimumAge\n      promoter\n      support\n      description\n      websiteUrl\n      twitterUrl\n      instagramUrl\n      ...AnnounceImages\n      status\n      announceArtists {\n        applemusic\n        bandcamp\n        facebook\n        instagram\n        lastfm\n        name\n        songkick\n        spotify\n        twitter\n        website\n        wikipedia\n        youtube\n        __typename\n      }\n      artists {\n        bio\n        createdAt\n        id\n        name\n        updatedAt\n        __typename\n      }\n      venue {\n        name\n        __typename\n      }\n      footerContent\n      ticketsUrl\n      __typename\n    }\n    metadata {\n      currentPage\n      limitValue\n      totalCount\n      totalPages\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AnnounceImages on PublicEvent {\n  announceImages {\n    name\n    highlighted\n    versions {\n      thumb {\n        src\n        __typename\n      }\n      cover {\n        src\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n"}