export interface ClientInfo {
    ip: string;
    city: string;
    country: string;
    org?: string;
}

export const fetchClientInfo = async (): Promise<ClientInfo | null> => {
    try {
        // specific service for IP and Location
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(5000) // 5s timeout
        });

        if (!response.ok) {
            throw new Error(`IP Fetch failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.reason || 'IP API returned error');
        }

        return {
            ip: data.ip,
            city: data.city,
            country: data.country_name,
            org: data.org
        };
    } catch (error) {
        console.warn('Failed to fetch real IP info, falling back to simulation:', error);
        return null;
    }
};
