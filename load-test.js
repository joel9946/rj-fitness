import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 50 },  // Ramp up to 50 users
    { duration: '10s', target: 200 }, // Ramp up to 200 users
    { duration: '10s', target: 200 }, // Maintain 200 concurrent users
    { duration: '5s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

const BASE_URL = 'http://127.0.0.1:3000';

export default function () {
  // 1. Visit Homepage
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    'homepage loaded': (r) => r.status === 200,
  });
  sleep(1);

  // 2. Visit Login Page
  res = http.get(`${BASE_URL}/login`);
  check(res, {
    'login page loaded': (r) => r.status === 200,
  });
  sleep(1);

  // 3. Visit Register Page
  res = http.get(`${BASE_URL}/register`);
  check(res, {
    'register page loaded': (r) => r.status === 200,
  });
  sleep(1);
}
