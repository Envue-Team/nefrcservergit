import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://ec2-35-168-125-56.compute-1.amazonaws.com:8080",
  headers: {
    "Content-type": "application/json",
  }
});
