
import axios from "axios";

const ApiService = {
  
  get(resource, slug = "") {
    return  axios.get(`${resource}/${slug}`).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  post(resource, params) {
    //  ApiService.setHeader();
    return axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return axios.put(`${resource}`, params);
  },

  delete(resource) {
    return axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;
