# 🎯 Giphy GIF Fetcher API

This project is a **Serverless API** built with **AWS Lambda** and **API Gateway** that fetches GIFs from the Giphy API based on user input.

## 🚀 Features
- Fetches GIFs from Giphy API 🔍
- Returns GIF URL in JSON response 🌐
- Error Handling ⚠️
- CORS Enabled ✅

## 📌 API Endpoints
### 1. Get GIF by Query
**Endpoint:**
```
GET /gif/{query}
```

**Request Parameters:**
| Parameter | Type   | Description        |
|-----------|-------|------------------|
| `query`   | String | Search keyword to fetch GIF |

**Request Example:**
```
GET /gif/cat
```

### 🎯 Success Response
**Status Code:** `200 OK`

**Response Body:**
```json
{
  "gifUrl": "https://media.giphy.com/media/xyz123/giphy.gif"
}
```
Rendering the `gifUrl` will display the GIF.

### ⚠️ Error Response
**Status Code:** `400 Bad Request`
```json
{
  "message": "Query parameter is missing"
}
```

**Status Code:** `500 Internal Server Error`
```json
{
  "message": "Internal Server Error"
}
```

## 🛠️ Environment Variables
| Variable       | Description         |
|---------------|-------------------|
| `GIPHY_API_KEY` | Your Giphy API Key |

## 📄 How to Deploy
1. Install dependencies:
```bash
npm install
```
2. Package the Lambda function.
3. Deploy to AWS Lambda.
4. Connect the function to API Gateway.
5. Set environment variable `GIPHY_API_KEY` in AWS Lambda.

## 🎯 Example Usage
URL:
```
https://your-api-id.execute-api.region.amazonaws.com/dev/gif/dog
```

Response:
```json
{
  "gifUrl": "https://media.giphy.com/media/l0HlG3jFxIsjHh9WE/giphy.gif"
}
```

## 🤝 Contributing
Feel free to open issues or submit pull requests!

## 📜 License
This project is licensed under the MIT License.

