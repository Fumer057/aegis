export interface AIResponse {
    reply: string;
    error?: string;
}

const API_URL = 'http://localhost:3000/api/ai/chat';

export const sendMessageToAI = async (message: string): Promise<AIResponse> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error communicating with AI service:', error);
        return {
            reply: '',
            error: 'Failed to reach AI service. Is the backend running?'
        };
    }
};
