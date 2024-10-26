export default class HealthDataServices {
  constructor() {
    this.apiUrls = {
      communicable:
        "https://run.mocky.io/v3/ebe9454d-3b19-481e-b180-cd68ae3a6dab",
      nonCommunicable:
        "https://run.mocky.io/v3/63c3b8d9-f874-416d-b106-f44761595b21",
      lifestyle: "https://run.mocky.io/v3/5d5e1919-1c01-4ef9-a8ed-af6567890e46",
    };
  }

  async getData(category) {
    const api_url = this.apiUrls[category];
    if (!api_url) {
      throw new Error(`No API url found for category ${category}`);
    }

    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (e) {
      console.error(e);
    }
  }
}
