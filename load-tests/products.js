import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
 
  { duration: "60s", target: 800 },
  
]
};

export default function () {
  const response = http.get(
    "http://localhost:3000/api/products/filtered-products/en",
  );

  check(response, {
    "status is 200": (r) => r.status === 200,
  });
}
