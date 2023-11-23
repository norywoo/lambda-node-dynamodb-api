# Simple GET sudoku problem sample

- The gateway URL is intentionally blurred, please replace our own.

```
% curl -s https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/prob/easy | jq
{
  "probId": "e0524",
  "prob": "[[1,0,3,6,7,8,5,0,4],[0,0,0,1,0,3,0,0,0],[0,9,0,0,0,0,0,8,0],[7,0,0,0,5,0,0,0,3],[0,0,8,9,0,1,4,0,0],[5,0,0,0,6,0,0,0,9],[0,7,0,0,0,0,0,3,0],[0,0,0,7,0,9,0,0,0],[9,0,4,5,8,6,1,0,2]]"
}
```