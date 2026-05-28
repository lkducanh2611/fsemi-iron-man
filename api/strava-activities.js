module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { clubId } = req.query;
    const authHeader = req.headers.authorization;

    if (!clubId || !authHeader) {
        return res.status(400).json({ error: "Missing clubId or Authorization header" });
    }

    try {
        const response = await fetch(`https://www.strava.com/api/v3/clubs/${clubId}/activities?per_page=200`, {
            headers: { 'Authorization': authHeader }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
