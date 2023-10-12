# Simple POST user and GET user sample

```
norio@nmb tests % cat curl_get.example.rc
# Below is pseudo API Gateway endpoint, please replace it with your own.
curl -s https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/users/123abc
norio@nmb tests % cat curl_post.example.rc
# Below is pseudo API Gateway endpoint, please replace it with your own.
curl -s \
--request POST 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/users' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "George", "userId": "123abc"}'
```

## Let me try...
- Set your proper API Gateway endpoint: 
```
norio@nmb tests % source curl_get.example.rc | jq
{
  "error": "Could not find user with provided \"userId\""
}
norio@nmb tests % source curl_post.example.rc | jq
{
  "userId": "123abc",
  "name": "George"
}
norio@nmb tests % source curl_get.example.rc | jq
{
  "userId": "123abc",
  "name": "George"
}
```