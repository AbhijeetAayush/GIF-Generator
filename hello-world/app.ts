import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

const GIPHY_API_KEY=process.env.GIPHY_API_KEY;

const getGif= async (query:string) : Promise<string>=>{
    try{
        const response=await axios.get('https://api.giphy.com/v1/gifs/search',{
            params:
            {
                api_key: GIPHY_API_KEY,
                q: query,
                limit: 1,
                rating: 'g', 
            }
        })
        if (response.data.data.length === 0) 
        {
            return 'No GIF found!';
            //throw new Error('No GIF found!');
        }
        else
        {
            return response.data.data[0]?.images?.original?.url;
        }
       /*else
       {

            //const gifUrl = response.data.data[0]?.images?.original?.url;
            const gifUrl = response.data.data[0]?.images?.fixed_width_downsampled?.url;


            const gifResponse = await axios.get(gifUrl, {
            responseType: 'arraybuffer', // Important to get Buffer
            });

            return Buffer.from(gifResponse.data);
       }*/
            /*const imageUrl = response.data.data[0]?.images?.fixed_width_downsampled?.url;

            console.log('Image URL:', imageUrl);
        
            const imageResponse = await axios.get(imageUrl, {
              responseType: 'arraybuffer',
            });
        
            console.log('Image Buffer Length:', imageResponse.data.length);
        
            return Buffer.from(imageResponse.data);*/
    }
    catch(error)
    {
        console.error('Error fetching GIF:', error);
        throw new Error('Failed to fetch GIF');
    }
};
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const query = event.pathParameters?.query;
  
    if (!query) 
    {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Query parameter is missing' }),
      };
    }
  
    try {
      const gifUrl = await getGif(query);
      return {
        statusCode: 200,
        body: JSON.stringify({ gifUrl }),
      };
     /* const gifBuffer = await getGif(query);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Content-Length': gifBuffer.length.toString(),
        //'Content-Encoding':'base64',
        'Access-Control-Allow-Origin': '*',
      },
      /*body: gifBuffer.toString('binary'), 
      isBase64Encoded: true, */
     /* body: gifBuffer.toString('base64'), 
      isBase64Encoded: true,
    };*/
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  };



