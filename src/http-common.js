import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://ec2-34-236-149-223.compute-1.amazonaws.com:8080",
  headers: {
    "Content-type": "application/json",
    
  }
});
