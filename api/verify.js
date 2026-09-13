module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { sspId } = req.body;
    
    if (!sspId) {
      return res.status(400).json({ error: 'sspId is required' });
    }

    const loginPayload = {
      usernameOrEmail: process.env.KNOZ_API_USERNAME,
      password: process.env.KNOZ_API_PASSWORD,
      appType: 0
    };
    
    const loginResponse = await fetch('https://knoz-api.knoz.online/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    });
    
    if (!loginResponse.ok) {
      return res.status(loginResponse.status).json({ error: 'Failed to authenticate with Knoz API' });
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.record?.token || loginData.token;
    
    if (!token) {
      return res.status(500).json({ error: 'No token received from Knoz API' });
    }
    
    const courseDetailsUrl = `https://knoz-api.knoz.online/api/Monitor/Assigned-Student-Course-Details?SSPId=${sspId}`;
    const courseResponse = await fetch(courseDetailsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!courseResponse.ok) { 
       return res.status(courseResponse.status).json({ error: 'Failed to fetch course details' });
    }
    
    const courseData = await courseResponse.json();
    return res.status(200).json(courseData);
      
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
