import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "ec2-54-166-36-127.compute-1.amazonaws.com",
  headers: {
    "Content-type": "application/json"
  }
});
