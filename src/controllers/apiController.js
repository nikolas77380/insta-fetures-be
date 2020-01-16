const axios = require('axios');

class ApiController {
    constructor() {
        this.access_token = 'EAAUXzfmYs1MBAI39y2s4PIS109CSOgo80bYKS96QLzw1zMHtvgVi2stMr8qeTJPuojCjO9oMTP5Odg8lT8VhvVg72Iuo9EGN3gwVNCMO5yykOonoR3USGurCxJ07ue5qBIX0vrmZBTjHBncRYHH1qXLOQa0G1PIJrQGj6DFO2dxN2RGuVDMJnY1HFhT5HBLSZCf361YQZDZD';
    }
    async getLocation(q){
        const locations = await axios.get(`https://graph.facebook.com/search?type=place&fields=name&limit=10&q=${q}&access_token=${this.access_token}`);
        return locations.data.data;
    }

    async getHashtags(q) {
            const requestHashtags = await axios.get(`https://www.instagram.com/web/search/topsearch/?context=hashtag&query=${q}`);
            return requestHashtags;
    }
}

module.exports = ApiController