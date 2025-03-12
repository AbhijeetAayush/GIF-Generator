import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const cognitoClient = new CognitoIdentityProviderClient({});
const CLIENT_ID = process.env.CLIENT_ID || "";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { username, email, password } = JSON.parse(event.body || "{}");

        if (!username || !email || !password) {
            return { statusCode: 400, body: JSON.stringify({ message: "Missing required fields" }) };
        }

        const command = new SignUpCommand({
            ClientId: CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [{ Name: "email", Value: email }],
        });

        await cognitoClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User signed up. Please confirm your email." }),
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { statusCode: 500, body: JSON.stringify({ message: errorMessage }) };
    }
};
