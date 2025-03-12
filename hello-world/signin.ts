import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const cognitoClient = new CognitoIdentityProviderClient({});
const CLIENT_ID = process.env.CLIENT_ID || "";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { email, password } = JSON.parse(event.body || "{}");

        if (!email || !password) {
            return { statusCode: 400, body: JSON.stringify({ message: "Missing required fields" }) };
        }

        const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        });

        const response = await cognitoClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ token: response.AuthenticationResult?.IdToken }),
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { statusCode: 500, body: JSON.stringify({ message: errorMessage }) };
    }
};
