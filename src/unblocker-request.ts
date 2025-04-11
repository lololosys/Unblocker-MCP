import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';

export interface UnblockerRequestOptions {
    url: string;
    country?: string;
    render?: boolean;
    username: string;
    password: string;
    serverAddr: string;
}

interface ContentResponse {
    [key: string]: unknown;
    type: "text";
    text: string;
}

export const makeUnblockerRequest = async ({ 
    url, 
    country = 'us', 
    render = false, 
    username, 
    password, 
    serverAddr 
}: UnblockerRequestOptions): Promise<{ content: ContentResponse[] }> => {
    try {
        const agent = new HttpsProxyAgent(`http://${username}:${password}@${serverAddr}`);
        
        const headers = {
            'x-netnut-geo-location': country,
            'x-netnut-html-render': render.toString()
        };

        console.log(`Fetching ${url} with headers: ${JSON.stringify(headers)}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            agent: agent,
            timeout: 180000 
        });

        const data = await response.text();
        console.log(`Received data: ${data}`);

        return {
            content: [
                {
                    type: "text" as const,
                    text: data,
                },
            ],
        };
    } catch (error: any) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: `Error making unblocker request: ${error.message}`,
                },
            ],
        };
    }
}; 