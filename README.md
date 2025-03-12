# 🎯 Giphy GIF Fetcher API with AWS Cognito Authentication

This project is a **Serverless API** built with **AWS Lambda**, **API Gateway**, and **AWS Cognito** for authentication. It fetches GIFs from the Giphy API based on user input and provides secure access using Cognito for **user sign-up and sign-in**.

## 🚀 Features
- **User Authentication** with AWS Cognito 🔐
- Fetches GIFs from Giphy API 🔍
- Returns GIF URL in JSON response 🌐
- Error Handling ⚠️
- CORS Enabled ✅

## 📌 API Endpoints
### 1. **User Signup**
**Endpoint:**
```
POST /signup
```
**Request Body:**
```json
{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "YourSecurePassword123!"
}
```
**Response:**
```json
{
  "message": "User signed up. Please confirm your email."
}
```

### 2. **User Sign-in**
**Endpoint:**
```
POST /signin
```
**Request Body:**
```json
{
  "email": "your_email@example.com",
  "password": "YourSecurePassword123!"
}
```
**Response:**
```json
{
  "token": "your_jwt_token"
}
```

### 3. **Get GIF by Query (Authenticated)**
**Endpoint:**
```
GET /gif/{query}
```
**Headers:**
```
Authorization: Bearer your_jwt_token
```
**Request Example:**
```
GET /gif/cat
```
**Success Response:**
```json
{
  "gifUrl": "https://media.giphy.com/media/xyz123/giphy.gif"
}
```

### ⚠️ Error Responses
- **400 Bad Request** (Missing Query Parameter)
```json
{
  "message": "Query parameter is missing"
}
```
- **401 Unauthorized** (Invalid Token)
```json
{
  "message": "Unauthorized access"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal Server Error"
}
```

## 🛠️ Environment Variables
| Variable        | Description              |
|----------------|--------------------------|
| `GIPHY_API_KEY` | Your Giphy API Key       |
| `USER_POOL_ID`  | AWS Cognito User Pool ID |
| `CLIENT_ID`     | AWS Cognito App Client ID |

## 📚 How to Deploy
1. Install dependencies:
```bash
npm install
```
2. Package the Lambda function.
3. Deploy to AWS Lambda.
4. Connect the function to API Gateway.
5. Configure AWS Cognito for user authentication.
6. Set environment variables in AWS Lambda.

## 🔍 Example Usage
URL:
```
https://your-api-id.execute-api.region.amazonaws.com/dev/gif/dog
```
Headers:
```
Authorization: Bearer your_jwt_token
```
Response:
```json
{
  "gifUrl": "https://media.giphy.com/media/l0HlG3jFxIsjHh9WE/giphy.gif"
}
```

## 🤝 Contributing
Feel free to open issues or submit pull requests!

## 🐟 License
This project is licensed under the MIT License.

