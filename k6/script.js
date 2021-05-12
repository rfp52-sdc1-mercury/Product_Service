import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  var res1 = http.get('http://localhost:3001/products/');
  // var res2 = http.get('http://localhost:3001/products/999999');
  // var res3 = http.get('http://localhost:3001/products/500000/styles');
  // var res4 = http.get('http://localhost:3001/products/1/related');
}

// export default function () {
//   var res = http.get('http://localhost:3001/products/999999');
// }

// export default function () {
//   var res = http.get('http://localhost:3001/products/999999/styles');
// }

// export default function () {
//   var res = http.get('http://localhost:3001/products/999999/related');
// }
